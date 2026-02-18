import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Plus, Trash2, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { usePhone } from '../context/PhoneContext';
import { PhoneData } from '../types';
import { themes, themeList } from '../data/themes';
import { CreatePhoneSheet } from './CreatePhoneSheet';

export const PhoneListScreen: React.FC = () => {
  const { allPhones, selectPhone, removePhone } = usePhone();
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  // All items: phones + "add" card at the end
  const totalCards = allPhones.length + 1; // +1 for the "add new" card

  const handleDelete = (id: string) => {
    if (deletingId === id) {
      removePhone(id);
      setDeletingId(null);
      // Adjust index if needed
      if (currentIndex >= allPhones.length - 1) {
        setCurrentIndex(Math.max(0, allPhones.length - 2));
      }
    } else {
      setDeletingId(id);
      setTimeout(() => setDeletingId(null), 3000);
    }
  };

  const getThemeWallpaper = (themeId: string) => {
    return themes[themeId]?.lockWallpaper || themes['default'].lockWallpaper;
  };

  const getThemeAccent = (themeId: string) => {
    return themes[themeId]?.accent || themes['default'].accent;
  };

  const goNext = () => {
    if (currentIndex < totalCards - 1) {
      setDragDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDragDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentIndex < totalCards - 1) {
      goNext();
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      goPrev();
    }
  };

  const isAddCard = currentIndex >= allPhones.length;
  const currentPhone = !isAddCard ? allPhones[currentIndex] : null;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative" style={{ background: '#FAF6F1' }}>
      {/* Carousel */}
      <div className="flex-1 flex items-center justify-center relative px-6 overflow-hidden">
        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            className="absolute left-2 z-20 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}
            onClick={goPrev}
          >
            <ChevronLeft size={16} style={{ color: '#9A8580' }} />
          </button>
        )}
        {currentIndex < totalCards - 1 && (
          <button
            className="absolute right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}
            onClick={goNext}
          >
            <ChevronRight size={16} style={{ color: '#9A8580' }} />
          </button>
        )}

        {/* Swipeable area */}
        <motion.div
          className="w-full h-full flex items-center justify-center touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="popLayout" custom={dragDirection}>
            {isAddCard ? (
              <motion.div
                key="add-card"
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection >= 0 ? 200 : -200, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dragDirection >= 0 ? -200 : 200, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="w-full max-w-[280px] aspect-[9/16] rounded-[32px] flex flex-col items-center justify-center gap-4 cursor-pointer"
                style={{
                  border: '2.5px dashed #DDD2C6',
                  background: 'rgba(255,253,249,0.6)',
                }}
                onClick={() => setShowCreate(true)}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#FFF3EB' }}
                >
                  <Plus size={28} style={{ color: '#E8915A' }} />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold" style={{ color: '#3D2F2F' }}>
                    새 폰 만들기
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: '#C8B8B0' }}>
                    나만의 덕질 폰을 꾸며보세요
                  </div>
                </div>
              </motion.div>
            ) : currentPhone ? (
              <motion.div
                key={currentPhone.id}
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection >= 0 ? 200 : -200, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dragDirection >= 0 ? -200 : 200, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="w-full max-w-[280px] aspect-[9/16] rounded-[32px] overflow-hidden relative cursor-pointer shadow-lg"
                style={{
                  background: getThemeWallpaper(currentPhone.theme),
                  boxShadow: '0 12px 40px rgba(61,47,47,0.15)',
                }}
                onClick={() => selectPhone(currentPhone.id)}
              >
                {/* Mini status bar */}
                <div className="flex justify-between items-center px-6 pt-5 pb-2">
                  <span className="text-[10px] font-medium" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    {themes[currentPhone.theme]?.statusBar?.logo || '♡'}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: 'rgba(0,0,0,0.35)' }}>
                    9:41
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    {themes[currentPhone.theme]?.statusBar?.wifi || '✿'}
                  </span>
                </div>

                {/* Time display */}
                <div className="text-center mt-6">
                  <div className="text-[40px] font-light leading-none tracking-tight" style={{ color: 'rgba(0,0,0,0.6)' }}>
                    {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
                  </div>
                  <div className="text-[11px] mt-1.5" style={{ color: 'rgba(0,0,0,0.3)' }}>
                    {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Mini notification preview */}
                {currentPhone.apps.messages.filter(m => m.unread).length > 0 && (
                  <div className="px-5 mb-4">
                    <div
                      className="rounded-2xl p-3 backdrop-blur-sm"
                      style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.4)' }}
                    >
                      <div className="text-[10px] font-bold" style={{ color: 'rgba(0,0,0,0.5)' }}>
                        {currentPhone.apps.messages.filter(m => m.unread)[0]?.from}
                      </div>
                      <div className="text-[9px] mt-0.5 truncate" style={{ color: 'rgba(0,0,0,0.35)' }}>
                        {currentPhone.apps.messages.filter(m => m.unread)[0]?.preview}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom home indicator */}
                <div className="flex justify-center pb-4">
                  <div className="w-[80px] h-[3px] rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
                </div>

                {/* Delete button for user phones */}
                {!currentPhone.isDefault && (
                  <button
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10"
                    style={{
                      background: deletingId === currentPhone.id ? '#E85A6A' : 'rgba(0,0,0,0.12)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(currentPhone.id);
                    }}
                  >
                    <Trash2 size={12} color={deletingId === currentPhone.id ? 'white' : 'rgba(0,0,0,0.4)'} />
                  </button>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Phone info below carousel */}
      <div className="shrink-0 pb-6 pt-4 px-6 text-center">
        {currentPhone ? (
          <div>
            <div className="text-base font-bold" style={{ color: '#3D2F2F' }}>
              {currentPhone.owner.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#9A8580' }}>
              {currentPhone.owner.bio}
            </div>
            {currentPhone.isDefault && (
              <div
                className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#FFF3EB', color: '#E8915A' }}
              >
                구경하기
              </div>
            )}
            {!currentPhone.isDefault && (
              <div
                className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#FFF3EB', color: '#E8915A' }}
              >
                <Settings size={10} /> 편집하기
              </div>
            )}
          </div>
        ) : isAddCard ? (
          <div>
            <button
              onClick={() => setShowCreate(true)}
              className="text-sm font-bold px-6 py-2 rounded-full transition-all active:scale-95"
              style={{ background: '#E8915A', color: 'white' }}
            >
              ✨ 새 폰 만들기
            </button>
            <div className="text-xs mt-2" style={{ color: '#C8B8B0' }}>
              테마를 고르고 덕질을 채워보세요
            </div>
          </div>
        ) : null}

        {/* Pagination dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalCards }).map((_, i) => (
            <button
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 20 : 6,
                height: 6,
                background: i === currentIndex ? '#E8915A' : '#EDE5DC',
              }}
              onClick={() => {
                setDragDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4">
          <p className="text-[10px]" style={{ color: '#C8B8B0' }}>
            Made with ♡ by Dingle
          </p>
        </div>
      </div>

      {/* Create Phone Sheet */}
      <AnimatePresence>
        {showCreate && <CreatePhoneSheet onClose={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};
