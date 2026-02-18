import React from 'react';
import { WidgetFrameProps } from './WidgetFrameProps';

export const RetroPhoneFrame: React.FC<WidgetFrameProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="active:scale-95 transition-transform">
      <div
        className="relative overflow-hidden"
        style={{
          width: 122,
          height: 206,
          borderRadius: '14px 14px 20px 20px',
          background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
          border: '1px solid var(--accent)',
        }}
      >
        {/* 스피커 홀 */}
        <div className="flex justify-center gap-[3px] mt-2 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[2.5px] h-[2.5px] rounded-full"
              style={{ background: 'var(--accent)', opacity: 0.3 }}
            />
          ))}
        </div>

        {/* 스크린 */}
        <div className="mx-2">
          <div
            className="rounded-md overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '4/3',
                background: 'var(--bg-elevated)',
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-center items-center gap-2.5 mt-1.5 mb-1">
          <div
            className="w-4 h-2.5 rounded-full"
            style={{ border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
          />
          <div
            className="w-5 h-5 rounded-full"
            style={{ border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
          />
          <div
            className="w-4 h-2.5 rounded-full"
            style={{ border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
          />
        </div>

        {/* 키패드 (3x4) */}
        <div className="grid grid-cols-3 gap-[2.5px] px-2">
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map(k => (
            <div
              key={k}
              className="h-[12px] rounded-[2px] flex items-center justify-center"
              style={{
                border: '0.5px solid var(--accent)',
                background: 'color-mix(in srgb, var(--accent) 4%, white 96%)',
              }}
            >
              <span style={{ fontSize: 5.5, color: 'var(--accent)', opacity: 0.4, fontWeight: 600 }}>{k}</span>
            </div>
          ))}
        </div>

        {/* 하단 마이크 */}
        <div className="flex justify-center mt-1.5">
          <div
            className="w-5 h-[2px] rounded-full"
            style={{ background: 'var(--accent)', opacity: 0.2 }}
          />
        </div>
      </div>
    </button>
  );
};
