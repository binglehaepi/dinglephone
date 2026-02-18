import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function PillBattery() {
  return (
    <div className="flex items-center gap-0.5">
      <div className="w-5 h-2.5 rounded-full border border-ink-tertiary/40 overflow-hidden p-px">
        <div className="h-full w-[85%] rounded-full bg-dingle" />
      </div>
    </div>
  );
}

function HeartBattery() {
  return (
    <span className="text-[11px] leading-none" style={{ color: 'var(--accent)' }}>♥</span>
  );
}

function SignalIcon() {
  return (
    <div className="flex items-center gap-[1.5px]">
      <div className="w-[3px] h-[5px] rounded-[1px] bg-ink-tertiary/60" />
      <div className="w-[3px] h-[7px] rounded-[1px] bg-ink-tertiary/60" />
      <div className="w-[3px] h-[9px] rounded-[1px] bg-ink-tertiary/60" />
    </div>
  );
}

export const StatusBar: React.FC = () => {
  const { theme } = useTheme();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-5 pt-3 pb-2 select-none z-50 pointer-events-none">
      {/* 왼쪽: 테마 로고 + 시간 */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs" style={{ color: 'var(--accent)' }}>{theme.statusBar.logo}</span>
        <span className="font-display text-xs font-semibold text-ink-secondary">{time}</span>
      </div>

      {/* 오른쪽: 와이파이 + 시그널 + 배터리 */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-ink-tertiary">{theme.statusBar.wifi}</span>
        <SignalIcon />
        {theme.statusBar.battery === 'heart' ? <HeartBattery /> : <PillBattery />}
      </div>
    </div>
  );
};
