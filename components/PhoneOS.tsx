import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { LockScreen } from './LockScreen';
import { HomeScreen } from './HomeScreen';
import { SearchOverlay } from './SearchOverlay';
import { PhotosApp } from './apps/PhotosApp';
import { MusicApp } from './apps/MusicApp';
import { CalendarApp } from './apps/CalendarApp';
import { NotesApp } from './apps/NotesApp';
import { GuestbookApp } from './apps/GuestbookApp';
import { MapApp } from './apps/MapApp';
import { MessagesApp } from './apps/MessagesApp';
import { SocialApp } from './apps/SocialApp';
import { ExpenseApp } from './apps/ExpenseApp';
import { WishlistApp } from './apps/WishlistApp';
import { AppStoreApp } from './apps/AppStoreApp';
import { SettingsApp } from './apps/SettingsApp';

import { demoPhoneData } from '../data/phoneData';

type Screen = 'LOCK' | 'HOME' | string;

export const PhoneOS: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('LOCK');
  const [closingApp, setClosingApp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const data = demoPhoneData;

  const handleUnlock = () => {
    setScreen('HOME');
  };

  const openApp = (appId: string) => {
    if (appId === 'search') {
        setShowSearch(true);
        return;
    }
    setScreen(appId);
  };

  const closeApp = () => {
    setClosingApp(true);
    setTimeout(() => {
        setScreen('HOME');
        setClosingApp(false);
    }, 200);
  };

  const renderApp = () => {
    const commonProps = { data, onClose: closeApp };
    switch (screen) {
      case 'photos': return <PhotosApp {...commonProps} />;
      case 'music': return <MusicApp {...commonProps} />;
      case 'calendar': return <CalendarApp {...commonProps} />;
      case 'notes': return <NotesApp {...commonProps} />;
      case 'guestbook': return <GuestbookApp {...commonProps} />;
      case 'map': return <MapApp {...commonProps} />;
      case 'messages': return <MessagesApp {...commonProps} />;
      case 'social': return <SocialApp {...commonProps} />;
      case 'expenses': return <ExpenseApp {...commonProps} />;
      case 'wishlist': return <WishlistApp {...commonProps} />;
      case 'appstore': return <AppStoreApp {...commonProps} />;
      case 'settings': return <SettingsApp onClose={closeApp} />;
      default: return null;
    }
  };

  const isHome = screen === 'HOME';
  const isLock = screen === 'LOCK';
  const isApp = !isHome && !isLock;

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg-primary text-text-primary font-sans select-none">
      {/* Background Wallpaper */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-500 ease-in-out"
        style={{ 
          background: data.theme.wallpaper,
          transform: isApp ? 'scale(0.92)' : 'scale(1)',
          borderRadius: isApp ? '32px' : '0px',
        }}
      />

      {/* Status Bar */}
      <div className="absolute top-0 w-full z-50">
         <StatusBar />
      </div>

      {/* Screen Container */}
      <div className="relative z-10 w-full h-full">
        {/* Search Overlay */}
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}

        {/* Lock Screen Layer */}
        {isLock && <LockScreen data={data} onUnlock={handleUnlock} />}

        {/* Home Screen Layer */}
        <div 
            className={`absolute inset-0 pt-[44px] pb-[34px] transition-all duration-300 ${isHome ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
            <HomeScreen data={data} onOpenApp={openApp} />
        </div>

        {/* App Layer */}
        {isApp && (
            <div 
                className={`absolute inset-0 bg-bg-primary z-20 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${closingApp ? 'translate-x-full' : 'translate-x-0'}`}
            >
                {renderApp()}
            </div>
        )}
      </div>
    </div>
  );
};