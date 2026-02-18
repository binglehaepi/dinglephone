import { DingleTheme } from '../types/theme';

// ── 딩글 기본 (Dingle Default) ──
const defaultTheme: DingleTheme = {
  id: 'default',
  name: '딩글 기본',
  emoji: '🧁',
  preview: 'linear-gradient(135deg, #FAF6F1, #F5EDE4)',

  bgBase: '#FAF6F1',
  bgElevated: '#FFFDF9',
  bgSunken: '#F5EDE4',
  wallpaper: 'linear-gradient(180deg, #FAF6F1 0%, #FFF3EB 50%, #FAF6F1 100%)',
  lockWallpaper: 'linear-gradient(180deg, #FAF6F1 0%, #FFECD2 50%, #FFF5EE 100%)',

  bgDecoration: {
    type: 'dots',
    emoji: '✦',
    opacity: 0.04,
    count: 5,
  },

  accent: '#E8915A',
  accentLight: '#FFF3EB',
  accentMedium: '#F5D0B5',
  accentHover: '#D4803E',

  textPrimary: '#3D2F2F',
  textSecondary: '#9A8580',
  textTertiary: '#C8B8B0',

  border: '#EDE5DC',
  borderStrong: '#DDD2C6',

  shadow: '0 2px 8px rgba(61,47,47,0.06)',

  iconColors: {
    photos:    { bg: '#FFF3EB', color: '#E8915A' },
    calendar:  { bg: '#F3EBFF', color: '#9A7AE8' },
    music:     { bg: '#EBFFF3', color: '#5AAE80' },
    notes:     { bg: '#FFFCEB', color: '#C8A830' },
    social:    { bg: '#FFEBF3', color: '#E87AAD' },
    map:       { bg: '#EBF3FF', color: '#7AADE8' },
    wishlist:  { bg: '#FFF0EB', color: '#E8915A' },
    expenses:  { bg: '#F0FFEB', color: '#6AB87A' },
    messages:  { bg: '#FFEBEB', color: '#E87A7A' },
    guestbook: { bg: '#FFE8E8', color: '#E85A6A' },
    settings:  { bg: '#F2F0ED', color: '#9A8580' },
    appstore:  { bg: '#EBF0FF', color: '#7A8AE8' },
    search:    { bg: '#F5EDE4', color: '#9A8580' },
  },

  statusBar: { logo: '♡', wifi: '✿', battery: 'pill' },

  widget: {
    bg: '#FFFDF9',
    border: '1.5px solid #EDE5DC',
    decoration: 'tape',
    decorationColor: '#F5D0B5',
  },

  dock: {
    bg: 'rgba(255,253,249,0.8)',
    border: '1px solid rgba(237,229,220,0.5)',
  },

  guestbook: {
    visitorBubble: '#FFF3EB',
    ownerBubble: '#FFFDF9',
    ownerBorder: '#EDE5DC',
  },

  badge: { bg: '#E8915A', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(255,253,249,0.85)',
    border: '#EDE5DC',
    divider: '#F5EDE4',
  },
};

// ── 산리오 드림 (Sanrio Dream) ──
const sanrioTheme: DingleTheme = {
  id: 'sanrio',
  name: '산리오 드림',
  emoji: '🎀',
  preview: 'linear-gradient(135deg, #FFD6E8, #F8C8DC)',

  bgBase: '#FFF0F5',
  bgElevated: '#FFFAFC',
  bgSunken: '#FFE4EE',
  wallpaper: 'linear-gradient(180deg, #FFF0F5 0%, #FFD6E8 40%, #F8C8DC 100%)',
  lockWallpaper: 'linear-gradient(180deg, #FFF0F5 0%, #FFDAE8 50%, #FFD0E0 100%)',

  bgDecoration: {
    type: 'hearts',
    emoji: '♡',
    opacity: 0.06,
    count: 8,
  },

  accent: '#FF6B95',
  accentLight: '#FFF0F5',
  accentMedium: '#FFB8CF',
  accentHover: '#E8507A',

  textPrimary: '#4A2040',
  textSecondary: '#B07090',
  textTertiary: '#D4A0B8',

  border: '#FFD6E8',
  borderStrong: '#FFC0D8',

  shadow: '0 2px 8px rgba(255,107,149,0.08)',

  iconColors: {
    photos:    { bg: '#FFE0EC', color: '#FF6B95' },
    calendar:  { bg: '#F0E0FF', color: '#C07AE8' },
    music:     { bg: '#FFE0F5', color: '#E87AB8' },
    notes:     { bg: '#FFF0E0', color: '#E8A07A' },
    social:    { bg: '#FFE8F5', color: '#E87AA0' },
    map:       { bg: '#E8E0FF', color: '#A07AE8' },
    wishlist:  { bg: '#FFE0E8', color: '#E87A8A' },
    expenses:  { bg: '#FFE8E0', color: '#E8907A' },
    messages:  { bg: '#FFD8EC', color: '#E86B95' },
    guestbook: { bg: '#FFD0E0', color: '#E85A7A' },
    settings:  { bg: '#FFE8EE', color: '#C08090' },
    appstore:  { bg: '#F0E8FF', color: '#9080C0' },
    search:    { bg: '#FFE4EE', color: '#C08090' },
  },

  statusBar: { logo: '🎀', wifi: '♡', battery: 'heart' },

  widget: {
    bg: '#FFFAFC',
    border: '1.5px solid #FFD6E8',
    decoration: 'ribbon',
    decorationColor: '#FFB8CF',
  },

  dock: {
    bg: 'rgba(255,240,245,0.8)',
    border: '1px solid rgba(255,214,232,0.5)',
  },

  guestbook: {
    visitorBubble: '#FFE0EC',
    ownerBubble: '#FFFAFC',
    ownerBorder: '#FFD6E8',
  },

  badge: { bg: '#FF6B95', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(255,250,252,0.85)',
    border: '#FFD6E8',
    divider: '#FFE4EE',
  },
};

// ── 원피스 어드벤처 (One Piece Adventure) ──
const onepieceTheme: DingleTheme = {
  id: 'onepiece',
  name: '원피스 어드벤처',
  emoji: '🏴‍☠️',
  preview: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',

  bgBase: '#FEF9F0',
  bgElevated: '#FFFDF5',
  bgSunken: '#F5ECDC',
  wallpaper: 'linear-gradient(180deg, #FEF9F0 0%, #FFF3E0 40%, #FFE8C8 100%)',
  lockWallpaper: 'linear-gradient(180deg, #FEF9F0 0%, #FFECD2 50%, #FFE0B8 100%)',

  bgDecoration: {
    type: 'stars',
    emoji: '✦',
    opacity: 0.05,
    count: 6,
  },

  accent: '#D35400',
  accentLight: '#FFF3E0',
  accentMedium: '#FFDAB3',
  accentHover: '#B84700',

  textPrimary: '#3E2723',
  textSecondary: '#8D6E63',
  textTertiary: '#BCAAA4',

  border: '#F0E0C8',
  borderStrong: '#E0CDB0',

  shadow: '0 2px 8px rgba(211,84,0,0.06)',

  iconColors: {
    photos:    { bg: '#FFF3E0', color: '#D35400' },
    calendar:  { bg: '#FBE9E7', color: '#BF360C' },
    music:     { bg: '#FFF8E1', color: '#F57F17' },
    notes:     { bg: '#EFEBE9', color: '#795548' },
    social:    { bg: '#E3F2FD', color: '#1565C0' },
    map:       { bg: '#E8F5E9', color: '#2E7D32' },
    wishlist:  { bg: '#FFF3E0', color: '#E65100' },
    expenses:  { bg: '#FFFDE7', color: '#F9A825' },
    messages:  { bg: '#FCE4EC', color: '#C62828' },
    guestbook: { bg: '#FBE9E7', color: '#D84315' },
    settings:  { bg: '#F5F0E8', color: '#8D6E63' },
    appstore:  { bg: '#E8EAF6', color: '#283593' },
    search:    { bg: '#F5ECDC', color: '#8D6E63' },
  },

  statusBar: { logo: '☠️', wifi: '⚓', battery: 'pill' },

  widget: {
    bg: '#FFFDF5',
    border: '1.5px solid #F0E0C8',
    decoration: 'tape',
    decorationColor: '#FFDAB3',
  },

  dock: {
    bg: 'rgba(254,249,240,0.8)',
    border: '1px solid rgba(240,224,200,0.5)',
  },

  guestbook: {
    visitorBubble: '#FFF3E0',
    ownerBubble: '#FFFDF5',
    ownerBorder: '#F0E0C8',
  },

  badge: { bg: '#D35400', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(255,253,245,0.85)',
    border: '#F0E0C8',
    divider: '#F5ECDC',
  },
};

// ── 빈티지 모리걸 (Vintage Mori) ──
const moriTheme: DingleTheme = {
  id: 'mori',
  name: '빈티지 모리걸',
  emoji: '🌿',
  preview: 'linear-gradient(135deg, #F0EDE5, #E8E0D0)',

  bgBase: '#F5F2EC',
  bgElevated: '#FAFAF5',
  bgSunken: '#EAE5DA',
  wallpaper: 'linear-gradient(180deg, #F5F2EC 0%, #EDE8DC 40%, #E8E0D0 100%)',
  lockWallpaper: 'linear-gradient(180deg, #F5F2EC 0%, #ECE5D5 50%, #E5DCC8 100%)',

  bgDecoration: {
    type: 'leaves',
    emoji: '🍃',
    opacity: 0.04,
    count: 5,
  },

  accent: '#7A8B5C',
  accentLight: '#F0F5E8',
  accentMedium: '#C8D8A8',
  accentHover: '#5C6B3E',

  textPrimary: '#3A3530',
  textSecondary: '#8A8078',
  textTertiary: '#B8ADA5',

  border: '#E0D8C8',
  borderStrong: '#D0C4B0',

  shadow: '0 2px 8px rgba(58,53,48,0.05)',

  iconColors: {
    photos:    { bg: '#F0F5E8', color: '#7A8B5C' },
    calendar:  { bg: '#F5F0E8', color: '#8B7A5C' },
    music:     { bg: '#E8F0F0', color: '#5C7A7A' },
    notes:     { bg: '#F5F2E8', color: '#8B855C' },
    social:    { bg: '#F0E8E8', color: '#8B5C5C' },
    map:       { bg: '#E8F5E8', color: '#5C8B5C' },
    wishlist:  { bg: '#F5EDE8', color: '#8B6A5C' },
    expenses:  { bg: '#EDF5E8', color: '#6A8B5C' },
    messages:  { bg: '#F0EDE8', color: '#7A7A5C' },
    guestbook: { bg: '#F0E8EC', color: '#7A5C6A' },
    settings:  { bg: '#EDEBE8', color: '#8A8078' },
    appstore:  { bg: '#E8ECF0', color: '#5C6A7A' },
    search:    { bg: '#EAE5DA', color: '#8A8078' },
  },

  statusBar: { logo: '🌿', wifi: '❀', battery: 'pill' },

  widget: {
    bg: '#FAFAF5',
    border: '1.5px solid #E0D8C8',
    decoration: 'tape',
    decorationColor: '#C8D8A8',
  },

  dock: {
    bg: 'rgba(245,242,236,0.8)',
    border: '1px solid rgba(224,216,200,0.5)',
  },

  guestbook: {
    visitorBubble: '#F0F5E8',
    ownerBubble: '#FAFAF5',
    ownerBorder: '#E0D8C8',
  },

  badge: { bg: '#7A8B5C', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(250,250,245,0.85)',
    border: '#E0D8C8',
    divider: '#EAE5DA',
  },
};

// ── 모노크롬 (Monochrome) ──
const monoTheme: DingleTheme = {
  id: 'mono',
  name: '모노크롬',
  emoji: '🖤',
  preview: 'linear-gradient(135deg, #F5F5F5, #E8E8E8)',

  bgBase: '#F7F7F7',
  bgElevated: '#FDFDFD',
  bgSunken: '#EEEEEE',
  wallpaper: 'linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 40%, #E8E8E8 100%)',
  lockWallpaper: 'linear-gradient(180deg, #F7F7F7 0%, #EDEDED 50%, #E5E5E5 100%)',

  bgDecoration: {
    type: 'dots',
    emoji: '·',
    opacity: 0.06,
    count: 0, // 장식 없음 (미니멀)
  },

  accent: '#2C2C2C',
  accentLight: '#F0F0F0',
  accentMedium: '#D0D0D0',
  accentHover: '#1A1A1A',

  textPrimary: '#1A1A1A',
  textSecondary: '#757575',
  textTertiary: '#AAAAAA',

  border: '#E0E0E0',
  borderStrong: '#D0D0D0',

  shadow: '0 2px 8px rgba(0,0,0,0.04)',

  iconColors: {
    photos:    { bg: '#F0F0F0', color: '#2C2C2C' },
    calendar:  { bg: '#F0F0F0', color: '#2C2C2C' },
    music:     { bg: '#F0F0F0', color: '#2C2C2C' },
    notes:     { bg: '#F0F0F0', color: '#2C2C2C' },
    social:    { bg: '#F0F0F0', color: '#2C2C2C' },
    map:       { bg: '#F0F0F0', color: '#2C2C2C' },
    wishlist:  { bg: '#F0F0F0', color: '#2C2C2C' },
    expenses:  { bg: '#F0F0F0', color: '#2C2C2C' },
    messages:  { bg: '#F0F0F0', color: '#2C2C2C' },
    guestbook: { bg: '#F0F0F0', color: '#2C2C2C' },
    settings:  { bg: '#F0F0F0', color: '#2C2C2C' },
    appstore:  { bg: '#F0F0F0', color: '#2C2C2C' },
    search:    { bg: '#EEEEEE', color: '#2C2C2C' },
  },

  statusBar: { logo: '◆', wifi: '···', battery: 'pill' },

  widget: {
    bg: '#FDFDFD',
    border: '1px solid #E0E0E0',
    decoration: 'none',
    decorationColor: 'transparent',
  },

  dock: {
    bg: 'rgba(247,247,247,0.8)',
    border: '1px solid rgba(224,224,224,0.5)',
  },

  guestbook: {
    visitorBubble: '#F0F0F0',
    ownerBubble: '#FDFDFD',
    ownerBorder: '#E0E0E0',
  },

  badge: { bg: '#2C2C2C', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(253,253,253,0.9)',
    border: '#E0E0E0',
    divider: '#EEEEEE',
  },
};

// ── K-POP 아이돌 (K-pop Idol) ──
const kpopTheme: DingleTheme = {
  id: 'kpop',
  name: 'K-POP 아이돌',
  emoji: '💜',
  preview: 'linear-gradient(135deg, #F0E6FF, #E8D6FF)',

  bgBase: '#F8F2FF',
  bgElevated: '#FDFAFF',
  bgSunken: '#EFE4FF',
  wallpaper: 'linear-gradient(180deg, #F8F2FF 0%, #F0E6FF 40%, #E8D6FF 100%)',
  lockWallpaper: 'linear-gradient(180deg, #F8F2FF 0%, #EDE0FF 50%, #E5D2FF 100%)',

  bgDecoration: {
    type: 'sparkles',
    emoji: '✦',
    opacity: 0.06,
    count: 7,
  },

  accent: '#8B5CF6',
  accentLight: '#F3EEFF',
  accentMedium: '#C4B5FD',
  accentHover: '#7C3AED',

  textPrimary: '#2E1065',
  textSecondary: '#7C6A9A',
  textTertiary: '#B0A0C8',

  border: '#E8D6FF',
  borderStrong: '#D8C2F5',

  shadow: '0 2px 8px rgba(139,92,246,0.06)',

  iconColors: {
    photos:    { bg: '#F3EEFF', color: '#8B5CF6' },
    calendar:  { bg: '#FFEEF8', color: '#D946EF' },
    music:     { bg: '#F0EEFF', color: '#7C3AED' },
    notes:     { bg: '#FFF0F8', color: '#DB2777' },
    social:    { bg: '#EEF0FF', color: '#6366F1' },
    map:       { bg: '#F0F0FF', color: '#818CF8' },
    wishlist:  { bg: '#FFF0EE', color: '#E87A7A' },
    expenses:  { bg: '#F8F0FF', color: '#A855F7' },
    messages:  { bg: '#FFE8F8', color: '#EC4899' },
    guestbook: { bg: '#FFE0F0', color: '#E8457A' },
    settings:  { bg: '#F0ECF8', color: '#7C6A9A' },
    appstore:  { bg: '#E8EEFF', color: '#6366F1' },
    search:    { bg: '#EFE4FF', color: '#7C6A9A' },
  },

  statusBar: { logo: '💜', wifi: '✦', battery: 'heart' },

  widget: {
    bg: '#FDFAFF',
    border: '1.5px solid #E8D6FF',
    decoration: 'sparkle',
    decorationColor: '#C4B5FD',
  },

  dock: {
    bg: 'rgba(248,242,255,0.8)',
    border: '1px solid rgba(232,214,255,0.5)',
  },

  guestbook: {
    visitorBubble: '#F3EEFF',
    ownerBubble: '#FDFAFF',
    ownerBorder: '#E8D6FF',
  },

  badge: { bg: '#8B5CF6', text: '#FFFFFF' },

  notification: {
    bg: 'rgba(253,250,255,0.85)',
    border: '#E8D6FF',
    divider: '#EFE4FF',
  },
};

// ── 전체 테마 맵 ──
export const themes: Record<string, DingleTheme> = {
  default: defaultTheme,
  sanrio: sanrioTheme,
  onepiece: onepieceTheme,
  mori: moriTheme,
  mono: monoTheme,
  kpop: kpopTheme,
};

export const themeList: DingleTheme[] = Object.values(themes);
