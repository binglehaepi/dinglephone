import React from 'react';

export interface WidgetFrameProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
}
