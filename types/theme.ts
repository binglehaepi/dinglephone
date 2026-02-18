export interface DingleTheme {
  id: string;
  name: string;
  emoji: string;
  preview: string; // 설정 앱에서 미리보기용 그라디언트

  bgBase: string;
  bgElevated: string;
  bgSunken: string;
  wallpaper: string;
  lockWallpaper: string;

  bgDecoration: {
    type: string;
    emoji: string;
    opacity: number;
    count: number;
  };

  accent: string;
  accentLight: string;
  accentMedium: string;
  accentHover: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  border: string;
  borderStrong: string;

  shadow: string;

  iconColors: Record<string, { bg: string; color: string }>;

  statusBar: {
    logo: string;
    wifi: string;
    battery: 'pill' | 'heart';
  };

  widget: {
    bg: string;
    border: string;
    decoration: 'tape' | 'ribbon' | 'sparkle' | 'none';
    decorationColor: string;
  };

  dock: {
    bg: string;
    border: string;
  };

  guestbook: {
    visitorBubble: string;
    ownerBubble: string;
    ownerBorder: string;
  };

  badge: {
    bg: string;
    text: string;
  };

  notification: {
    bg: string;
    border: string;
    divider: string;
  };
}
