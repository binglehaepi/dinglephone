import React from 'react';
import { DinglePhoneData } from '../types';

interface HomeScreenProps {
  data: DinglePhoneData;
  onOpenApp: (appId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ data, onOpenApp }) => {
  return (
    <div className="flex flex-col h-full pt-6 pb-2 px-6">
      {/* Widgets Area */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        {/* Large Widget */}
        <div className="relative col-span-2 h-[120px] bg-white rounded-[24px] border border-bg-secondary p-5 flex flex-col justify-between shadow-soft">
          {/* Masking Tape Decor */}
          <div className="absolute -top-2 left-4 w-12 h-4 bg-accent-medium/50 rotate-[-4deg] opacity-80 rounded-[1px] backdrop-blur-sm z-10 shadow-sm" />
          
          <div className="flex justify-between items-start mt-1">
             <div className="font-bold text-[15px] text-text-primary">{data.owner.name}의 폰</div>
             <div className="text-2xl opacity-80">{data.owner.emoji}</div>
          </div>
          <div className="space-y-1 mt-1">
             {data.homeScreen.widgets[0].lines.map((line, i) => (
               <div key={i} className="flex items-center gap-2 text-[13px] font-medium text-text-secondary p-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                 {line}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-5 px-1 pb-4">
        {data.homeScreen.appLayout.map((app) => (
          <div key={app.id} className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => onOpenApp(app.id)}>
             <div 
                className="w-[54px] h-[54px] rounded-full flex items-center justify-center text-[22px] shadow-sm border border-black/5 transition-transform duration-100 group-active:scale-90 relative"
                style={{ backgroundColor: app.iconBg }}
             >
                {app.icon}
                {app.badge ? (
                  <div className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm border border-white">
                    {app.badge}
                  </div>
                ) : null}
             </div>
             <span className="text-[10px] font-medium text-text-secondary text-center leading-tight tracking-tight">
               {app.name}
             </span>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {/* Dock */}
      <div className="relative mb-2 mx-2">
         <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-[28px] border border-black/5 shadow-soft" />
         <div className="relative z-10 grid grid-cols-4 gap-4 px-5 py-3">
            {data.homeScreen.dock.map((app) => (
              <div key={app.id} className="flex flex-col items-center justify-center cursor-pointer" onClick={() => onOpenApp(app.id)}>
                 <div 
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[24px] shadow-sm border border-black/5 transition-transform duration-100 active:scale-90 hover:brightness-105"
                    style={{ backgroundColor: app.iconBg }}
                 >
                    {app.icon}
                 </div>
              </div>
            ))}
         </div>
      </div>
      
      {/* Home Indicator */}
      <div className="flex justify-center pb-1 opacity-30 text-text-tertiary font-bold tracking-[6px] text-xs">
        ···
      </div>
    </div>
  );
};