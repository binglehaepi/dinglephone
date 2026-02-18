import React, { useState } from 'react';
import { ChevronLeft, Check, Lock } from 'lucide-react';
import {
  homeWallpapers,
  lockWallpapers,
  getSavedHomeId,
  getSavedLockId,
  WallpaperPreset,
} from '../../lib/wallpaper';

interface SettingsAppProps {
  onClose: () => void;
  onChangeHomeWallpaper: (id: string, gradient: string) => void;
  onChangeLockWallpaper: (id: string, gradient: string) => void;
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
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSelectHome = (preset: WallpaperPreset) => {
    setSelectedHome(preset.id);
    onChangeHomeWallpaper(preset.id, preset.gradient);
    showToast(`배경화면이 "${preset.name}"(으)로 변경되었어요!`);
  };

  const handleSelectLock = (preset: WallpaperPreset) => {
    setSelectedLock(preset.id);
    onChangeLockWallpaper(preset.id, preset.gradient);
    showToast(`잠금화면이 "${preset.name}"(으)로 변경되었어요!`);
  };

  // ── 배경화면 선택 화면 ──
  const renderWallpaperPicker = (
    title: string,
    presets: WallpaperPreset[],
    selectedId: string,
    onSelect: (preset: WallpaperPreset) => void,
  ) => (
    <div className="flex flex-col h-full bg-[#F2F2F7] text-text-primary relative">
      <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-[#F2F2F7]/95 backdrop-blur-sm z-10">
        <button onClick={() => setView('main')} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">{title}</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8">
        {/* 미리보기 */}
        <div className="mb-6">
          <div
            className="w-full h-[200px] rounded-[24px] shadow-soft border border-white/50 flex items-center justify-center transition-all duration-500"
            style={{ background: presets.find((p) => p.id === selectedId)?.gradient }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">
                {presets.find((p) => p.id === selectedId)?.emoji}
              </div>
              <div className={`text-sm font-bold ${selectedId === 'night' ? 'text-white/80' : 'text-text-secondary'}`}>
                현재 적용중
              </div>
            </div>
          </div>
        </div>

        {/* 그리드 선택 */}
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

  // ── 서브 뷰 라우팅 ──
  if (view === 'homeWallpaper') {
    return renderWallpaperPicker('배경화면', homeWallpapers, selectedHome, handleSelectHome);
  }
  if (view === 'lockWallpaper') {
    return renderWallpaperPicker('잠금화면', lockWallpapers, selectedLock, handleSelectLock);
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
              className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-black/5"
              style={{ background: homeWallpapers.find((w) => w.id === selectedHome)?.gradient }}
            />
            <div className="text-xs font-bold text-text-primary">🖼️ 배경화면</div>
            <div className="text-[10px] text-text-tertiary mt-0.5">
              {homeWallpapers.find((w) => w.id === selectedHome)?.name}
            </div>
          </button>

          <button
            onClick={() => setView('lockWallpaper')}
            className="bg-white rounded-[20px] p-3 shadow-sm border border-white/60 active:scale-[0.97] transition-transform"
          >
            <div
              className="w-full h-[100px] rounded-[14px] mb-2 shadow-sm border border-black/5"
              style={{ background: lockWallpapers.find((w) => w.id === selectedLock)?.gradient }}
            />
            <div className="text-xs font-bold text-text-primary">🔒 잠금화면</div>
            <div className="text-[10px] text-text-tertiary mt-0.5">
              {lockWallpapers.find((w) => w.id === selectedLock)?.name}
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
