import React from 'react';
import { WidgetFrameProps } from './WidgetFrameProps';

export const TamagotchiFrame: React.FC<WidgetFrameProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center active:scale-95 transition-transform">
      {/* 체인 고리 */}
      <div className="relative mb-[-6px] z-10">
        <div
          className="w-5 h-3.5 rounded-full"
          style={{ border: '1px solid var(--accent)' }}
        />
      </div>

      {/* 본체 (달걀형) */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 132,
          height: 164,
          borderRadius: '48% 48% 46% 46% / 56% 56% 44% 44%',
          background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
          border: '1px solid var(--accent)',
        }}
      >
        {/* 스크린 영역 */}
        <div
          className="absolute"
          style={{ top: 22, left: 20, right: 20, height: 78 }}
        >
          <div
            className="w-full h-full rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="w-full h-full overflow-hidden flex items-center justify-center"
              style={{ background: 'var(--bg-elevated)' }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* DINGLE 텍스트 */}
        <div
          className="absolute w-full text-center"
          style={{
            top: 106,
            fontSize: 5.5,
            fontWeight: 800,
            letterSpacing: 2,
            color: 'var(--accent)',
            opacity: 0.4,
          }}
        >
          DINGLE
        </div>

        {/* 하단 버튼 3개 */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4">
          {['A', 'B', 'C'].map((label) => (
            <div key={label} className="flex flex-col items-center gap-[1px]">
              <div
                className="w-[11px] h-[11px] rounded-full"
                style={{
                  border: '1px solid var(--accent)',
                  background: 'color-mix(in srgb, var(--accent) 6%, white 94%)',
                }}
              />
              <span style={{ fontSize: 4, color: 'var(--accent)', opacity: 0.5, fontWeight: 700 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};
