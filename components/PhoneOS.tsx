import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

import { PhoneData, DinglePhoneData } from '../types';
import {
  getSavedHomeWallpaper,
  getSavedLockWallpaper,
  saveHomeWallpaper,
  saveLockWallpaper,
  saveCustomHomeImage,
  saveCustomLockImage,
  WallpaperValue,
  CUSTOM_ID,
} from '../lib/wallpaper';
import { useTheme } from '../context/ThemeContext';
import { usePhone } from '../context/PhoneContext';

type Screen = 'LOCK' | 'HOME' | string;

const dingleEase = [0.32, 0.72, 0, 1] as const;

function wallpaperToStyle(wp: WallpaperValue): React.CSSProperties {
  if (wp.type === 'image') {
    return {
      backgroundImage: `url(${wp.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  return { background: wp.value };
}

// Convert PhoneData to DinglePhoneData for backward compatibility with app components
function phoneDataToLegacy(phone: PhoneData): DinglePhoneData {
  return {
    owner: {
      ...phone.owner,
      profileColor: '#F5D0B5',
    },
    device: 'dingle-phone',
    theme: {
      preset: 'peach',
      wallpaperStyle: 'gradient',
      wallpaper: '',
      lockWallpaper: '',
    },
    apps: {
      photos: phone.apps.photos,
      social: phone.apps.social,
      map: {
        title: phone.apps.map.title,
        places: phone.apps.map.visited,
        wishlist: phone.apps.map.wishlist.map((w) => ({
          ...w,
          rating: 0,
          visits: 0,
          color: '#FFF',
        })),
      },
      music: phone.apps.music,
      calendar: phone.apps.calendar,
      notes: phone.apps.notes,
      expenses: phone.apps.expenses,
      wishlistShop: phone.apps.wishlistShop,
      messages: phone.apps.messages,
      guestbook: {
        entries: phone.apps.guestbook.initialEntries,
      },
      appStore: phone.apps.appStore,
    },
    homeScreen: phone.homeScreen,
  };
}

interface PhoneOSProps {
  phone: PhoneData;
}

export const PhoneOS: React.FC<PhoneOSProps> = ({ phone }) => {
  const { theme } = useTheme();
  const { isEditable } = usePhone();
  const [screen, setScreen] = useState<Screen>('LOCK');
  const [showSearch, setShowSearch] = useState(false);

  const [homeWP, setHomeWP] = useState<WallpaperValue>(getSavedHomeWallpaper);
  const [lockWP, setLockWP] = useState<WallpaperValue>(getSavedLockWallpaper);

  // When theme changes, update wallpapers to theme defaults (unless user has a custom image)
  useEffect(() => {
    const savedHome = getSavedHomeWallpaper();
    const savedLock = getSavedLockWallpaper();
    if (savedHome.type === 'gradient') {
      const newWP: WallpaperValue = { type: 'gradient', value: theme.wallpaper };
      setHomeWP(newWP);
    }
    if (savedLock.type === 'gradient') {
      const newWP: WallpaperValue = { type: 'gradient', value: theme.lockWallpaper };
      setLockWP(newWP);
    }
  }, [theme]);

  // Reset screen when phone changes
  useEffect(() => {
    setScreen('LOCK');
  }, [phone.id]);

  // Convert to legacy format for app components
  const data = phoneDataToLegacy(phone);

  const handleUnlock = () => setScreen('HOME');

  const openApp = (appId: string) => {
    if (appId === 'search') {
      setShowSearch(true);
      return;
    }
    setScreen(appId);
  };

  const closeApp = () => setScreen('HOME');

  const handleChangeHomeWallpaper = useCallback((id: string, wp: WallpaperValue) => {
    if (id === CUSTOM_ID && wp.type === 'image') {
      saveCustomHomeImage(wp.value);
    } else {
      saveHomeWallpaper(id);
    }
    setHomeWP(wp);
  }, []);

  const handleChangeLockWallpaper = useCallback((id: string, wp: WallpaperValue) => {
    if (id === CUSTOM_ID && wp.type === 'image') {
      saveCustomLockImage(wp.value);
    } else {
      saveLockWallpaper(id);
    }
    setLockWP(wp);
  }, []);

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
      case 'settings':
        return (
          <SettingsApp
            onClose={closeApp}
            onChangeHomeWallpaper={handleChangeHomeWallpaper}
            onChangeLockWallpaper={handleChangeLockWallpaper}
          />
        );
      default: return null;
    }
  };

  const isHome = screen === 'HOME';
  const isLock = screen === 'LOCK';
  const isApp = !isHome && !isLock;

  return (
    <div className="relative w-full h-full overflow-hidden bg-cream-100 text-ink font-sans select-none">
      {/* Background Wallpaper */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: isApp ? 0.92 : 1,
          borderRadius: isApp ? '32px' : '0px',
        }}
        transition={{ duration: 0.25, ease: dingleEase as unknown as number[] }}
        style={wallpaperToStyle(homeWP)}
      />

      {/* Status Bar */}
      <div className="absolute top-0 w-full z-50">
        <StatusBar />
      </div>

      {/* Home button moved to dock in HomeScreen */}

      {/* Screen Container */}
      <div className="relative z-10 w-full h-full">
        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-[60]"
            >
              <SearchOverlay onClose={() => setShowSearch(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lock Screen Layer */}
        <AnimatePresence>
          {isLock && (
            <motion.div
              key="lock"
              className="absolute inset-0 z-40"
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.25, ease: dingleEase as unknown as number[] }}
            >
              <LockScreen data={data} onUnlock={handleUnlock} lockWallpaper={lockWP} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Screen Layer */}
        <AnimatePresence>
          {isHome && (
            <motion.div
              key="home"
              className="absolute inset-0 pt-[44px] pb-[34px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: dingleEase as unknown as number[] }}
            >
              <HomeScreen data={data} phone={phone} onOpenApp={openApp} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Layer */}
        <AnimatePresence>
          {isApp && (
            <motion.div
              key="app"
              className="absolute inset-0 bg-cream-100 z-20 shadow-elevated overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, borderRadius: '24px' }}
              animate={{ opacity: 1, scale: 1, borderRadius: '0px' }}
              exit={{ opacity: 0, scale: 0.85, borderRadius: '24px' }}
              transition={{ duration: 0.25, ease: dingleEase as unknown as number[] }}
            >
              {renderApp()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
