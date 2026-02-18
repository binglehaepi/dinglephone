import React from 'react';
import { WidgetFrameProps } from './WidgetFrameProps';

interface BrowserFrameProps extends WidgetFrameProps {
  title?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({ children, onClick, title = '' }) => {
  return (
    <button onClick={onClick} className="active:scale-95 transition-transform">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          width: 168,
          background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
          border: '1px solid var(--accent)',
        }}
      >
        {/* 타이틀 바 */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-[5px]"
          style={{ borderBottom: '1px solid var(--accent)' }}
        >
          <div className="flex gap-[3px]">
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#FF6B6B' }} />
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#FFD93D' }} />
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#6BCB77' }} />
          </div>
          {title && (
            <span className="ml-1 truncate" style={{ fontSize: 6.5, fontWeight: 600, color: 'var(--text-tertiary)' }}>
              {title}
            </span>
          )}
        </div>

        {/* 콘텐츠 영역 */}
        <div
          className="mx-1 mb-1 mt-1 rounded-md overflow-hidden"
          style={{
            minHeight: 85,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
          }}
        >
          {children}
        </div>
      </div>
    </button>
  );
};
