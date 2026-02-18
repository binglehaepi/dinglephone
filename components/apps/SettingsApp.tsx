import React, { useState, useRef } from 'react';
import { ChevronLeft, Check, Lock, ImagePlus, X } from 'lucide-react';
import {
  homeWallpapers,
  lockWallpapers,
  getSavedHomeId,
  getSavedLockId,
  getCustomHomeImage,
  getCustomLockImage,
  compressImage,
  WallpaperPreset,
  WallpaperValue,
  CUSTOM_ID,
} from '../../lib/wallpaper';

interface SettingsAppProps {
  onClose: () => void;
  onChangeHomeWallpaper: (id: string, wallpaper: WallpaperValue) => void;
  onChangeLockWallpaper: (id: string, wallpaper: WallpaperValue) => void;
}

type SettingsView = 'main' | 'homeWallpaper' | 'lockWallpaper';

export const SettingsApp: React.FC<SettingsAppProps> = ({
  onClose,
  onChangeHomeWallpaper,
  onChangeLockWallpaper,
}) => {
  const [view, setView] = useState<SettingsView>('main');
  const [selectedHome, setSelectedHome] = useState(getSavedHomeId);
  const [selectedLock, setSelectedLock] = useState(getSavedLockId);
  const [customHomeThumb, setCustomHomeThumb] = useState<string | null>(getCustomHomeImage);
  const [customLockThumb, setCustomLockThumb] = useState<string | null>(getCustomLockImage);
  const [toast, setToast] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  // ── 프리셋 선택 ──
  const handleSelectHome = (preset: WallpaperPreset) => {
    setSelectedHome(preset.id);
    onChangeHomeWallpaper(preset.id, { type: 'gradient', value: preset.gradient });
    showToast(`배경화면이 "${preset.name}"(으)로 변경되었어요!`);
  };

  const handleSelectLock = (preset: WallpaperPreset) => {
    setSelectedLock(preset.id);
    onChangeLockWallpaper(preset.id, { type: 'gradient', value: preset.gradient });
    showToast(`잠금화면이 "${preset.name}"(으)로 변경되었어요!`);
  };

  // ── 사진 업로드 핸들러 ──
  const handleFileSelected = async (
    file: File,
    target: 'home' | 'lock',
  ) => {
    setIsCompressing(true);
    try {
      const dataUrl = await compressImage(file);

      if (target === 'home') {
        setSelectedHome(CUSTOM_ID);
        setCustomHomeThumb(dataUrl);
        onChangeHomeWallpaper(CUSTOM_ID, { type: 'image', value: dataUrl });
        showToast('내 사진으로 배경화면이 변경되었어요! 📸');
      } else {
        setSelectedLock(CUSTOM_ID);
        setCustomLockThumb(dataUrl);
        onChangeLockWallpaper(CUSTOM_ID, { type: 'image', value: dataUrl });
        showToast('내 사진으로 잠금화면이 변경되었어요! 📸');
      }
    } catch {
      showToast('이미지 처리 중 오류가 발생했어요 😢');
    }
    setIsCompressing(false);
  };

  // 현재 보고 있는 피커가 home인지 lock인지
  const currentPickerTarget = view === 'homeWallpaper' ? 'home' : 'lock';

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // ── 미리보기 스타일 헬퍼 ──
  const getPreviewStyle = (
    presets: WallpaperPreset[],
    selectedId: string,
    customThumb: string | null,
  ): React.CSSProperties => {
    if (selectedId === CUSTOM_ID && customThumb) {
      return {
        backgroundImage: `url(${customThumb})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    const found = presets.find((p) => p.id === selectedId);
    return { background: found?.gradient ?? presets[0].gradient };
  };

  // ── 배경화면 선택 화면 ──
  const renderWallpaperPicker = (
    title: string,
    presets: WallpaperPreset[],
    selectedId: string,
    customThumb: string | null,
    onSelect: (preset: WallpaperPreset) => void,
  ) => {
    const isCustom = selectedId === CUSTOM_ID && customThumb;

    return (
      <div className="flex flex-col h-full bg-[#F2F2F7] text-text-primary relative">
        <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-[#F2F2F7]/95 backdrop-blur-sm z-10">
          <button onClick={() => setView('main')} className="text-text-secondary -ml-2 p-1">
            <ChevronLeft size={24} />
          </button>
          <span className="text-[18px] font-bold">{title}</span>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelected(file, currentPickerTarget);
            e.target.value = '';
          }}
        />

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8">
          {/* 미리보기 */}
          <div className="mb-5">
            <div
              className="w-full h-[200px] rounded-[24px] shadow-soft border border-white/50 flex items-center justify-center transition-all duration-500 overflow-hidden"
              style={getPreviewStyle(presets, selectedId, customThumb)}
            >
              <div className="text-center">
                {isCustom ? (
                  <div className="text-sm font-bold text-white drop-shadow-md bg-black/30 px-3 py-1 rounded-full">
                    📸 내 사진 적용중
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-2">
                      {presets.find((p) => p.id === selectedId)?.emoji}
                    </div>
                    <div className={`text-sm font-bold ${selectedId === 'night' ? 'text-white/80' : 'text-text-secondary'}`}>
                      현재 적용중
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 내 사진에서 선택 버튼 */}
          <button
            onClick={triggerFileInput}
            disabled={isCompressing}
            className="w-full mb-5 bg-white rounded-[16px] p-4 flex items-center gap-3 shadow-sm border border-accent/15 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
              <ImagePlus size={18} className="text-accent-dark" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-bold text-text-primary">
                {isCompressing ? '사진 처리중...' : '내 사진에서 선택'}
              </div>
              <div className="text-[10px] text-text-tertiary">갤러리에서 사진을 골라 배경화면으로!</div>
            </div>
            {isCustom && (
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-accent/20">
                <img src={customThumb} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </button>

          {/* 프리셋 그리드 */}
          <div className="text-[11px] font-bold text-text-tertiary mb-2 px-1">프리셋</div>
          <div className="grid grid-cols-4 gap-3">
            {presets.map((preset) => {
              const isSelected = preset.id === selectedId;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelect(preset)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-full aspect-[3/4] rounded-[16px] shadow-sm border-2 transition-all duration-200 flex items-end justify-center pb-2 group-active:scale-95 ${
                      isSelected ? 'border-accent ring-2 ring-accent/20' : 'border-white/60'
                    }`}
                    style={{ background: preset.gradient }}
                  >
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-sm">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-accent-dark' : 'text-text-tertiary'}`}>
                    {preset.emoji} {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-50">
            {toast}
          </div>
        )}
      </div>
    );
  };

  // ── 서브 뷰 라우팅 ──
  if (view === 'homeWallpaper') {
    return renderWallpaperPicker('배경화면', homeWallpapers, selectedHome, customHomeThumb, handleSelectHome);
  }
  if (view === 'lockWallpaper') {
    return renderWallpaperPicker('잠금화면', lockWallpapers, selectedLock, customLockThumb, handleSelectLock);
  }

  // ── 메인 설정 화면 ──
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] text-text-primary relative">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-[#F2F2F7]/95 backdrop-blur-sm z-10">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">설정</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-3 pb-8">
        <div className="text-center py-4">
            <h2 className="text-lg font-bold mb-1">내 폰 꾸미기</h2>
            <p className="text-xs text-text-secondary">배경화면과 잠금화면을 바꿔보세요!</p>
        </div>

        {/* 배경화면 미리보기 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setView('homeWallpaper')}
            className="bg-white rounded-[20px] p-3 shadow-sm border border-white/60 active:scale-[0.97] transition-transform"
          >
            <div
              className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-black/5 overflow-hidden"
              style={getPreviewStyle(homeWallpapers, selectedHome, customHomeThumb)}
            />
            <div className="text-xs font-bold text-text-primary">🖼️ 배경화면</div>
            <div className="text-[10px] text-text-tertiary mt-0.5">
              {selectedHome === CUSTOM_ID ? '내 사진' : homeWallpapers.find((w) => w.id === selectedHome)?.name}
            </div>
          </button>

          <button
            onClick={() => setView('lockWallpaper')}
            className="bg-white rounded-[20px] p-3 shadow-sm border border-white/60 active:scale-[0.97] transition-transform"
          >
            <div
              className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-black/5 overflow-hidden"
              style={getPreviewStyle(lockWallpapers, selectedLock, customLockThumb)}
            />
            <div className="text-xs font-bold text-text-primary">🔒 잠금화면</div>
            <div className="text-[10px] text-text-tertiary mt-0.5">
              {selectedLock === CUSTOM_ID ? '내 사진' : lockWallpapers.find((w) => w.id === selectedLock)?.name}
            </div>
          </button>
        </div>

        {/* 나머지 설정 항목 (준비중) */}
        <div className="pt-2 space-y-3">
          {[
            { title: '테마 컬러', icon: '🎨', preview: 'colors' },
            { title: '디바이스 스킨', icon: '📱', preview: 'skins' },
            { title: '폰트 변경', icon: '🔤' },
            { title: '스티커 & 장식', icon: '🧸' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[16px] p-4 flex items-center justify-between active:scale-[0.98] transition-transform"
              onClick={() => showToast('준비중입니다! 🔒')}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold text-sm">{item.title}</span>
              </div>
              {item.preview === 'colors' ? (
                <div className="flex gap-1">
                  {['#F4A77A', '#F2B5C1', '#C5B8E8', '#A8DBC5'].map((c) => (
                    <div key={c} className="w-4 h-4 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              ) : item.preview === 'skins' ? (
                <div className="text-[10px] text-text-tertiary">Basic / Retro / Tamagotchi</div>
              ) : (
                <Lock size={16} className="text-text-tertiary" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-50">
          {toast}
        </div>
      )}
    </div>
  );
};
