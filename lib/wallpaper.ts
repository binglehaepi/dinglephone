// ── 배경화면 프리셋 ──

export interface WallpaperPreset {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

export const homeWallpapers: WallpaperPreset[] = [
  { id: 'peach', name: '피치', emoji: '🍑', gradient: 'linear-gradient(180deg, #FFFCFA 0%, #FFF0E6 40%, #FFF5EE 100%)' },
  { id: 'rose', name: '로제', emoji: '🌹', gradient: 'linear-gradient(180deg, #FFF5F5 0%, #FFE4E8 40%, #FFF0F3 100%)' },
  { id: 'lavender', name: '라벤더', emoji: '💜', gradient: 'linear-gradient(180deg, #FAF5FF 0%, #E8DFF5 40%, #F3EEFF 100%)' },
  { id: 'mint', name: '민트', emoji: '🍃', gradient: 'linear-gradient(180deg, #F5FFFA 0%, #D6F5E8 40%, #EEFFF5 100%)' },
  { id: 'sky', name: '스카이', emoji: '☁️', gradient: 'linear-gradient(180deg, #F5FAFF 0%, #D6E8FF 40%, #EEF5FF 100%)' },
  { id: 'sunset', name: '선셋', emoji: '🌅', gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFD6B5 30%, #FFB5C5 70%, #E8D0F0 100%)' },
  { id: 'vanilla', name: '바닐라', emoji: '🍦', gradient: 'linear-gradient(180deg, #FFFEFA 0%, #FFF8E0 40%, #FFFDF5 100%)' },
  { id: 'night', name: '나이트', emoji: '🌙', gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)' },
];

export const lockWallpapers: WallpaperPreset[] = [
  { id: 'peach', name: '피치', emoji: '🍑', gradient: 'linear-gradient(180deg, #FFFCFA 0%, #FFECD2 50%, #FFF5EE 100%)' },
  { id: 'rose', name: '로제', emoji: '🌹', gradient: 'linear-gradient(180deg, #FFF5F5 0%, #FFD6DE 50%, #FFF0F3 100%)' },
  { id: 'lavender', name: '라벤더', emoji: '💜', gradient: 'linear-gradient(180deg, #FAF5FF 0%, #D6C8F0 50%, #F3EEFF 100%)' },
  { id: 'mint', name: '민트', emoji: '🍃', gradient: 'linear-gradient(180deg, #F5FFFA 0%, #B8F0D8 50%, #EEFFF5 100%)' },
  { id: 'sky', name: '스카이', emoji: '☁️', gradient: 'linear-gradient(180deg, #F5FAFF 0%, #B8D8F8 50%, #EEF5FF 100%)' },
  { id: 'sunset', name: '선셋', emoji: '🌅', gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFC8A0 30%, #FFA0B8 70%, #D8B8F0 100%)' },
  { id: 'vanilla', name: '바닐라', emoji: '🍦', gradient: 'linear-gradient(180deg, #FFFEFA 0%, #FFF0C0 50%, #FFFDF5 100%)' },
  { id: 'night', name: '나이트', emoji: '🌙', gradient: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 50%, #0a2540 100%)' },
];

// ── localStorage 키 ──
const STORAGE_KEY_HOME = 'dingle-wallpaper-home';
const STORAGE_KEY_LOCK = 'dingle-wallpaper-lock';

export function getSavedHomeWallpaper(): string {
  const savedId = localStorage.getItem(STORAGE_KEY_HOME);
  const found = homeWallpapers.find((w) => w.id === savedId);
  return found ? found.gradient : homeWallpapers[0].gradient;
}

export function getSavedLockWallpaper(): string {
  const savedId = localStorage.getItem(STORAGE_KEY_LOCK);
  const found = lockWallpapers.find((w) => w.id === savedId);
  return found ? found.gradient : lockWallpapers[0].gradient;
}

export function getSavedHomeId(): string {
  return localStorage.getItem(STORAGE_KEY_HOME) ?? 'peach';
}

export function getSavedLockId(): string {
  return localStorage.getItem(STORAGE_KEY_LOCK) ?? 'peach';
}

export function saveHomeWallpaper(id: string): void {
  localStorage.setItem(STORAGE_KEY_HOME, id);
}

export function saveLockWallpaper(id: string): void {
  localStorage.setItem(STORAGE_KEY_LOCK, id);
}
