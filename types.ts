export interface PhoneTheme {
  preset: "peach";
  wallpaperStyle: "gradient";
  wallpaper: string;
  lockWallpaper: string;
}

export interface PhotoItem {
  id: string;
  imageUrl: string;
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

export interface AppIconData {
  id: string;
  icon: string;
  name: string;
  badge?: number;
  iconBg: string;
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
    appLayout: AppIconData[];
    dock: AppIconData[];
  };
}