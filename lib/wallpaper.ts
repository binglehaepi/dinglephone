// ── 배경화면 프리셋 ──

export interface WallpaperPreset {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

export const homeWallpapers: WallpaperPreset[] = [
  { id: 'cream', name: '크림', emoji: '🍦', gradient: 'linear-gradient(180deg, #FAF6F1 0%, #F5EDE4 100%)' },
  { id: 'sunset', name: '선셋', emoji: '🌅', gradient: 'linear-gradient(180deg, #FFF3EB 0%, #FFE0CC 100%)' },
  { id: 'lavender', name: '라벤더', emoji: '💜', gradient: 'linear-gradient(180deg, #F3EBFF 0%, #E8DEFF 100%)' },
  { id: 'mint', name: '민트', emoji: '🍃', gradient: 'linear-gradient(180deg, #EBFFF3 0%, #D6F5E4 100%)' },
  { id: 'sky', name: '스카이', emoji: '☁️', gradient: 'linear-gradient(180deg, #EBF3FF 0%, #D6E8FF 100%)' },
  { id: 'rose', name: '로즈', emoji: '🌹', gradient: 'linear-gradient(180deg, #FFEBF3 0%, #FFD6E8 100%)' },
];

export const lockWallpapers: WallpaperPreset[] = [
  { id: 'cream', name: '크림', emoji: '🍦', gradient: 'linear-gradient(180deg, #FAF6F1 0%, #FFF3EB 50%, #FAF6F1 100%)' },
  { id: 'sunset', name: '선셋', emoji: '🌅', gradient: 'linear-gradient(180deg, #FFF3EB 0%, #FFD6B5 50%, #FFF3EB 100%)' },
  { id: 'lavender', name: '라벤더', emoji: '💜', gradient: 'linear-gradient(180deg, #F3EBFF 0%, #D6C8F0 50%, #F3EBFF 100%)' },
  { id: 'mint', name: '민트', emoji: '🍃', gradient: 'linear-gradient(180deg, #EBFFF3 0%, #B8F0D8 50%, #EBFFF3 100%)' },
  { id: 'sky', name: '스카이', emoji: '☁️', gradient: 'linear-gradient(180deg, #EBF3FF 0%, #B8D8F8 50%, #EBF3FF 100%)' },
  { id: 'rose', name: '로즈', emoji: '🌹', gradient: 'linear-gradient(180deg, #FFEBF3 0%, #FFD6DE 50%, #FFEBF3 100%)' },
];

// ── localStorage 키 (폰별 분리) ──
function keyHome(phoneId: string) { return `dingle-wallpaper-home-${phoneId}`; }
function keyLock(phoneId: string) { return `dingle-wallpaper-lock-${phoneId}`; }
function keyHomeImage(phoneId: string) { return `dingle-wallpaper-home-image-${phoneId}`; }
function keyLockImage(phoneId: string) { return `dingle-wallpaper-lock-image-${phoneId}`; }

// 커스텀 이미지 사용 시 id를 'custom'으로 저장
export const CUSTOM_ID = 'custom';

// ── 이미지 압축/리사이즈 ──
const MAX_WIDTH = 600;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 0.7;

export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // 비율 유지하며 리사이즈
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context 생성 실패'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('이미지 로드 실패'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
}

// ── 커스텀 이미지 저장/불러오기 ──
export function saveCustomHomeImage(phoneId: string, dataUrl: string): void {
  localStorage.setItem(keyHome(phoneId), CUSTOM_ID);
  localStorage.setItem(keyHomeImage(phoneId), dataUrl);
}

export function saveCustomLockImage(phoneId: string, dataUrl: string): void {
  localStorage.setItem(keyLock(phoneId), CUSTOM_ID);
  localStorage.setItem(keyLockImage(phoneId), dataUrl);
}

export function getCustomHomeImage(phoneId: string): string | null {
  return localStorage.getItem(keyHomeImage(phoneId));
}

export function getCustomLockImage(phoneId: string): string | null {
  return localStorage.getItem(keyLockImage(phoneId));
}

function clearCustomHomeImage(phoneId: string): void {
  localStorage.removeItem(keyHomeImage(phoneId));
}

function clearCustomLockImage(phoneId: string): void {
  localStorage.removeItem(keyLockImage(phoneId));
}

// ── 배경화면 정보 타입 ──
export interface WallpaperValue {
  type: 'gradient' | 'image';
  value: string; // CSS gradient 또는 data URL
}

// ── 프리셋 ID로 저장 (커스텀 이미지 초기화) ──
export function saveHomeWallpaper(phoneId: string, id: string): void {
  localStorage.setItem(keyHome(phoneId), id);
  if (id !== CUSTOM_ID) clearCustomHomeImage(phoneId);
}

export function saveLockWallpaper(phoneId: string, id: string): void {
  localStorage.setItem(keyLock(phoneId), id);
  if (id !== CUSTOM_ID) clearCustomLockImage(phoneId);
}

// ── 저장된 값 불러오기 ──
export function getSavedHomeId(phoneId: string): string {
  return localStorage.getItem(keyHome(phoneId)) ?? 'cream';
}

export function getSavedLockId(phoneId: string): string {
  return localStorage.getItem(keyLock(phoneId)) ?? 'cream';
}

export function getSavedHomeWallpaper(phoneId: string): WallpaperValue {
  const savedId = getSavedHomeId(phoneId);
  if (savedId === CUSTOM_ID) {
    const img = getCustomHomeImage(phoneId);
    if (img) return { type: 'image', value: img };
  }
  const found = homeWallpapers.find((w) => w.id === savedId);
  return { type: 'gradient', value: found ? found.gradient : homeWallpapers[0].gradient };
}

export function getSavedLockWallpaper(phoneId: string): WallpaperValue {
  const savedId = getSavedLockId(phoneId);
  if (savedId === CUSTOM_ID) {
    const img = getCustomLockImage(phoneId);
    if (img) return { type: 'image', value: img };
  }
  const found = lockWallpapers.find((w) => w.id === savedId);
  return { type: 'gradient', value: found ? found.gradient : lockWallpapers[0].gradient };
}
