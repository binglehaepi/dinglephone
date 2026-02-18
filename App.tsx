import React, { useState, useEffect } from 'react';
import { PhoneShell } from './components/PhoneShell';
import { PhoneOS } from './components/PhoneOS';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="w-full h-[100dvh] overflow-hidden bg-bg-primary">
        <PhoneOS />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FFF8F3] flex items-center justify-center p-8 gap-20 font-sans text-text-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(#F4A77A 1px, transparent 1px)',
             backgroundSize: '32px 32px'
           }}
      />
      
      <PhoneShell>
        <PhoneOS />
      </PhoneShell>
      
      <div className="hidden lg:block max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
         <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent-dark text-xs font-bold tracking-wider mb-4 border border-accent/20">
                DINGLE PHONE
            </div>
            <h1 className="text-5xl font-bold text-text-primary mb-3 font-display">
                달콤한 하루
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
               디저트 덕후의<br/>
               핸드폰 훔쳐보기 ♡
            </p>
         </div>
         
         <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] shadow-soft border border-white/50">
               <div className="w-12 h-12 rounded-full bg-sub-pink flex items-center justify-center text-2xl">🍰</div>
               <div>
                  <h3 className="font-bold text-text-primary">Peach Theme</h3>
                  <p className="text-sm text-text-tertiary">따뜻하고 달콤한 피치 컬러 테마</p>
               </div>
            </div>
         </div>
         
         <div className="pt-4 flex items-center gap-2 opacity-50 text-sm">
            <span>dingle.kr</span>
            <span>·</span>
            <span>made by fan</span>
         </div>
      </div>
    </div>
  );
};

export default App;