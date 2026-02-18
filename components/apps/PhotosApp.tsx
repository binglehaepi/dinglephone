import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronLeft, Plus, Trash2, ChevronRight as ChevronR, Grid3X3, LayoutGrid, Square, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { DinglePhoneData, PhotoItem } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';
import { compressImage } from '../../lib/wallpaper';

function generateUUID(): string {
  try { return crypto.randomUUID(); } catch {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

interface PhotosAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const PhotosApp: React.FC<PhotosAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swipeDir, setSwipeDir] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newMemo, setNewMemo] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTags, setNewTags] = useState('');
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressProgress, setCompressProgress] = useState('');
  const [layout, setLayout] = useState<'grid3' | 'grid2' | 'single'>('grid3');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addFileRef = useRef<HTMLInputElement>(null);
  const bulkFileRef = useRef<HTMLInputElement>(null);

  const items = data.apps.photos.items;

  const handleFileSelected = async (file: File) => {
    setIsCompressing(true);
    try {
      const dataUrl = await compressImage(file);
      setPendingImage(dataUrl);
    } catch {
      // ignore
    }
    setIsCompressing(false);
  };

  // ── 여러 사진 한번에 추가 ──
  const handleBulkAdd = async (fileList: FileList) => {
    if (!currentPhone || fileList.length === 0) return;
    // FileList를 배열로 복사 (input value 리셋 시 FileList가 비워지므로)
    const files = Array.from(fileList);
    setIsCompressing(true);
    const newItems: PhotoItem[] = [];
    const total = files.length;

    for (let i = 0; i < total; i++) {
      setCompressProgress(`${i + 1}/${total}`);
      try {
        const dataUrl = await compressImage(files[i]);
        newItems.push({
          id: generateUUID(),
          imageUrl: dataUrl,
          emoji: '📸',
          color: '#F0F0F0',
          caption: '',
          memo: '',
          date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').replace(/\s/g, ''),
          location: '',
          tags: [],
        });
      } catch {
        // 실패한 파일 건너뜀
      }
    }

    if (newItems.length > 0) {
      const updated = {
        ...currentPhone.apps.photos,
        items: [...currentPhone.apps.photos.items, ...newItems],
      };
      updateAppData('photos', updated);
    }

    setIsCompressing(false);
    setCompressProgress('');
  };

  const handleAdd = () => {
    if (!currentPhone || (!pendingImage && !newCaption.trim())) return;
    const newItem: PhotoItem = {
      id: generateUUID(),
      imageUrl: pendingImage || undefined,
      emoji: '📸',
      color: '#F0F0F0',
      caption: newCaption,
      memo: newMemo,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').replace(/\s/g, ''),
      location: newLocation,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
    };
    const updated = {
      ...currentPhone.apps.photos,
      items: [...currentPhone.apps.photos.items, newItem],
    };
    updateAppData('photos', updated);
    setShowAdd(false);
    setNewCaption('');
    setNewMemo('');
    setNewLocation('');
    setNewTags('');
    setPendingImage(null);
  };

  const handleDelete = (id: string) => {
    if (!currentPhone) return;
    const updated = {
      ...currentPhone.apps.photos,
      items: currentPhone.apps.photos.items.filter(p => p.id !== id),
    };
    updateAppData('photos', updated);
    setSelectedIndex(null);
  };

  const goToPhoto = (dir: number) => {
    if (selectedIndex === null) return;
    const next = selectedIndex + dir;
    if (next >= 0 && next < items.length) {
      setSwipeDir(dir);
      setSelectedIndex(next);
    }
  };

  const handleSwipeEnd = (_: any, info: PanInfo) => {
    if (selectedIndex === null) return;
    const threshold = 60;
    if (info.offset.x < -threshold && selectedIndex < items.length - 1) {
      goToPhoto(1);
    } else if (info.offset.x > threshold && selectedIndex > 0) {
      goToPhoto(-1);
    }
  };

  // ── Detail View with swipe ──
  if (selectedIndex !== null) {
    const photo = items[selectedIndex];
    if (!photo) {
      setSelectedIndex(null);
      return null;
    }

    return (
      <div className="flex flex-col h-full bg-black text-white relative z-50">
        {/* Header */}
        <div className="pt-[54px] px-4 flex justify-between items-center z-20 relative">
          <button onClick={() => setSelectedIndex(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronDown size={18} className="text-white" />
          </button>
          <span className="text-xs text-white/50">{selectedIndex + 1} / {items.length}</span>
          {isEditable && (
            <button
              onClick={() => handleDelete(photo.id)}
              className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"
            >
              <Trash2 size={14} className="text-red-400" />
            </button>
          )}
        </div>

        {/* Swipeable image area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={swipeDir}>
            <motion.div
              key={photo.id}
              custom={swipeDir}
              initial={{ opacity: 0, x: swipeDir >= 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDir >= 0 ? -300 : 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleSwipeEnd}
              className="w-full h-full flex items-center justify-center px-2"
            >
              {photo.imageUrl ? (
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  draggable={false}
                />
              ) : (
                <div
                  className="w-[80%] aspect-square rounded-2xl flex items-center justify-center"
                  style={{ background: photo.color }}
                >
                  <span className="text-[80px]">{photo.emoji}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10"
              onClick={() => goToPhoto(-1)}
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
          )}
          {selectedIndex < items.length - 1 && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10"
              onClick={() => goToPhoto(1)}
            >
              <ChevronR size={16} className="text-white" />
            </button>
          )}
        </div>

        {/* Caption/meta at bottom */}
        <div className="shrink-0 px-6 pb-8 pt-4 bg-gradient-to-t from-black/80 to-transparent">
          {photo.caption && (
            <h2 className="text-[15px] font-bold mb-1">{photo.caption}</h2>
          )}
          {photo.memo && (
            <p className="text-[13px] text-white/60 mb-2 line-clamp-2">{photo.memo}</p>
          )}
          <div className="flex items-center gap-3 text-[11px] text-white/40">
            {photo.date && <span>{photo.date}</span>}
            {photo.location && <span>{photo.location}</span>}
          </div>
          {photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {photo.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Grid View ──
  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      {/* Header — 투명 */}
      <div className="pt-[54px] pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-cream-100/95 backdrop-blur-xl">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        <div className="flex items-center gap-1.5">
          {/* 레이아웃 전환 버튼 */}
          {(['grid3', 'grid2', 'single'] as const).map((mode) => {
            const Icon = mode === 'grid3' ? Grid3X3 : mode === 'grid2' ? LayoutGrid : Square;
            return (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  layout === mode ? 'bg-black/20' : 'bg-black/5'
                }`}
                style={{ backdropFilter: 'blur(8px)' }}
              >
                <Icon size={13} className={layout === mode ? 'text-ink' : 'text-ink/40'} />
              </button>
            );
          })}
          {isEditable && (
            <>
              {/* 여러 장 한번에 추가 */}
              <button
                onClick={() => bulkFileRef.current?.click()}
                disabled={isCompressing}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-black/10 ml-1"
                title="여러 장 추가"
              >
                <ImagePlus size={13} className="text-ink" />
              </button>
              {/* 한 장씩 상세 추가 */}
              <button
                onClick={() => setShowAdd(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-black/10 ml-0.5"
                title="상세 추가"
              >
                <Plus size={14} className="text-ink" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Photo Grid / List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
        {layout === 'single' ? (
          /* 1열: 큰 사진 피드 */
          <div className="flex flex-col gap-1 px-1">
            {items.map((item, i) => (
              <button
                key={item.id}
                className="w-full relative overflow-hidden active:opacity-90 rounded-lg"
                onClick={() => { setSwipeDir(0); setSelectedIndex(i); }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full aspect-[4/5] object-cover"
                  />
                ) : (
                  <div
                    className="w-full aspect-[4/5] flex items-center justify-center rounded-lg"
                    style={{ background: item.color }}
                  >
                    <span className="text-[64px]">{item.emoji}</span>
                  </div>
                )}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-white text-xs font-medium">{item.caption}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* 2열 또는 3열 그리드 */
          <div
            className={`grid gap-[2px] px-1 ${
              layout === 'grid2' ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                className="aspect-square relative overflow-hidden active:opacity-80"
                onClick={() => { setSwipeDir(0); setSelectedIndex(i); }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: item.color }}
                  >
                    <span className={layout === 'grid2' ? 'text-[48px]' : 'text-[32px]'}>{item.emoji}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {isEditable && items.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📸</div>
            <p className="text-sm text-ink-tertiary mb-3">아직 사진이 없어요</p>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => bulkFileRef.current?.click()}
                disabled={isCompressing}
                className="text-sm font-bold px-4 py-2 rounded-full"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                📷 사진 여러 장 추가
              </button>
              <button
                onClick={() => setShowAdd(true)}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
              >
                + 상세 정보와 함께 추가
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input for single add */}
      <input
        ref={addFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelected(file);
          e.target.value = '';
        }}
      />

      {/* Hidden file input for bulk add (여러 장) */}
      <input
        ref={bulkFileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) handleBulkAdd(files);
          e.target.value = '';
        }}
      />

      {/* 처리 중 오버레이 */}
      {isCompressing && compressProgress && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow-xl">
            <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
            <span className="text-sm font-medium text-ink">사진 처리 중... {compressProgress}</span>
          </div>
        </div>
      )}

      {/* Add Photo Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => { setShowAdd(false); setPendingImage(null); }} title="📸 사진 추가">
        {/* Photo pick area */}
        <div className="mb-4">
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
            사진
          </label>
          {pendingImage ? (
            <div className="relative">
              <img src={pendingImage} alt="preview" className="w-full h-48 object-cover rounded-xl" />
              <button
                onClick={() => setPendingImage(null)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
              >
                <Trash2 size={12} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addFileRef.current?.click()}
              disabled={isCompressing}
              className="w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors"
              style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-sunken)' }}
            >
              {isCompressing ? (
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>처리중...</span>
              ) : (
                <>
                  <Plus size={24} style={{ color: 'var(--text-tertiary)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>갤러리에서 사진 선택</span>
                </>
              )}
            </button>
          )}
        </div>
        <DingleInput label="캡션 (선택)" value={newCaption} onChange={setNewCaption} placeholder="사진 제목" />
        <DingleInput label="메모 (선택)" value={newMemo} onChange={setNewMemo} placeholder="사진에 대한 메모" multiline />
        <DingleInput label="장소 (선택)" value={newLocation} onChange={setNewLocation} placeholder="촬영 장소" />
        <DingleInput label="태그 (선택, 쉼표로 구분)" value={newTags} onChange={setNewTags} placeholder="태그1, 태그2" />
        <SaveButton onClick={handleAdd} disabled={!pendingImage && !newCaption.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
