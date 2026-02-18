import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { DinglePhoneData } from '../types';
import { WallpaperValue } from '../lib/wallpaper';
import { useTheme } from '../context/ThemeContext';

interface LockScreenProps {
  data: DinglePhoneData;
  onUnlock: () => void;
  lockWallpaper?: WallpaperValue;
}

const dingleEase = [0.32, 0.72, 0, 1];

// 배경 장식 위치 (% 기반)
const decoPositions = [
  { top: '12%', left: '10%', size: 'text-2xl' },
  { top: '25%', right: '15%', size: 'text-lg' },
  { top: '45%', left: '75%', size: 'text-xl' },
  { top: '60%', left: '8%', size: 'text-sm' },
  { top: '70%', right: '25%', size: 'text-lg' },
  { top: '85%', left: '50%', size: 'text-xl' },
  { top: '35%', left: '55%', size: 'text-sm' },
  { top: '78%', left: '20%', size: 'text-lg' },
];

export const LockScreen: React.FC<LockScreenProps> = ({ data, onUnlock, lockWallpaper }) => {
  const { theme } = useTheme();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [0, 1]);

  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });
  const timeStr = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });

  const isImage = lockWallpaper?.type === 'image';
  const bgStyle: React.CSSProperties = isImage
    ? {
        backgroundImage: `url(${lockWallpaper!.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: lockWallpaper?.value || theme.lockWallpaper,
      };
  const isDark = isImage;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -120) {
      onUnlock();
    }
  };

  const { bgDecoration, notification } = theme;
  const decorCount = Math.min(bgDecoration.count, decoPositions.length);

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center pt-20 pb-8 select-none bg-cream-100 touch-pan-y"
      style={{ ...bgStyle, y, opacity }}
      drag="y"
      dragConstraints={{ top: -300, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {isImage && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}

      {/* Background Decorations */}
      {!isImage && decorCount > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {decoPositions.slice(0, decorCount).map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos.size}`}
              style={{
                top: pos.top,
                left: pos.left,
                right: (pos as any).right,
                opacity: bgDecoration.opacity,
                color: 'var(--text-primary)',
              }}
            >
              {bgDecoration.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Time & Date */}
      <div className={`flex flex-col items-center mt-8 relative z-10 ${isDark ? 'text-white' : 'text-ink'}`}>
        <div className={`text-[56px] font-light leading-none tracking-tight font-display ${isDark ? 'drop-shadow-md' : ''}`}>
          {timeStr}
        </div>
        <div className={`text-[14px] font-medium mt-3 tracking-wide ${isDark ? 'text-white/70 drop-shadow-sm' : 'text-ink-secondary'}`}>
          {dateStr}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notification Cards */}
      <div className="w-full px-6 space-y-3 pointer-events-none mb-16 relative z-10">
        {data.apps.messages.filter(m => m.unread).slice(0, 2).map((msg, i) => (
          <motion.div
            key={i}
            className="backdrop-blur-md rounded-dingle p-4 shadow-card flex flex-col gap-1"
            style={{
              background: notification.bg,
              border: `1px solid ${notification.border}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3, ease: dingleEase as unknown as number[] }}
          >
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sm text-ink flex items-center gap-1">{msg.from}</span>
              <span className="text-xs text-ink-secondary">{msg.time}</span>
            </div>
            <div className="w-full border-t border-dashed my-1" style={{ borderColor: notification.divider }} />
            <div className="text-sm text-ink-secondary line-clamp-1">{msg.preview}</div>
          </motion.div>
        ))}
      </div>

      {/* Unlock Hint */}
      <motion.div
        className={`flex flex-col items-center gap-2 relative z-10 ${isDark ? 'text-white/50' : 'text-ink-tertiary'}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <ChevronUp size={20} />
        <span className="text-[12px] font-medium">위로 밀어서 잠금해제</span>
      </motion.div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 z-10">
        <div className="w-[134px] h-[5px] rounded-full bg-ink/10" />
      </div>
    </motion.div>
  );
};
