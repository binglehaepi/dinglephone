import React, { useState, useEffect } from 'react';

export const StatusBar: React.FC = () => {
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
    <div className="h-[44px] w-full flex justify-between items-end px-6 pb-2 text-text-secondary text-[14px] font-semibold select-none z-50 pointer-events-none">
      <div className="flex items-center gap-1 font-display tracking-wide">
        <span className="text-accent text-[12px]">♡</span>
        <span>{time}</span>
      </div>
      
      <div className="flex items-center gap-3 text-text-secondary">
        {/* Flower Wifi */}
        <div className="text-[14px] leading-none">
          ✿
        </div>

        {/* Dot Signal */}
        <div className="text-[10px] tracking-[-1px] font-bold">
          ▪▪▪
        </div>

        {/* Heart Battery */}
        <div className="flex items-center gap-1 text-xs relative">
           <div className="text-[16px] text-text-tertiary">♡</div>
           <div className="absolute top-[6px] left-[3px] w-[10px] h-[6px] bg-accent rounded-[1px]"></div>
           <span className="absolute -right-2 top-0 text-[8px] font-bold text-accent">⚡︎</span>
        </div>
      </div>
    </div>
  );
};