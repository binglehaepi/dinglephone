import React from 'react';
import { WidgetFrameProps } from './WidgetFrameProps';

export const RetroTVFrame: React.FC<WidgetFrameProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="active:scale-95 transition-transform">
      {/* 안테나 */}
      <div className="flex justify-center gap-7 mb-[-4px] relative z-10">
        <div
          className="origin-bottom -rotate-[25deg]"
          style={{ width: 1, height: 16, background: 'var(--accent)' }}
        />
        {/* 안테나 끝 볼 */}
        <div
          className="absolute -top-[1px] left-[calc(50%-14px)] w-[4px] h-[4px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />
        <div
          className="absolute -top-[1px] right-[calc(50%-14px)] w-[4px] h-[4px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />
        <div
          className="origin-bottom rotate-[25deg]"
          style={{ width: 1, height: 16, background: 'var(--accent)' }}
        />
      </div>

      {/* 본체 */}
      <div
        className="rounded-xl relative overflow-hidden"
        style={{
          width: 168,
          height: 130,
          background: 'color-mix(in srgb, var(--accent) 8%, white 92%)',
          border: '1px solid var(--accent)',
          padding: '6px 32px 6px 6px',
        }}
      >
        {/* 스크린 */}
        <div
          className="w-full h-full rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{ background: 'var(--bg-elevated)' }}
          >
            {children}
          </div>
        </div>

        {/* 우측 컨트롤 패널 */}
        <div className="absolute right-[7px] top-3 bottom-3 flex flex-col items-center justify-between py-1">
          {/* 채널 다이얼 */}
          <div
            className="w-4 h-4 rounded-full"
            style={{ border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
          />
          {/* 볼륨 다이얼 */}
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{ border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 6%, white 94%)' }}
          />
          {/* 전원 */}
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--accent)', opacity: 0.4 }}
          />
        </div>
      </div>

      {/* 다리 */}
      <div className="flex justify-between px-8 mt-[-1px]">
        <div
          className="w-2.5 h-2.5"
          style={{
            background: 'color-mix(in srgb, var(--accent) 15%, white 85%)',
            borderRadius: '0 0 3px 3px',
            border: '1px solid var(--accent)',
            borderTop: 'none',
          }}
        />
        <div
          className="w-2.5 h-2.5"
          style={{
            background: 'color-mix(in srgb, var(--accent) 15%, white 85%)',
            borderRadius: '0 0 3px 3px',
            border: '1px solid var(--accent)',
            borderTop: 'none',
          }}
        />
      </div>
    </button>
  );
};
