import { DinglePhoneData } from '../types';

// Helper to get Unsplash Image
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`;

export const demoPhoneData: DinglePhoneData = {
  owner: {
    name: "달콤한하루",
    bio: "디저트는 인생이다 🍰",
    emoji: "🧁",
    profileColor: "#FDDCB5",
  },

  device: "dingle-phone",

  theme: {
    preset: "peach",
    wallpaperStyle: "gradient",
    wallpaper: "linear-gradient(180deg, #FFFCFA 0%, #FFF0E6 40%, #FFF5EE 100%)",
    lockWallpaper: "linear-gradient(180deg, #FFFCFA 0%, #FFECD2 50%, #FFF5EE 100%)",
  },

  apps: {
    photos: {
      albumName: "나의 디저트 모음",
      albumDescription: "달콤한 순간들",
      items: [
        {
          id: "1", emoji: "🍓", color: "#FFD6D6",
          imageUrl: unsplash("1565958011703-44f9829ba187"),
          caption: "두쫀쿠 딸기 시리즈 🍓",
          memo: "솔직히 이건 인생 디저트. 딸기가 진짜 싱싱하고 크림이 너무 부드러워 ㅠㅠ",
          date: "2026.02.15", location: "성수동",
          tags: ["두쫀쿠", "딸기"],
        },
        {
          id: "2", emoji: "🍰", color: "#FFE8D6",
          imageUrl: unsplash("1571115177098-e4aa301f5b65"),
          caption: "러스크 하우스 티라미수",
          memo: "을지로 골목에 숨어있는 보석. 티라미수가 이탈리아에서 먹은 것보다 맛있었음",
          date: "2026.02.13", location: "을지로",
          tags: ["티라미수", "을지로카페"],
        },
        {
          id: "3", emoji: "🍩", color: "#E8D6FF",
          imageUrl: unsplash("1551024601-5629f977c812"),
          caption: "노티드 도넛 신메뉴",
          memo: "우유 크림 도넛 미쳤다 진짜... 3개 먹음",
          date: "2026.02.11", location: "압구정",
          tags: ["노티드", "도넛"],
        },
        {
          id: "4", emoji: "☕", color: "#D6E8FF",
          imageUrl: unsplash("1461023058943-7167c54148eb"),
          caption: "카페 온도 라떼아트",
          memo: "여기 바리스타님 라떼아트 진짜 예술... 백조 그려주심",
          date: "2026.02.08", location: "합정",
          tags: ["카페온도", "라떼아트"],
        },
        {
          id: "5", emoji: "🍪", color: "#FFF3D6",
          imageUrl: unsplash("1499636136210-6f4ee46e1176"),
          caption: "르뱅쿠키 홈베이킹",
          memo: "레시피대로 했는데 쫀득함이 부족해. 다음엔 설탕을 좀 더 넣어봐야지",
          date: "2026.02.06", location: "집",
          tags: ["홈베이킹", "쿠키"],
        },
        {
          id: "6", emoji: "🫐", color: "#D6D6FF",
          imageUrl: unsplash("1567327613485-fbc7bf196198"),
          caption: "블루베리 치즈케이크",
          memo: "이 집 치즈케이크는 진짜 뉴욕 스타일. 묵직하고 진한 맛",
          date: "2026.01.22", location: "한남동",
          tags: ["치즈케이크", "블루베리"],
        },
        {
          id: "7", emoji: "🥐", color: "#FFF0D6",
          imageUrl: unsplash("1555507036-ab1f4038808a"),
          caption: "크로와상 맛집 발견",
          memo: "겹겹이 바삭한 크로와상. 안에 커스터드 크림이 숨어있음. 대박",
          date: "2026.01.15", location: "연남동",
          tags: ["크로와상", "빵집"],
        },
        {
          id: "8", emoji: "🥞", color: "#FFE8D6",
          imageUrl: unsplash("1565299624946-b28f40a0ae38"),
          caption: "주말 브런치 팬케이크",
          memo: "퐁신퐁신한 수플레 팬케이크. 웨이팅 1시간 했지만 용서되는 맛",
          date: "2026.01.10", location: "송파",
          tags: ["브런치", "팬케이크"],
        },
        {
          id: "9", emoji: "🍡", color: "#FFD6E8",
          imageUrl: unsplash("1576618148400-f54bed99fcf8"),
          caption: "화과자 선물세트",
          memo: "너무 예뻐서 먹기 아까웠음. 앙금이 많이 달지 않아서 좋았다.",
          date: "2026.01.01", location: "집",
          tags: ["화과자", "선물"],
        }
      ],
    },

    social: {
      feeds: [
        {
          id: "s1", platform: "instagram",
          thumbnailUrl: unsplash("1565958011703-44f9829ba187"),
          text: "오늘의 디저트: 딸기 케이크 🍰 #먹스타그램",
          likes: "456", timeAgo: "2시간 전", sourceUrl: "#"
        },
        {
          id: "s2", platform: "twitter",
          thumbnailUrl: unsplash("1551024601-5629f977c812"),
          text: "아니 노티드 도넛 신메뉴 미친거 아님? 우유크림 폼 미쳤다;",
          likes: "1.2K", timeAgo: "5시간 전", sourceUrl: "#"
        },
        {
          id: "s3", platform: "youtube",
          thumbnailUrl: unsplash("1556910103-1c02745a30bf"),
          text: "[VLOG] 서울 디저트 카페 투어 1편 (성수/연남)",
          likes: "3.4K", timeAgo: "1일 전", sourceUrl: "#"
        },
        {
          id: "s4", platform: "pinterest",
          thumbnailUrl: unsplash("1509042239860-f550ce710b93"),
          text: "Home Cafe Interior Inspiration",
          likes: "89", timeAgo: "2일 전", sourceUrl: "#"
        }
      ]
    },

    map: {
      title: "나의 디저트 지도",
      places: [
        { id: "1", name: "두쫀쿠 성수", emoji: "🧁", rating: 4.8, visits: 3, comment: "딸기 시리즈 인생템", color: "#FFD6D6", location: "서울 성수동" },
        { id: "2", name: "러스크 하우스", emoji: "🍰", rating: 4.7, visits: 2, comment: "을지로 숨은 보석", color: "#FFE8D6", location: "서울 을지로" },
        { id: "3", name: "노티드 압구정", emoji: "🍩", rating: 4.5, visits: 4, comment: "우유 크림 도넛 최고", color: "#E8D6FF", location: "서울 압구정" },
        { id: "4", name: "카페 온도", emoji: "☕", rating: 4.9, visits: 5, comment: "라떼아트 맛집", color: "#D6E8FF", location: "서울 합정동" },
      ],
      wishlist: [
        { id: "w1", name: "아우어 베이커리", emoji: "🥐", rating: 0, visits: 0, comment: "더티초코 먹으러 가야함", color: "#FFF", location: "서울 한남동" },
        { id: "w2", name: "런던 베이글", emoji: "🥯", rating: 0, visits: 0, comment: "웨이팅 도전...", color: "#FFF", location: "서울 안국동" },
      ]
    },

    music: {
      playlistName: "카페 BGM 모음",
      songs: [
        { title: "Strawberry Moon", artist: "IU", albumEmoji: "🍓", albumColor: "#FFD6D6", duration: "3:42" },
        { title: "Peaches", artist: "Justin Bieber", albumEmoji: "🍑", albumColor: "#FDDCB5", duration: "3:18" },
        { title: "Lemon", artist: "Kenshi Yonezu", albumEmoji: "🍋", albumColor: "#FFF3D6", duration: "4:16" },
        { title: "Butter", artist: "BTS", albumEmoji: "🧈", albumColor: "#FFF8E0", duration: "2:44" },
        { title: "Ice Cream", artist: "BLACKPINK", albumEmoji: "🍦", albumColor: "#E8D6FF", duration: "2:56" },
      ],
    },

    calendar: {
      events: [
        { date: "2026-02-15", title: "두쫀쿠 딸기 신메뉴", icon: "🍓", color: "#FF8080" },
        { date: "2026-02-18", title: "친구 생일 파티", icon: "🎂", color: "#F4A77A" },
        { date: "2026-02-22", title: "카페쇼 관람", icon: "☕", color: "#A8CCE8" },
        { date: "2026-02-28", title: "마카롱 클래스", icon: "🍪", color: "#A8DBC5" },
      ],
    },

    notes: [
      {
        title: "🍰 가고싶은 카페 리스트",
        content: "□ 러스크 하우스 2호점 (신사)\n☑ 두쫀쿠 (성수) — 다녀옴! 최고\n□ 아우어 베이커리 (한남)\n□ 카페 레이어드 (성수)\n☑ 카페 온도 (합정) — 단골됨",
        updatedAt: "2.17",
      },
      {
        title: "☕ 커피 취향",
        content: "• 아아 + 바닐라 시럽 1펌프\n• 라떼는 귀리우유로 변경\n• 산미 있는 원두 선호 (에티오피아)\n• 오후 4시 이후엔 디카페인",
        updatedAt: "2.15",
      },
    ],

    expenses: {
      monthTotal: 87400,
      monthName: "2월",
      monthlyQuote: "디저트는 소비가 아니라 자기 투자입니다 🍰✨",
      categories: [
        { name: "카페", emoji: "☕", percentage: 45, color: "#F4A77A" },
        { name: "디저트", emoji: "🍰", percentage: 30, color: "#F2B5C1" },
        { name: "재료", emoji: "🛒", percentage: 15, color: "#A8DBC5" },
        { name: "선물", emoji: "🎁", percentage: 10, color: "#C5B8E8" },
      ],
      items: [
        { id: "e1", title: "두쫀쿠 딸기세트", amount: 12800, date: "2/15", comment: "인생 디저트 등극", emoji: "🧁" },
        { id: "e2", title: "카페 온도 라떼", amount: 6500, date: "2/14", comment: "라떼아트 백조였음", emoji: "☕" },
        { id: "e3", title: "러스크하우스", amount: 15000, date: "2/13", comment: "티라미수 2개 포장", emoji: "🍰" },
        { id: "e4", title: "베이킹 재료", amount: 8200, date: "2/11", comment: "홈베이킹 도전기", emoji: "🛒" },
        { id: "e5", title: "친구 생일 케이크", amount: 35000, date: "2/10", comment: "투썸 스초생", emoji: "🎂" },
      ]
    },

    wishlistShop: {
      items: [
        { 
          id: "w1", name: "스메그 반죽기", price: 680000, emoji: "🥣", 
          imageUrl: unsplash("1590794056226-79ef3a8147e1"),
          memo: "홈베이킹의 로망... 언젠간 산다", status: "wish" 
        },
        { 
          id: "w2", name: "마카롱 키트", price: 45000, emoji: "🍪", 
          imageUrl: unsplash("1569864358642-9d1684040f43"),
          memo: "2/28 클래스 예약함!", status: "bought" 
        },
        { 
          id: "w3", name: "디저트 접시 세트", price: 32000, emoji: "🍽️", 
          imageUrl: unsplash("1603194553281-c6039b3af1ff"),
          memo: "파스텔 색 너무 예뻐", status: "wish" 
        },
        { 
          id: "w4", name: "일리 커피머신", price: 129000, emoji: "☕", 
          imageUrl: unsplash("1565498971161-42ae3dbbb751"),
          memo: "생일선물로 받음!", status: "gifted" 
        },
      ]
    },

    messages: [
      { from: "🍰 디저트 친구", time: "오후 2:30", preview: "두쫀쿠 신메뉴 나왔대!! 가자가자", unread: true },
      { from: "☕ 카페 탐방 모임", time: "오후 1:15", preview: "이번 주 토요일 어디 갈까?", unread: true },
      { from: "🎂 케이크 주문", time: "오전 11:00", preview: "주문 확인했습니다. 22일 픽업이시죠?", unread: false },
    ],

    guestbook: {
      entries: [
        { id: "g1", author: "cake_lover", message: "사이트 너무 예쁘다!! 🥹", timeAgo: "2시간 전", isOwner: false },
        { id: "g2", author: "달콤한하루", message: "고마워~ 💕", timeAgo: "1시간 전", isOwner: true },
        { id: "g3", author: "sweet_22", message: "두쫀쿠 나도 가봐야겠다 🍰", timeAgo: "3시간 전", isOwner: false },
        { id: "g4", author: "cafe_daily", message: "카페 리스트 참고할게!! ☕", timeAgo: "5시간 전", isOwner: false },
        { id: "g5", author: "달콤한하루", message: "카페 온도 꼭 가봐! 최고야 ✨", timeAgo: "4시간 전", isOwner: true },
      ],
    },

    appStore: {
      appName: "Dingle Phone",
      rating: 4.9,
      reviews: [
        { id: "r1", author: "dessert_fan", rating: 5, comment: "이거 진짜 미친 아이디어... 너무 귀여워요", timeAgo: "1일 전" },
        { id: "r2", author: "cafe_love", rating: 4, comment: "꾸미기 기능 빨리 나왔으면 좋겠어요!!", timeAgo: "2일 전" },
        { id: "r3", author: "baking_king", rating: 5, comment: "제 덕질용 폰도 만들고 싶어요 ㅠㅠ", timeAgo: "3일 전" },
      ]
    }
  },

  homeScreen: {
    widgets: [
      {
        type: "info",
        lines: [
          "🍰 오늘 두쫀쿠 신메뉴 출시!",
          "🎵 Strawberry Moon — IU ♪",
        ],
      },
    ],
    appLayout: [
      { id: "photos", icon: "🍰", name: "사진첩", badge: 12, iconBg: "#FFE8D6" },
      { id: "calendar", icon: "📅", name: "캘린더", badge: 2, iconBg: "#E8D6FF" },
      { id: "music", icon: "🎵", name: "음악", iconBg: "#D6FFE8" },
      { id: "notes", icon: "📝", name: "메모", iconBg: "#FFF3D6" },
      
      { id: "social", icon: "📱", name: "SNS", iconBg: "#E8D0C0" },
      { id: "map", icon: "📍", name: "지도", iconBg: "#D6E8FF" },
      { id: "wishlist", icon: "🛍️", name: "위시", iconBg: "#E8FFD6" },
      { id: "expenses", icon: "💰", name: "가계부", iconBg: "#FFE4E1" },

      { id: "guestbook", icon: "💌", name: "방명록", badge: 5, iconBg: "#FFD6D6" },
      { id: "settings", icon: "⚙️", name: "설정", iconBg: "#E5E7EB" },
      { id: "appstore", icon: "🏪", name: "스토어", iconBg: "#A8DBC5" },
      { id: "search", icon: "🔍", name: "검색", iconBg: "#F3F4F6" },
    ],
    dock: [
      { id: "photos", icon: "🍰", name: "사진첩", iconBg: "#FFE8D6" },
      { id: "social", icon: "📱", name: "SNS", iconBg: "#E8D0C0" },
      { id: "map", icon: "📍", name: "지도", iconBg: "#D6E8FF" },
      { id: "guestbook", icon: "💌", name: "방명록", iconBg: "#FFD6D6" },
    ],
  },
};