import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── 바텀시트 형태의 편집 폼 ──
interface EditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const EditSheet: React.FC<EditSheetProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Bottom Sheet */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[81] rounded-t-[28px] p-5 pb-8 max-h-[80%] overflow-y-auto"
            style={{ background: 'var(--bg-elevated)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-4"
              style={{ background: 'var(--border-strong)' }}
            />
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── 공통 입력 필드 ──
interface DingleInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}

export const DingleInput: React.FC<DingleInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  type = 'text',
}) => {
  return (
    <div className="mb-3">
      <label
        className="text-xs font-medium mb-1 block"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors resize-none"
          style={{
            background: 'var(--bg-sunken)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors"
          style={{
            background: 'var(--bg-sunken)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      )}
    </div>
  );
};

// ── 편집/삭제 버튼 ──
interface EditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
      style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
    >
      편집
    </button>
  );
};

// ── 저장 버튼 ──
interface SaveButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled, label = '저장' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
      style={{ background: 'var(--accent)' }}
    >
      {label}
    </button>
  );
};
