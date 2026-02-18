import React, { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';

interface SettingsAppProps {
  onClose: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({ onClose }) => {
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] text-text-primary relative">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-[#F2F2F7]/95 backdrop-blur-sm z-10">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">설정</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-6 pb-8">
        <div className="text-center py-4">
            <h2 className="text-lg font-bold mb-1">내 폰 꾸미기</h2>
            <p className="text-xs text-text-secondary">커스텀 기능은 곧 출시됩니다!</p>
        </div>

        {/* Mock Sections */}
        {[
            { title: "테마 컬러", icon: "🎨", preview: "colors" },
            { title: "배경화면 변경", icon: "🖼️" },
            { title: "디바이스 스킨", icon: "📱", preview: "skins" },
            { title: "폰트 변경", icon: "🔤" },
            { title: "스티커 & 장식", icon: "🧸" },
        ].map((item, i) => (
            <div key={i} className="bg-white rounded-[16px] p-4 flex items-center justify-between active:scale-[0.98] transition-transform" onClick={showToast}>
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-bold text-sm">{item.title}</span>
                </div>
                {item.preview === 'colors' ? (
                     <div className="flex gap-1">
                         {['#F4A77A', '#F2B5C1', '#C5B8E8', '#A8DBC5'].map(c => (
                             <div key={c} className="w-4 h-4 rounded-full" style={{background: c}}></div>
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

      {/* Toast */}
      {toast && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2">
              준비중입니다! 🔒
          </div>
      )}
    </div>
  );
};