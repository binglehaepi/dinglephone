import React from 'react';
import { WidgetFrameType, PhoneData } from '../../types';
import { WidgetContent } from './WidgetContent';
import { TamagotchiFrame } from './frames/TamagotchiFrame';
import { RetroPhoneFrame } from './frames/RetroPhoneFrame';
import { RetroTVFrame } from './frames/RetroTVFrame';
import { BrowserFrame } from './frames/BrowserFrame';
import { NintendoDSFrame } from './frames/NintendoDSFrame';

interface WidgetRendererProps {
  frame?: WidgetFrameType;
  label?: string;
  appId: string;
  phone: PhoneData;
  onClick: () => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  frame,
  label,
  appId,
  phone,
  onClick,
}) => {
  const content = <WidgetContent appId={appId} phone={phone} />;

  switch (frame) {
    case 'tamagotchi':
      return <TamagotchiFrame onClick={onClick}>{content}</TamagotchiFrame>;
    case 'retrophone':
      return <RetroPhoneFrame onClick={onClick}>{content}</RetroPhoneFrame>;
    case 'retrotv':
      return <RetroTVFrame onClick={onClick}>{content}</RetroTVFrame>;
    case 'browser':
      return <BrowserFrame title={label} onClick={onClick}>{content}</BrowserFrame>;
    case 'nintendods': {
      // DS: 사진첩일 경우 하단 스크린에 다음 사진 표시
      const bottomContent = appId === 'photos'
        ? <WidgetContent appId={appId} phone={phone} photoIndex={1} />
        : undefined;
      return (
        <NintendoDSFrame onClick={onClick} bottomContent={bottomContent}>
          {content}
        </NintendoDSFrame>
      );
    }
    default:
      return <button onClick={onClick}>{content}</button>;
  }
};

// 프레임 정보 목록 (편집 UI에서 사용) — 디바이스 프레임만
export const WIDGET_FRAME_LIST: {
  type: WidgetFrameType;
  emoji: string;
  name: string;
  defaultSpan: { cols: number; rows: number };
}[] = [
  { type: 'tamagotchi', emoji: '🥚', name: '다마고치', defaultSpan: { cols: 2, rows: 2 } },
  { type: 'retrophone', emoji: '📱', name: '레트로폰', defaultSpan: { cols: 2, rows: 3 } },
  { type: 'retrotv', emoji: '📺', name: '레트로TV', defaultSpan: { cols: 3, rows: 2 } },
  { type: 'browser', emoji: '🖥️', name: '브라우저', defaultSpan: { cols: 3, rows: 2 } },
  { type: 'nintendods', emoji: '🕹️', name: '닌텐도DS', defaultSpan: { cols: 2, rows: 3 } },
];
