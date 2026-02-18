import React, { useState, useEffect } from 'react';
import { PhoneShell } from './components/PhoneShell';
import { PhoneOS } from './components/PhoneOS';
import { PhoneListScreen } from './components/PhoneListScreen';
import { usePhone } from './context/PhoneContext';
import { useTheme } from './context/ThemeContext';

// ── PhoneRouter: switches between phone list and selected phone ──
function PhoneRouter() {
  const { currentPhone } = usePhone();
  const { setThemeById } = useTheme();

  // Sync theme with selected phone's theme — only on phone switch, not on every update
  const currentPhoneId = currentPhone?.id ?? null;
  const currentPhoneTheme = currentPhone?.theme ?? 'default';
  useEffect(() => {
    setThemeById(currentPhoneTheme);
  }, [currentPhoneId, currentPhoneTheme, setThemeById]);

  if (!currentPhone) {
    return <PhoneListScreen />;
  }

  return <PhoneOS phone={currentPhone} />;
}

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="w-full h-[100dvh] overflow-hidden bg-cream-100">
        <PhoneRouter />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cream-200 flex items-center justify-center p-8 gap-20 font-sans text-ink relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #EDE5DC 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <PhoneShell>
        <PhoneRouter />
      </PhoneShell>
      
      <div className="hidden lg:block max-w-sm space-y-8 relative z-10">
         <div>
            <div className="inline-block px-3 py-1 rounded-full bg-dingle-light text-dingle-dark text-xs font-bold tracking-wider mb-4 border border-dingle/20">
                DINGLE PHONE
            </div>
            <h1 className="text-5xl font-bold text-ink mb-3 font-display">
                Dingle Phone
            </h1>
            <p className="text-xl text-ink-secondary leading-relaxed">
               나만의 캐릭터 폰 꾸미기
            </p>
         </div>
         
         <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-cream-50 rounded-dingle-lg shadow-card border border-cream-300">
               <div className="w-12 h-12 rounded-dingle-icon bg-cream-50 flex items-center justify-center overflow-hidden border border-cream-300">
                  <img src="/coconut.png" alt="Dingle" className="w-full h-full object-contain" />
               </div>
               <div>
                  <h3 className="font-bold text-ink">Dingle Theme</h3>
                  <p className="text-sm text-ink-tertiary">크림 컬러 기본 테마</p>
               </div>
            </div>
         </div>
         
         <div className="pt-4 flex items-center gap-2 opacity-50 text-sm text-ink-secondary">
            <span>dingle.kr</span>
            <span>·</span>
            <span>made by fan</span>
         </div>
      </div>
    </div>
  );
};

export default App;
