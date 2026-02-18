import React from 'react';
import { IconShape } from '../types';

export interface ShapeDefinition {
  id: IconShape;
  name: string;
  emoji: string;
  clipPath?: string;
  borderRadius?: string;
}

export const ICON_SHAPES: ShapeDefinition[] = [
  {
    id: 'square',
    name: '네모',
    emoji: '⬜',
    borderRadius: '16px',
  },
  {
    id: 'circle',
    name: '동그라미',
    emoji: '⭕',
    borderRadius: '50%',
  },
  {
    id: 'heart',
    name: '하트',
    emoji: '💗',
    clipPath: 'polygon(50% 85%, 15% 55%, 0% 35%, 0% 20%, 5% 8%, 15% 2%, 28% 0%, 40% 5%, 50% 18%, 60% 5%, 72% 0%, 85% 2%, 95% 8%, 100% 20%, 100% 35%, 85% 55%)',
  },
  {
    id: 'droplet',
    name: '물방울',
    emoji: '💧',
    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
  },
  {
    id: 'butterfly',
    name: '나비',
    emoji: '🦋',
    clipPath: 'polygon(50% 10%, 65% 0%, 85% 0%, 100% 10%, 100% 35%, 85% 50%, 100% 65%, 100% 90%, 85% 100%, 65% 100%, 50% 90%, 35% 100%, 15% 100%, 0% 90%, 0% 65%, 15% 50%, 0% 35%, 0% 10%, 15% 0%, 35% 0%)',
  },
  {
    id: 'diamond',
    name: '다이아몬드',
    emoji: '💎',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
];

/**
 * 주어진 shape에 대한 CSS 스타일 반환
 */
export function getIconShapeStyle(shape?: IconShape): React.CSSProperties {
  if (!shape || shape === 'square') {
    return { borderRadius: '16px' };
  }
  const def = ICON_SHAPES.find((s) => s.id === shape);
  if (!def) return { borderRadius: '16px' };
  if (def.clipPath) {
    return { clipPath: def.clipPath, borderRadius: '0px' };
  }
  if (def.borderRadius) {
    return { borderRadius: def.borderRadius };
  }
  return { borderRadius: '16px' };
}
