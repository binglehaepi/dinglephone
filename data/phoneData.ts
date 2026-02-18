import { DinglePhoneData } from '../types';

export const demoPhoneData: DinglePhoneData = {
  owner: {
    name: "딩글",
    bio: "딩글의 하루",
    emoji: "🥥",
    profileColor: "#F5D0B5",
  },

  device: "dingle-phone",

  theme: {
    preset: "peach",
    wallpaperStyle: "gradient",
    wallpaper: "linear-gradient(180deg, #FAF6F1 0%, #FFF3EB 50%, #FAF6F1 100%)",
    lockWallpaper: "linear-gradient(180deg, #FAF6F1 0%, #FFF3EB 50%, #FAF6F1 100%)",
  },

  apps: {
    photos: {
      albumName: "딩글 캐릭터 모음",
      albumDescription: "^-^",
      items: [
        {
          id: "1", emoji: "🥥", color: "#FFF3EB",
          imageUrl: "/coconut.png",
          caption: "코코넛 🥥",
          memo: "딩글의 대표 캐릭터! 갈색 코코넛이에요. 언제 봐도 귀엽다 ㅠㅠ",
          date: "2026.02.16", location: "딩글 스튜디오",
          tags: ["코코넛", "딩글", "캐릭터"],
        },
        {
          id: "2", emoji: "🍟", color: "#FFF8E0",
          imageUrl: "/fries.png",
          caption: "감자튀김 🍟",
          memo: "바삭바삭 감자튀김 캐릭터~ 보면 배고파지는 매력",
          date: "2026.02.14", location: "딩글 스튜디오",
          tags: ["감자튀김", "딩글"],
        },
        {
          id: "3", emoji: "🍎", color: "#FFEBEB",
          imageUrl: "/apple.webp",
          caption: "반짝 사과 🍎",
          memo: "반짝반짝 빛나는 사과! 딩글 캐릭터 중 제일 상큼해",
          date: "2026.02.13", location: "딩글 스튜디오",
          tags: ["사과", "딩글", "반짝"],
        },
        {
          id: "4", emoji: "🥑", color: "#EBFFF3",
          imageUrl: "/avocado.webp",
          caption: "아보카도 🥑",
          memo: "건강한 매력의 아보카도 캐릭터. 초록초록 힐링됨",
          date: "2026.02.11", location: "딩글 스튜디오",
          tags: ["아보카도", "딩글"],
        },
        {
          id: "5", emoji: "🍐", color: "#FFFCEB",
          imageUrl: "/pear.webp",
          caption: "배 🍐",
          memo: "달콤한 배 캐릭터. 포동포동 귀여운 실루엣이 매력!",
          date: "2026.02.08", location: "딩글 스튜디오",
          tags: ["배", "딩글"],
        },
        {
          id: "6", emoji: "🍄", color: "#F3EBFF",
          imageUrl: "/mushroom.webp",
          caption: "버섯 🍄",
          memo: "톡톡 튀는 버섯 캐릭터! 숲속 요정 느낌 ㅎㅎ",
          date: "2026.01.28", location: "딩글 스튜디오",
          tags: ["버섯", "딩글"],
        },
        {
          id: "7", emoji: "🌻", color: "#FFF8E0",
          imageUrl: "/sunflower.webp",
          caption: "해바라기 🌻",
          memo: "햇살 가득한 해바라기~ 보기만 해도 기분 좋아지는 캐릭터",
          date: "2026.01.22", location: "딩글 스튜디오",
          tags: ["해바라기", "딩글", "꽃"],
        },
        {
          id: "8", emoji: "🌷", color: "#FFEBF3",
          imageUrl: "/tulip.webp",
          caption: "핑크 튤립 🌷",
          memo: "사랑스러운 핑크 튤립! 봄이 오면 생각나는 캐릭터",
          date: "2026.01.15", location: "딩글 스튜디오",
          tags: ["튤립", "딩글", "핑크"],
        },
        {
          id: "9", emoji: "🥛", color: "#F5EDE4",
          imageUrl: "/cup.webp",
          caption: "계량컵",
          memo: "요리할 때 필수! 꼼꼼한 성격의 계량컵 캐릭터",
          date: "2026.01.10", location: "딩글 스튜디오",
          tags: ["계량컵", "딩글"],
        },
        {
          id: "10", emoji: "🤕", color: "#FFEBEB",
          imageUrl: "/patient.webp",
          caption: "환자",
          memo: "앙 아파라~ 귀여운 환자 캐릭터. 빨리 나으세요!",
          date: "2026.01.05", location: "딩글 스튜디오",
          tags: ["환자", "딩글"],
        },
        {
          id: "11", emoji: "🥬", color: "#EBFFF3",
          imageUrl: "/radish.webp",
          caption: "무",
          memo: "시원한 매력의 무 캐릭터! 든든하고 믿음직해~",
          date: "2026.01.01", location: "딩글 스튜디오",
          tags: ["무", "딩글"],
        },
      ],
    },

    social: {
      feeds: [
        {
          id: "s1", platform: "twitter",
          thumbnailUrl: "/coconut.png",
          text: "딩글 다이어리 펀딩 완료! 감사합니다 💕 발송 준비중이에요~",
          likes: "128", timeAgo: "2일 전",
          sourceUrl: "https://x.com/binglehaepi/status/2017547192362541473"
        },
        {
          id: "s2", platform: "twitter",
          thumbnailUrl: "/apple.webp",
          text: "딩글 캐릭터 새 일러스트 공개! 🍎 반짝반짝 사과가 왔어요~",
          likes: "256", timeAgo: "5일 전",
          sourceUrl: "https://x.com/binglehaepi/status/2004093234637901952"
        },
        {
          id: "s3", platform: "twitter",
          thumbnailUrl: "/tulip.webp",
          text: "딩글 굿즈 제작 비하인드 🌷 핑크 튤립 스티커 나왔어요!",
          likes: "189", timeAgo: "1주 전",
          sourceUrl: "https://x.com/binglehaepi/status/2001365466334531664"
        },
        {
          id: "s4", platform: "youtube",
          thumbnailUrl: "/sunflower.webp",
          text: "[VLOG] 딩글 다이어리 제작 과정 🌻 언박싱부터 포장까지!",
          likes: "1.2K", timeAgo: "2주 전",
          sourceUrl: "https://www.youtube.com/watch?v=86gToHFkbiU&t=798s"
        },
        {
          id: "s5", platform: "pinterest",
          thumbnailUrl: "/fries.png",
          text: "딩글 다이어리 텀블벅 펀딩 페이지 🍟",
          likes: "340", timeAgo: "3주 전",
          sourceUrl: "https://tumblbug.com/bingle_diary"
        }
      ]
    },

    map: {
      title: "나의 덕질 지도",
      places: [
        { id: "1", name: "애니메이트 홍대점", emoji: "🏪", rating: 4.8, visits: 5, comment: "피규어 종류 많음! 한정판도 잘 풀림", color: "#EBF3FF", location: "서울 마포구 홍대" },
        { id: "2", name: "아크로스 홍대", emoji: "🎮", rating: 4.6, visits: 3, comment: "애니 굿즈 천국. 아크릴 스탠드 구매", color: "#FFEBF3", location: "서울 마포구 홍대" },
        { id: "3", name: "피규어 갤러리 홍대", emoji: "🗿", rating: 4.5, visits: 2, comment: "넨도로이드 가격이 착함", color: "#FFF3EB", location: "서울 마포구 홍대" },
        { id: "4", name: "프리미엄 반다이 서울", emoji: "🤖", rating: 4.9, visits: 4, comment: "건프라 한정판 여기서 겟!", color: "#EBFFF3", location: "서울 강남구" },
        { id: "5", name: "만다라케 (온라인)", emoji: "📦", rating: 4.7, visits: 8, comment: "중고 피규어 보물창고", color: "#F3EBFF", location: "일본 직구" },
      ],
      wishlist: [
        { id: "w1", name: "교보문고 광화문", emoji: "📚", rating: 0, visits: 0, comment: "만화책 코너 탐방 예정", color: "#FFF", location: "서울 종로구" },
        { id: "w2", name: "팝콘D 스퀘어", emoji: "🍿", rating: 0, visits: 0, comment: "캐릭터 팝업스토어 오픈 예정!", color: "#FFF", location: "서울 성동구" },
      ]
    },

    music: {
      playlistName: "딩글 BGM 모음",
      songs: [
        { title: "Lemon", artist: "Kenshi Yonezu", albumEmoji: "🍋", albumColor: "#FFF3D6", duration: "4:16", sourceUrl: "https://www.youtube.com/watch?v=SX_ViT4Ra7k" },
        { title: "Pretender", artist: "Official HIGE DANdism", albumEmoji: "🎸", albumColor: "#EBF3FF", duration: "5:24", sourceUrl: "https://www.youtube.com/watch?v=TQ8WlA2GnHo" },
        { title: "Sukina Koto", artist: "MrChildren", albumEmoji: "💙", albumColor: "#D6E8FF", duration: "5:01", sourceUrl: "https://www.youtube.com/watch?v=5ECuF0mVwHQ" },
        { title: "夜に駆ける (YOASOBI)", artist: "YOASOBI", albumEmoji: "🌙", albumColor: "#E8D6FF", duration: "4:18", sourceUrl: "https://www.youtube.com/watch?v=x8VYWazR5mE" },
        { title: "Stay With Me", artist: "Miki Matsubara", albumEmoji: "🌃", albumColor: "#FFD6E8", duration: "3:40", sourceUrl: "https://www.youtube.com/watch?v=UNSRxjGVR7c" },
      ],
    },

    calendar: {
      events: [
        { date: "2026-01-15", title: "딩글 펀딩 마감일", icon: "🎯", color: "#E8915A" },
        { date: "2026-01-27", title: "예상 발송 시작일", icon: "📦", color: "#7AADE8" },
        { date: "2026-02-16", title: "딩글 선물 발송 완료!", icon: "🎁", color: "#6AC5A0" },
      ],
    },

    notes: [
      {
        title: "🥥 딩글 프로젝트 메모",
        content: "☑ 캐릭터 일러스트 완성\n☑ 텀블벅 펀딩 오픈\n☑ 다이어리 제작\n☑ 선물 발송 완료!\n□ 딩글폰 사이트 공개",
        updatedAt: "2.18",
      },
      {
        title: "📦 발송 체크리스트",
        content: "• 포장 박스 확인\n• 스티커 동봉\n• 엽서 동봉\n• 배송 추적번호 공유\n• 감사 메시지 작성",
        updatedAt: "2.16",
      },
    ],

    expenses: {
      monthTotal: 52400,
      monthName: "2월",
      monthlyQuote: "덕질은 소비가 아니라 투자입니다 🥥✨",
      categories: [
        { name: "굿즈", emoji: "🎁", percentage: 40, color: "#E8915A" },
        { name: "피규어", emoji: "🗿", percentage: 30, color: "#9A7AE8" },
        { name: "음식", emoji: "🍰", percentage: 20, color: "#6AC5A0" },
        { name: "기타", emoji: "📦", percentage: 10, color: "#7AADE8" },
      ],
      items: [
        { id: "e1", title: "dingle 프로그램", amount: 9900, date: "2/16", comment: "딩글 다이어리 구매 완료!", emoji: "🥥" },
        { id: "e2", title: "두쫀쿠 디저트", amount: 12500, date: "2/14", comment: "발렌타인 자축 디저트", emoji: "🍰" },
        { id: "e3", title: "데스노트 피규어", amount: 30000, date: "2/10", comment: "류크 피규어 드디어 겟!", emoji: "🗿" },
      ]
    },

    wishlistShop: {
      items: [
        {
          id: "w1", name: "류크 넨도로이드", price: 65000, emoji: "💀",
          imageUrl: "",
          memo: "데스노트 넨도로이드 시리즈 풀 셋 모으는 중", status: "bought"
        },
        {
          id: "w2", name: "주술회전 0권 한정판", price: 18000, emoji: "📕",
          imageUrl: "",
          memo: "한정판 표지 겟해야함...", status: "wish"
        },
        {
          id: "w3", name: "하이큐!! 아크릴 스탠드", price: 12000, emoji: "🏐",
          imageUrl: "",
          memo: "히나타 & 카게야마 세트", status: "wish"
        },
        {
          id: "w4", name: "딩글 다이어리 리필", price: 9900, emoji: "🥥",
          imageUrl: "",
          memo: "다이어리 내지 리필용!", status: "bought"
        },
        {
          id: "w5", name: "스파이 패밀리 피규어", price: 45000, emoji: "🕵️",
          imageUrl: "",
          memo: "아냐 피규어 너무 귀여워 ㅠㅠ", status: "wish"
        },
      ]
    },

    messages: [
      { from: "🥥 딩글 팀", time: "오후 2:30", preview: "선물 발송 완료됐습니다! 확인해주세요~", unread: true },
      { from: "📦 택배 알림", time: "오후 1:15", preview: "딩글 다이어리가 배송 중입니다", unread: true },
      { from: "🎁 텀블벅", time: "오전 11:00", preview: "펀딩 리워드 발송이 시작되었습니다!", unread: false },
    ],

    guestbook: {
      entries: [
        { id: "g0", author: "dinglephone", message: "딩글폰에 오신 걸 환영해요! 🥥\n이곳은 딩글 캐릭터들과 함께하는 나만의 폰이에요.\n방명록에 인사 남겨주세요~ 💕", timeAgo: "고정", isOwner: true },
        { id: "g1", author: "coconut_fan", message: "코코넛 캐릭터 너무 귀여워!! 🥥💕", timeAgo: "2시간 전", isOwner: false }
      ],
    },

    appStore: {
      appName: "Dingle Phone",
      rating: 4.9,
      reviews: [
        { id: "r1", author: "dingle_fan", rating: 5, comment: "딩글 캐릭터들로 꾸며진 폰이라니... 진짜 최고예요!", timeAgo: "1일 전" },
        { id: "r2", author: "coconut_love", rating: 5, comment: "코코넛 배경화면 설정하고 매일 보고 있어요 🥥", timeAgo: "2일 전" },
        { id: "r3", author: "goods_buyer", rating: 4, comment: "텀블벅에서 다이어리 샀는데 여기서도 만나니 반갑네요~", timeAgo: "3일 전" },
      ]
    }
  },

  homeScreen: {
    widgets: [
      {
        type: "info",
        lines: [],
      },
    ],
    appLayout: [
      { id: "photos", icon: "📸", name: "사진첩", badge: 11, iconBg: "#FFF3EB" },
      { id: "calendar", icon: "📅", name: "캘린더", badge: 1, iconBg: "#F3EBFF" },
      { id: "music", icon: "🎵", name: "음악", iconBg: "#EBFFF3" },
      { id: "notes", icon: "📝", name: "메모", iconBg: "#FFFCEB" },

      { id: "social", icon: "🌐", name: "dingle", iconBg: "#FFEBF3" },
      { id: "map", icon: "📍", name: "지도", iconBg: "#EBF3FF" },
      { id: "wishlist", icon: "🛍️", name: "위시", iconBg: "#FFF0EB" },
      { id: "expenses", icon: "💰", name: "가계부", iconBg: "#F0FFEB" },

      { id: "guestbook", icon: "💌", name: "방명록", badge: 5, iconBg: "#FFE8E8" },
      { id: "settings", icon: "⚙️", name: "설정", iconBg: "#F2F0ED" },
      { id: "appstore", icon: "🏪", name: "스토어", iconBg: "#EBF0FF" },
      { id: "search", icon: "🔍", name: "검색", iconBg: "#F5EDE4" },
    ],
    dock: [
      { id: "photos", icon: "📸", name: "사진첩", iconBg: "#FFF3EB" },
      { id: "social", icon: "🌐", name: "dingle", iconBg: "#FFEBF3" },
      { id: "map", icon: "📍", name: "지도", iconBg: "#EBF3FF" },
      { id: "guestbook", icon: "💌", name: "방명록", iconBg: "#FFE8E8" },
    ],
  },
};
