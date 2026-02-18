export interface PhoneTheme {
  preset: "peach";
  wallpaperStyle: "gradient";
  wallpaper: string;
  lockWallpaper: string;
}

export interface PhotoItem {
  id: string;
  imageUrl?: string;
  emoji: string;
  caption: string;
  memo: string;
  date: string;
  location: string;
  tags: string[];
  color: string;
  sourceUrl?: string;
}

export interface SocialFeedItem {
  id: string;
  platform: "twitter" | "pinterest" | "youtube" | "instagram";
  thumbnailUrl: string;
  text: string;
  likes: string;
  timeAgo: string;
  sourceUrl: string;
}

export interface MapPlace {
  id: string;
  name: string;
  emoji: string;
  rating: number;
  visits: number;
  comment: string;
  color: string;
  location: string;
}

export interface MusicSong {
  title: string;
  artist: string;
  albumEmoji: string;
  albumColor: string;
  duration: string;
  sourceUrl?: string;
  youtubeId?: string;
}

export interface CalendarEvent {
  date: string;
  title: string;
  icon: string;
  color: string;
}

export interface NoteItem {
  title: string;
  content: string;
  updatedAt: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  comment: string;
  emoji: string;
}

export interface ExpenseCategory {
  name: string;
  emoji: string;
  percentage: number;
  color: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  emoji: string;
  memo: string;
  status: "wish" | "bought" | "gifted";
  sourceUrl?: string;
}

export interface MessageItem {
  from: string;
  time: string;
  preview: string;
  unread: boolean;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  timeAgo: string;
  isOwner: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

export interface WidgetData {
  type: "info";
  lines: string[];
  tapTarget?: string;
}

export type IconShape = 'square' | 'circle' | 'heart' | 'droplet' | 'diamond' | 'butterfly';

export type WidgetFrameType =
  | 'tamagotchi'   // 🥚 다마고치
  | 'retrophone'   // 📱 레트로폰
  | 'retrotv'      // 📺 레트로TV
  | 'browser'      // 🖥️ 브라우저창
  | 'nintendods';  // 🎮 닌텐도DS

export interface AppIconData {
  id: string;
  icon: string;
  name: string;
  badge?: number;
  iconBg: string;
  customIconUrl?: string;
  iconShape?: IconShape;
}

// 홈 화면 아이템 = 아이콘 또는 위젯 또는 빈 공간 또는 폴더
export interface HomeItem extends AppIconData {
  type?: 'icon' | 'widget' | 'spacer' | 'folder';  // 기본값 'icon', 'spacer'=빈 그리드 셀, 'folder'=앱 그룹
  appId?: string;                   // 위젯이 연결된 앱 (type='widget'일 때)
  widgetFrame?: WidgetFrameType;
  widgetColor?: string;
  widgetLabel?: string;
  widgetSpan?: { cols: number; rows: number };
  widgetShowIcon?: boolean;  // true면 위젯 내부에 앱 아이콘 표시, false면 콘텐츠 미리보기
  folderChildren?: HomeItem[];  // type='folder'일 때 포함된 앱들
  folderName?: string;          // 폴더 이름
}

export interface MapWishItem {
  id: string;
  name: string;
  emoji: string;
  location: string;
  comment: string;
}

export interface SearchLink {
  title: string;
  url: string;
  emoji: string;
}

export interface FrequentSite {
  name: string;
  icon: string;
  url: string;
}

export interface DinglePhoneData {
  owner: {
    name: string;
    bio: string;
    emoji: string;
    profileColor: string;
  };
  device: "dingle-phone";
  theme: PhoneTheme;
  apps: {
    photos: {
      albumName: string;
      albumDescription: string;
      items: PhotoItem[];
    };
    social: {
      feeds: SocialFeedItem[];
    };
    map: {
      title: string;
      places: MapPlace[];
      wishlist: MapPlace[];
    };
    music: {
      playlistName: string;
      songs: MusicSong[];
    };
    calendar: {
      events: CalendarEvent[];
    };
    notes: NoteItem[];
    expenses: {
      monthTotal: number;
      monthName: string;
      categories: ExpenseCategory[];
      items: ExpenseItem[];
      monthlyQuote: string;
    };
    wishlistShop: {
      items: WishlistItem[];
    };
    messages: MessageItem[];
    guestbook: {
      entries: GuestbookEntry[];
    };
    appStore: {
      appName: string;
      rating: number;
      reviews: ReviewItem[];
    };
  };
  homeScreen: {
    widgets: WidgetData[];
    appLayout: HomeItem[];
    dock: AppIconData[];
    iconShape?: IconShape;
  };
}

// ── 멀티폰 시스템 타입 ──

export interface PhoneData {
  id: string;
  isDefault: boolean;
  createdAt: string;

  owner: {
    name: string;
    bio: string;
    emoji: string;
  };

  theme: string; // 테마 ID ('default', 'sanrio', 'onepiece', ...)

  apps: {
    photos: {
      albumName: string;
      albumDescription: string;
      items: PhotoItem[];
    };
    social: {
      feeds: SocialFeedItem[];
    };
    map: {
      title: string;
      visited: MapPlace[];
      wishlist: MapWishItem[];
    };
    music: {
      playlistName: string;
      songs: MusicSong[];
    };
    calendar: {
      events: CalendarEvent[];
    };
    notes: NoteItem[];
    expenses: {
      monthTotal: number;
      monthName: string;
      categories: ExpenseCategory[];
      items: ExpenseItem[];
      monthlyQuote: string;
    };
    wishlistShop: {
      items: WishlistItem[];
    };
    messages: MessageItem[];
    guestbook: {
      initialEntries: GuestbookEntry[];
    };
    search: {
      recentLinks: SearchLink[];
      frequentSites: FrequentSite[];
    };
    appStore: {
      appName: string;
      rating: number;
      reviews: ReviewItem[];
    };
  };

  homeScreen: {
    widgets: WidgetData[];
    appLayout: HomeItem[];
    dock: AppIconData[];
    iconShape?: IconShape;
  };
}