import React from 'react';
import { WidgetFrameProps } from './WidgetFrameProps';

interface NintendoDSFrameProps extends WidgetFrameProps {
  bottomContent?: React.ReactNode;
}

export const NintendoDSFrame: React.FC<NintendoDSFrameProps> = ({ children, bottomContent, onClick }) => {
  return (
    <button onClick={onClick} className="active:scale-95 transition-transform">
      <div className="flex flex-col items-center">
        {/* 상단 화면 */}
        <div
          className="rounded-t-xl overflow-hidden relative"
          style={{
            width: 150,
            background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
            border: '1px solid var(--accent)',
            borderBottom: 'none',
            padding: '5px 5px 2px 5px',
          }}
        >
          {/* 카메라 */}
          <div className="flex justify-center mb-[2px]">
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: 'var(--accent)', opacity: 0.3 }} />
          </div>
          {/* 스크린 */}
          <div
            className="rounded-[5px] overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="overflow-hidden"
              style={{
                aspectRatio: '4/3',
                background: 'var(--bg-elevated)',
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* 힌지 */}
        <div className="flex items-center" style={{ width: '88%' }}>
          <div className="flex-1 h-[2px]" style={{ background: 'var(--accent)', opacity: 0.3 }} />
          <div className="w-2.5 h-[3px] rounded-full" style={{ background: 'var(--accent)', opacity: 0.4 }} />
          <div className="flex-1 h-[2px]" style={{ background: 'var(--accent)', opacity: 0.3 }} />
        </div>

        {/* 하단 화면 + 버튼 */}
        <div
          className="rounded-b-xl overflow-hidden relative"
          style={{
            width: 150,
            background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
            border: '1px solid var(--accent)',
            borderTop: 'none',
            padding: '2px 5px 5px 5px',
          }}
        >
          {/* 하단 스크린 */}
          <div
            className="rounded-[5px] overflow-hidden mb-1"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="overflow-hidden"
              style={{
                aspectRatio: '4/3',
                background: 'var(--bg-elevated)',
              }}
            >
              {bottomContent || (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontSize: 6, opacity: 0.2, fontWeight: 600, color: 'var(--text-tertiary)' }}>TOUCH</span>
                </div>
              )}
            </div>
          </div>

          {/* 하단 컨트롤 */}
          <div className="flex justify-between items-center px-1">
            {/* 십자키 */}
            <div className="relative" style={{ width: 18, height: 18 }}>
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full rounded-[1.5px]"
                style={{ height: 6, border: '0.5px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
              />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 rounded-[1.5px]"
                style={{ width: 6, height: '100%', border: '0.5px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
              />
            </div>

            {/* SELECT / START */}
            <div className="flex gap-1">
              {['SEL', 'STA'].map((label) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="rounded-full" style={{ width: 8, height: 3, background: 'var(--accent)', opacity: 0.25 }} />
                  <span style={{ fontSize: 3, fontWeight: 600, color: 'var(--accent)', opacity: 0.3 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* A B X Y 버튼 */}
            <div className="relative" style={{ width: 18, height: 18 }}>
              {[
                { label: 'X', top: 0, left: '50%', tx: '-50%', ty: '0' },
                { label: 'A', top: '50%', left: '100%', tx: '-100%', ty: '-50%' },
                { label: 'B', top: '100%', left: '50%', tx: '-50%', ty: '-100%' },
                { label: 'Y', top: '50%', left: 0, tx: '0', ty: '-50%' },
              ].map(btn => (
                <div
                  key={btn.label}
                  className="absolute w-[7px] h-[7px] rounded-full flex items-center justify-center"
                  style={{
                    top: btn.top,
                    left: btn.left,
                    transform: `translate(${btn.tx}, ${btn.ty})`,
                    border: '0.5px solid var(--accent)',
                    background: 'color-mix(in srgb, var(--accent) 10%, white 90%)',
                  }}
                >
                  <span style={{ fontSize: 3.5, fontWeight: 700, color: 'var(--accent)', opacity: 0.5 }}>{btn.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
