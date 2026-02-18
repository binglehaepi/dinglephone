import { PhoneData } from '../types';

const STORAGE_KEY = 'dingle-phones';
const LAST_PHONE_KEY = 'dingle-last-phone';

// 마지막으로 열었던 폰 ID 가져오기
export function getLastPhoneId(): string | null {
  try {
    return localStorage.getItem(LAST_PHONE_KEY);
  } catch {
    return null;
  }
}

// 마지막으로 열었던 폰 ID 저장
export function setLastPhoneId(id: string): void {
  try {
    localStorage.setItem(LAST_PHONE_KEY, id);
  } catch {
    /* ignore */
  }
}

// 모든 유저 폰 가져오기
export function getUserPhones(): PhoneData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// 폰 저장 (생성 또는 업데이트)
export function savePhone(phone: PhoneData): void {
  try {
    const phones = getUserPhones();
    const idx = phones.findIndex((p) => p.id === phone.id);
    if (idx >= 0) {
      phones[idx] = phone;
    } else {
      phones.push(phone);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phones));
  } catch {
    /* ignore storage errors */
  }
}

// 폰 삭제
export function deletePhone(id: string): void {
  try {
    const phones = getUserPhones().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phones));
  } catch {
    /* ignore */
  }
}

// crypto.randomUUID() 폴백 (비보안 컨텍스트 대응)
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // crypto.getRandomValues()는 비보안 컨텍스트(HTTP)에서도 사용 가능
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

// 빈 폰 생성 (템플릿)
export function createEmptyPhone(name: string, themeId: string): PhoneData {
  return {
    id: generateUUID(),
    isDefault: false,
    createdAt: new Date().toISOString(),

    owner: {
      name: name,
      bio: '나의 덕질 폰',
      emoji: '✨',
    },

    theme: themeId,

    apps: {
      photos: { albumName: '내 앨범', albumDescription: '', items: [] },
      social: { feeds: [] },
      map: { title: '나의 지도', visited: [], wishlist: [] },
      music: { playlistName: '내 플레이리스트', songs: [] },
      calendar: { events: [] },
      notes: [],
      expenses: {
        monthTotal: 0,
        monthName: '2월',
        categories: [],
        items: [],
        monthlyQuote: '',
      },
      wishlistShop: { items: [] },
      messages: [],
      guestbook: { initialEntries: [] },
      search: { recentLinks: [], frequentSites: [] },
      appStore: {
        appName: 'Dingle Phone',
        rating: 5,
        reviews: [],
      },
    },

    homeScreen: {
      widgets: [
        { type: 'info', lines: [`${name}의 폰`, '꾸미기를 시작해보세요!'] },
      ],
      appLayout: [
        { id: 'photos', icon: '📸', name: '사진첩', iconBg: '#FFF3EB' },
        { id: 'calendar', icon: '📅', name: '캘린더', iconBg: '#F3EBFF' },
        { id: 'music', icon: '🎵', name: '음악', iconBg: '#EBFFF3' },
        { id: 'notes', icon: '📝', name: '메모', iconBg: '#FFFCEB' },
        { id: 'social', icon: '🌐', name: 'SNS', iconBg: '#FFEBF3' },
        { id: 'map', icon: '📍', name: '지도', iconBg: '#EBF3FF' },
        { id: 'wishlist', icon: '🛍️', name: '위시', iconBg: '#FFF0EB' },
        { id: 'expenses', icon: '💰', name: '가계부', iconBg: '#F0FFEB' },
        { id: 'messages', icon: '💬', name: '메시지', iconBg: '#FFEBEB' },
        { id: 'guestbook', icon: '💌', name: '방명록', iconBg: '#FFE8E8' },
        { id: 'settings', icon: '⚙️', name: '설정', iconBg: '#F2F0ED' },
        { id: 'appstore', icon: '🏪', name: '스토어', iconBg: '#EBF0FF' },
      ],
      dock: [
        { id: 'photos', icon: '📸', name: '사진첩', iconBg: '#FFF3EB' },
        { id: 'music', icon: '🎵', name: '음악', iconBg: '#EBFFF3' },
        { id: 'guestbook', icon: '💌', name: '방명록', iconBg: '#FFE8E8' },
        { id: 'settings', icon: '⚙️', name: '설정', iconBg: '#F2F0ED' },
      ],
    },
  };
}
