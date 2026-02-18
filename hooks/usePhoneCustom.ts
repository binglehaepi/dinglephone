import { useState, useEffect } from 'react';

export interface PhoneCustom {
  wallpaper: string;
  themeColor: string;
  ownerName: string;
}

const STORAGE_KEY = 'dingle-phone-custom';

const DEFAULTS: PhoneCustom = {
  wallpaper: 'linear-gradient(180deg, #FAF6F1 0%, #FFF3EB 50%, #FAF6F1 100%)',
  themeColor: '#E8915A',
  ownerName: '달콤한하루',
};

export function usePhoneCustom() {
  const [custom, setCustom] = useState<PhoneCustom>(DEFAULTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustom({ ...DEFAULTS, ...JSON.parse(saved) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // 테마 컬러 CSS 변수 동적 교체
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', custom.themeColor);
    // accent-light, accent-medium approximations
    document.documentElement.style.setProperty('--accent-light', custom.themeColor + '18');
    document.documentElement.style.setProperty('--accent-medium', custom.themeColor + '40');
  }, [custom.themeColor]);

  const updateCustom = (updates: Partial<PhoneCustom>) => {
    const next = { ...custom, ...updates };
    setCustom(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return { custom, updateCustom };
}

// 배경화면 프리셋
export const wallpaperPresets = [
  { name: '크림',    value: 'linear-gradient(180deg, #FAF6F1 0%, #F5EDE4 100%)' },
  { name: '선셋',    value: 'linear-gradient(180deg, #FFF3EB 0%, #FFE0CC 100%)' },
  { name: '라벤더',  value: 'linear-gradient(180deg, #F3EBFF 0%, #E8DEFF 100%)' },
  { name: '민트',    value: 'linear-gradient(180deg, #EBFFF3 0%, #D6F5E4 100%)' },
  { name: '스카이',  value: 'linear-gradient(180deg, #EBF3FF 0%, #D6E8FF 100%)' },
  { name: '로즈',    value: 'linear-gradient(180deg, #FFEBF3 0%, #FFD6E8 100%)' },
];

// 테마 컬러 프리셋
export const themePresets = [
  { name: '딩글 오렌지', value: '#E8915A' },
  { name: '로즈',       value: '#E88A9A' },
  { name: '라벤더',     value: '#9A8AE8' },
  { name: '민트',       value: '#6AC5A0' },
  { name: '스카이',     value: '#7AADE8' },
];
