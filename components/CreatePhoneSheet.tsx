import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { usePhone } from '../context/PhoneContext';
import { themeList } from '../data/themes';

interface CreatePhoneSheetProps {
  onClose: () => void;
}

export const CreatePhoneSheet: React.FC<CreatePhoneSheetProps> = ({ onClose }) => {
  const { createPhone } = usePhone();
  const [name, setName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('default');

  const handleCreate = () => {
    if (!name.trim()) return;
    createPhone(name.trim(), selectedTheme);
    onClose();
  };

  return (
    <motion.div
      className="absolute inset-0 z-[200]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 rounded-t-[28px] p-6 pb-10 max-h-[85%] overflow-y-auto"
        style={{ background: '#FFFDF9' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: '#DDD2C6' }} />

        <h3 className="text-lg font-bold mb-6" style={{ color: '#3D2F2F' }}>
          ✨ 새 폰 만들기
        </h3>

        {/* Name Input */}
        <div className="mb-6">
          <label className="text-xs font-bold mb-2 block" style={{ color: '#9A8580' }}>
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="내 이름 입력..."
            maxLength={20}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: '#F5EDE4',
              border: '1px solid #EDE5DC',
              color: '#3D2F2F',
            }}
          />
        </div>

        {/* Theme Selection */}
        <div className="mb-8">
          <label className="text-xs font-bold mb-3 block" style={{ color: '#9A8580' }}>
            테마 선택
          </label>
          <div className="grid grid-cols-3 gap-3">
            {themeList.map((t) => {
              const isSelected = t.id === selectedTheme;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-full aspect-square rounded-[16px] flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2 ${
                      isSelected ? 'ring-2 scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      background: t.preview,
                      borderColor: isSelected ? t.accent : 'transparent',
                      ...(isSelected ? ({ '--tw-ring-color': t.accent + '40' } as any) : {}),
                    }}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    {isSelected && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                        style={{ background: t.accent }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: isSelected ? '#3D2F2F' : '#C8B8B0' }}
                  >
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim()}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-all disabled:opacity-40"
          style={{
            background: name.trim() ? '#E8915A' : '#C8B8B0',
          }}
        >
          만들기 ♡
        </button>
      </motion.div>
    </motion.div>
  );
};
