import React, { useState, useRef } from 'react';
import {
  ChevronLeft, Check, Lock, ImagePlus, Palette, Type, Sticker,
  Shield, Zap, Plus, X, Shapes,
} from 'lucide-react';
import { AdminPanel } from '../AdminPanel';
import { ADMIN_PASSWORD } from '../../lib/moderation';
import { ICON_SHAPES, getIconShapeStyle } from '../../lib/iconShapes';
import { IconShape } from '../../types';
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
import { useTheme } from '../../context/ThemeContext';
import { usePhone } from '../../context/PhoneContext';

interface SettingsAppProps {
  onClose: () => void;
  onChangeHomeWallpaper: (id: string, wallpaper: WallpaperValue) => void;
  onChangeLockWallpaper: (id: string, wallpaper: WallpaperValue) => void;
}

type SettingsView = 'main' | 'homeWallpaper' | 'lockWallpaper' | 'marquee' | 'admin';

export const SettingsApp: React.FC<SettingsAppProps> = ({
  onClose,
  onChangeHomeWallpaper,
  onChangeLockWallpaper,
}) => {
  const { theme, setThemeById, allThemes } = useTheme();
  const { isEditable, currentPhone, updateCurrentPhone } = usePhone();
  const [view, setView] = useState<SettingsView>('main');
  const phoneId = currentPhone?.id ?? 'default';
  const [selectedHome, setSelectedHome] = useState(() => getSavedHomeId(phoneId));
  const [selectedLock, setSelectedLock] = useState(() => getSavedLockId(phoneId));
  const [customHomeThumb, setCustomHomeThumb] = useState<string | null>(() => getCustomHomeImage(phoneId));
  const [customLockThumb, setCustomLockThumb] = useState<string | null>(() => getCustomLockImage(phoneId));
  const [toast, setToast] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [shakingIndex, setShakingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [adminPressTimer, setAdminPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleShake = (index: number) => {
    setShakingIndex(index);
    showToast('곧 열려요! 🔔');
    setTimeout(() => setShakingIndex(null), 400);
  };

  // ── 테마 선택 ──
  const handleSelectTheme = (id: string) => {
    setThemeById(id);
    // 폰 데이터에도 테마 ID 저장 (테마 리셋 방지)
    if (currentPhone) {
      updateCurrentPhone({ theme: id });
    }
    showToast(`테마가 변경되었어요! ${allThemes.find(t => t.id === id)?.emoji || ''}`);
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
  const handleFileSelected = async (file: File, target: 'home' | 'lock') => {
    setIsCompressing(true);
    try {
      const dataUrl = await compressImage(file);
      if (target === 'home') {
        setSelectedHome(CUSTOM_ID);
        setCustomHomeThumb(dataUrl);
        onChangeHomeWallpaper(CUSTOM_ID, { type: 'image', value: dataUrl });
        showToast('내 사진으로 배경화면이 변경되었어요!');
      } else {
        setSelectedLock(CUSTOM_ID);
        setCustomLockThumb(dataUrl);
        onChangeLockWallpaper(CUSTOM_ID, { type: 'image', value: dataUrl });
        showToast('내 사진으로 잠금화면이 변경되었어요!');
      }
    } catch {
      showToast('이미지 처리 중 오류가 발생했어요');
    }
    setIsCompressing(false);
  };

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
      <div className="flex flex-col h-full bg-cream-100 text-ink relative">
        <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-cream-100/95 backdrop-blur-xl z-10">
          <button onClick={() => setView('main')} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          <span className="text-base font-semibold text-ink">{title}</span>
        </div>

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
              className="w-full h-[200px] rounded-dingle-lg shadow-card border border-cream-300 flex items-center justify-center transition-all duration-500 overflow-hidden"
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
                    <div className="text-sm font-bold text-ink-secondary">현재 적용중</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 내 사진에서 선택 버튼 */}
          <button
            onClick={triggerFileInput}
            disabled={isCompressing}
            className="w-full mb-5 bg-cream-50 rounded-dingle-icon p-4 flex items-center gap-3 shadow-card border border-dingle/15 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-dingle-light flex items-center justify-center">
              <ImagePlus size={18} className="text-dingle-dark" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-bold text-ink">
                {isCompressing ? '사진 처리중...' : '내 사진에서 선택'}
              </div>
              <div className="text-[10px] text-ink-tertiary">갤러리에서 사진을 골라 배경화면으로!</div>
            </div>
            {isCustom && (
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-dingle/20">
                <img src={customThumb!} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </button>

          {/* 프리셋 그리드 */}
          <div className="text-[11px] font-bold text-ink-tertiary mb-2 px-1">프리셋</div>
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
                    className={`w-full aspect-[3/4] rounded-dingle-icon shadow-sm border-2 transition-all duration-200 flex items-end justify-center pb-2 group-active:scale-95 ${
                      isSelected ? 'border-dingle ring-2 ring-dingle/20' : 'border-cream-300'
                    }`}
                    style={{ background: preset.gradient }}
                  >
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-dingle flex items-center justify-center shadow-sm">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-dingle-dark' : 'text-ink-tertiary'}`}>
                    {preset.emoji} {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {toast && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-ink/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-50">
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

  // ── 관리자 패널 ──
  if (view === 'admin') {
    return <AdminPanel onClose={() => setView('main')} />;
  }

  // ── 전광판 편집 화면 ──
  if (view === 'marquee' && currentPhone) {
    const currentLines = currentPhone.homeScreen.widgets.flatMap(w => w.lines);

    const handleUpdateLines = (newLines: string[]) => {
      updateCurrentPhone({
        homeScreen: {
          ...currentPhone.homeScreen,
          widgets: [{ type: 'info' as const, lines: newLines }],
        },
      });
    };

    const handleLineChange = (index: number, value: string) => {
      const newLines = [...currentLines];
      newLines[index] = value;
      handleUpdateLines(newLines);
    };

    const handleAddLine = () => {
      handleUpdateLines([...currentLines, '새 문구']);
    };

    const handleRemoveLine = (index: number) => {
      if (currentLines.length <= 1) {
        showToast('최소 1개의 문구가 필요해요');
        return;
      }
      const newLines = currentLines.filter((_, i) => i !== index);
      handleUpdateLines(newLines);
    };

    return (
      <div className="flex flex-col h-full bg-cream-100 text-ink relative">
        <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-cream-100/95 backdrop-blur-xl z-10">
          <button onClick={() => setView('main')} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          <span className="text-base font-semibold text-ink">전광판 문구</span>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8 space-y-3">
          {/* Preview */}
          <div className="mb-4">
            <div className="text-[11px] font-bold text-ink-tertiary mb-2 px-1">미리보기</div>
            <div
              className="h-[36px] rounded-full overflow-hidden flex items-center relative"
              style={{
                background: theme.widget.bg,
                border: theme.widget.border,
                boxShadow: theme.shadow,
              }}
            >
              <div className="marquee-preview-track flex items-center whitespace-nowrap">
                {[0, 1].map((copy) => (
                  <span key={copy} className="inline-flex items-center gap-6 px-6 text-[12px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {currentLines.map((line, i) => (
                      <span key={`${copy}-${i}`} className="inline-flex items-center gap-1.5">
                        <span className="text-[10px] opacity-40" style={{ color: 'var(--accent)' }}>✦</span>
                        {line}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
            <style>{`
              .marquee-preview-track {
                animation: marquee-preview-scroll 18s linear infinite;
              }
              @keyframes marquee-preview-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>

          {/* Lines editor */}
          <div className="text-[11px] font-bold text-ink-tertiary mb-2 px-1">문구 편집</div>
          {currentLines.map((line, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={line}
                  onChange={(e) => handleLineChange(index, e.target.value)}
                  className="w-full bg-cream-50 rounded-xl px-3 py-2.5 text-sm outline-none border border-cream-300 focus:border-dingle transition-colors text-ink placeholder:text-ink-tertiary"
                  placeholder="전광판 문구를 입력하세요"
                />
              </div>
              <button
                onClick={() => handleRemoveLine(index)}
                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0"
              >
                <X size={14} className="text-red-400" />
              </button>
            </div>
          ))}

          {/* Add button */}
          <button
            onClick={handleAddLine}
            className="w-full py-3 rounded-xl border-2 border-dashed border-cream-300 text-ink-tertiary text-sm font-bold flex items-center justify-center gap-1 hover:border-dingle/30 transition-colors"
          >
            <Plus size={14} />
            문구 추가
          </button>
        </div>

        {toast && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-ink/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-50">
            {toast}
          </div>
        )}
      </div>
    );
  }

  // ── 메인 설정 화면 ──
  const comingSoonItems = [
    { title: '폰트 변경', icon: Type },
    { title: '스티커 & 장식', icon: Sticker },
  ];

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink relative">
      <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-cream-100/95 backdrop-blur-xl z-10">
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        <span
          className="text-base font-semibold text-ink select-none"
          onTouchStart={() => {
            const timer = setTimeout(() => setShowAdminPrompt(true), 2000);
            setAdminPressTimer(timer);
          }}
          onTouchEnd={() => { if (adminPressTimer) clearTimeout(adminPressTimer); }}
          onMouseDown={() => {
            const timer = setTimeout(() => setShowAdminPrompt(true), 2000);
            setAdminPressTimer(timer);
          }}
          onMouseUp={() => { if (adminPressTimer) clearTimeout(adminPressTimer); }}
          onMouseLeave={() => { if (adminPressTimer) clearTimeout(adminPressTimer); }}
        >
          설정
        </span>
      </div>

      {/* Admin password prompt */}
      {showAdminPrompt && (
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-cream-50 rounded-2xl p-6 mx-8 shadow-elevated border border-cream-300 w-full max-w-[280px]">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} className="text-red-500" />
              <span className="font-bold text-sm text-ink">관리자 인증</span>
            </div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full bg-cream-200 rounded-xl px-3 py-2.5 text-sm outline-none border border-cream-300 focus:border-dingle transition-colors text-ink placeholder:text-ink-tertiary mb-3"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (adminPassword === ADMIN_PASSWORD) {
                    setShowAdminPrompt(false);
                    setAdminPassword('');
                    setView('admin');
                  } else {
                    showToast('비밀번호가 틀렸어요');
                    setAdminPassword('');
                  }
                }
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowAdminPrompt(false); setAdminPassword(''); }}
                className="flex-1 py-2 rounded-xl bg-cream-200 text-ink-secondary text-sm font-bold"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (adminPassword === ADMIN_PASSWORD) {
                    setShowAdminPrompt(false);
                    setAdminPassword('');
                    setView('admin');
                  } else {
                    showToast('비밀번호가 틀렸어요');
                    setAdminPassword('');
                  }
                }}
                className="flex-1 py-2 rounded-xl bg-dingle text-white text-sm font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-5 pb-8">
        {/* ── 테마 선택 섹션 ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette size={16} className="text-dingle" />
            <span className="text-sm font-bold text-ink">테마</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {allThemes.map((t) => {
              const isSelected = t.id === theme.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-full aspect-square rounded-dingle-icon shadow-sm border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 group-active:scale-95 ${
                      isSelected ? 'ring-2' : 'border-cream-300'
                    }`}
                    style={{
                      background: t.preview,
                      borderColor: isSelected ? t.accent : undefined,
                      ...(isSelected ? { '--tw-ring-color': t.accent + '40' } as any : {}),
                    }}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    {isSelected && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                        style={{ background: t.accent }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-dingle-dark' : 'text-ink-tertiary'}`}>
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 배경화면 미리보기 카드 ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImagePlus size={16} className="text-dingle" />
            <span className="text-sm font-bold text-ink">배경화면</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setView('homeWallpaper')}
              className="bg-cream-50 rounded-dingle p-3 shadow-card border border-cream-300 active:scale-[0.97] transition-transform"
            >
              <div
                className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-cream-300 overflow-hidden"
                style={getPreviewStyle(homeWallpapers, selectedHome, customHomeThumb)}
              />
              <div className="text-xs font-bold text-ink">🖼️ 배경화면</div>
              <div className="text-[10px] text-ink-tertiary mt-0.5">
                {selectedHome === CUSTOM_ID ? '내 사진' : homeWallpapers.find((w) => w.id === selectedHome)?.name}
              </div>
            </button>

            <button
              onClick={() => setView('lockWallpaper')}
              className="bg-cream-50 rounded-dingle p-3 shadow-card border border-cream-300 active:scale-[0.97] transition-transform"
            >
              <div
                className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-cream-300 overflow-hidden"
                style={getPreviewStyle(lockWallpapers, selectedLock, customLockThumb)}
              />
              <div className="text-xs font-bold text-ink">🔒 잠금화면</div>
              <div className="text-[10px] text-ink-tertiary mt-0.5">
                {selectedLock === CUSTOM_ID ? '내 사진' : lockWallpapers.find((w) => w.id === selectedLock)?.name}
              </div>
            </button>
          </div>
        </div>

        {/* ── 아이콘 모양 ── */}
        {isEditable && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shapes size={16} className="text-dingle" />
              <span className="text-sm font-bold text-ink">아이콘 모양</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {ICON_SHAPES.map((shape) => {
                const currentShape = currentPhone?.homeScreen.iconShape || 'square';
                const isSelected = shape.id === currentShape;
                return (
                  <button
                    key={shape.id}
                    onClick={() => {
                      if (currentPhone) {
                        updateCurrentPhone({
                          homeScreen: { ...currentPhone.homeScreen, iconShape: shape.id as IconShape },
                        });
                        showToast(`아이콘 모양: ${shape.name} ${shape.emoji}`);
                      }
                    }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 flex items-center justify-center overflow-hidden transition-all duration-200 group-active:scale-90 ${
                        isSelected ? 'ring-2' : ''
                      }`}
                      style={{
                        background: isSelected ? 'var(--accent-light)' : 'var(--bg-card)',
                        border: isSelected ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                        ...getIconShapeStyle(shape.id),
                        ...(isSelected ? { '--tw-ring-color': 'var(--accent)' } as any : {}),
                      }}
                    >
                      <span className="text-xl">{shape.emoji}</span>
                    </div>
                    <span className={`text-[10px] font-medium ${isSelected ? 'text-dingle-dark' : 'text-ink-tertiary'}`}>
                      {shape.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 전광판 문구 ── */}
        {isEditable && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-dingle" />
              <span className="text-sm font-bold text-ink">전광판</span>
            </div>
            <button
              onClick={() => setView('marquee')}
              className="w-full bg-cream-50 rounded-dingle p-4 shadow-card border border-cream-300 active:scale-[0.97] transition-transform flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-dingle-light flex items-center justify-center">
                <Zap size={18} className="text-dingle-dark" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-bold text-ink">전광판 문구 수정</div>
                <div className="text-[10px] text-ink-tertiary">
                  {currentPhone?.homeScreen.widgets.flatMap(w => w.lines).slice(0, 2).join(' · ') || '문구를 설정하세요'}
                </div>
              </div>
            </button>
          </div>
        )}

        {/* ── 준비중 항목 ── */}
        <div className="pt-1 space-y-3">
          {comingSoonItems.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={i}
                className="bg-cream-50 rounded-dingle-icon p-4 flex items-center justify-between active:scale-[0.98] transition-transform border border-cream-300 opacity-60 cursor-pointer"
                style={shakingIndex === i ? { animation: 'shake 0.4s ease' } : undefined}
                onClick={() => handleShake(i)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center">
                    <ItemIcon size={16} className="text-ink-secondary" />
                  </div>
                  <span className="font-bold text-sm text-ink">{item.title}</span>
                </div>
                <Lock size={16} className="text-ink-tertiary" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-ink/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-50">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};
