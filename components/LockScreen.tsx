import React, { useState, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { DinglePhoneData } from '../types';

interface LockScreenProps {
  data: DinglePhoneData;
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ data, onUnlock }) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = (y: number) => {
    setStartY(y);
    setIsDragging(true);
  };

  const handleMove = (y: number) => {
    if (!isDragging || startY === null) return;
    const delta = Math.min(0, y - startY); 
    setCurrentY(delta);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (currentY < -120) {
      setCurrentY(-1000); 
      setTimeout(onUnlock, 300);
    } else {
      setCurrentY(0);
    }
    setStartY(null);
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });
  const timeStr = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-40 flex flex-col items-center pt-20 pb-8 select-none transition-transform ease-out bg-bg-primary"
      style={{
        background: data.theme.lockWallpaper,
        transform: `translateY(${currentY}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
      }}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientY)}
      onMouseMove={(e) => handleMove(e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[8%] text-accent/10 text-xl animate-float">✦</div>
        <div className="absolute top-[50%] right-[10%] text-sub-lavender/20 text-lg animate-float" style={{animationDelay: '1s'}}>✦</div>
      </div>

      <div className="flex flex-col items-center text-text-primary mt-8 relative z-10">
        <div className="text-[56px] font-normal leading-none tracking-tight font-display text-text-primary">
          {timeStr}
        </div>
        <div className="text-[14px] font-medium mt-3 text-text-secondary tracking-wide">
          {dateStr}
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center pointer-events-none gap-4">
         <div className="text-[48px] animate-pulse drop-shadow-sm">
            {data.owner.emoji}
         </div>
         <div className="text-text-secondary font-medium text-[13px] bg-white/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/40">
            {data.owner.name}의 폰
         </div>
      </div>

      <div className="w-full px-6 space-y-3 pointer-events-none mb-16">
        {data.apps.messages.filter(m => m.unread).slice(0, 2).map((msg, i) => (
          <div key={i} className="bg-white/85 backdrop-blur-md rounded-[20px] p-4 text-text-primary shadow-soft border border-white/60 flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sm flex items-center gap-1">
                <span className="text-xs">🍰</span> {msg.from}
              </span>
              <span className="text-xs text-text-secondary">{msg.time}</span>
            </div>
            <div className="w-full border-t border-dashed border-text-tertiary/30 my-1"></div>
            <div className="text-sm text-text-secondary line-clamp-1">{msg.preview}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center text-text-tertiary animate-bounce gap-2">
        <ChevronUp size={20} />
        <span className="text-[12px] font-medium animate-pulse">위로 밀어서 잠금해제</span>
      </div>

      <div className="absolute bottom-2 font-bold text-text-tertiary tracking-widest text-xs opacity-50">
          ···
      </div>
    </div>
  );
};