import { PhoneData } from '../types';

export const defaultPhone: PhoneData = {
  id: 'bingle-default',
  isDefault: true,
  createdAt: '2026-01-01T00:00:00.000Z',

  owner: {
    name: '빙글',
    bio: '딩글 만드는 1인 개발자',
    emoji: '✨',
  },

  theme: 'default',

  apps: {
    photos: {
      albumName: '딩글 캐릭터들',
      albumDescription: '',
      items: [
        {
          id: '1',
          imageUrl: '/coconut.png',
          emoji: '🥥',
          color: '#FFF3EB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '2',
          imageUrl: '/tulip.webp',
          emoji: '🌷',
          color: '#FFE0EC',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '3',
          imageUrl: '/apple.webp',
          emoji: '🍎',
          color: '#FFEBEB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '4',
          imageUrl: '/avocado.webp',
          emoji: '🥑',
          color: '#EBFFF3',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '5',
          imageUrl: '/sunflower.webp',
          emoji: '🌻',
          color: '#FFFCEB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '6',
          imageUrl: '/mushroom.webp',
          emoji: '🍄',
          color: '#F3EBFF',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '7',
          imageUrl: '/pear.webp',
          emoji: '🍐',
          color: '#F0FFEB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '8',
          imageUrl: '/cup.webp',
          emoji: '☕',
          color: '#EBF3FF',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '9',
          imageUrl: '/radish.webp',
          emoji: '🥕',
          color: '#FFF3EB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '10',
          imageUrl: '/fries.png',
          emoji: '🍟',
          color: '#FFFCEB',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
        {
          id: '11',
          imageUrl: '/patient.webp',
          emoji: '🩹',
          color: '#EBF3FF',
          caption: '',
          memo: '',
          date: '',
          location: '',
          tags: [],
        },
      ],
    },

    social: {
      feeds: [
        {
          id: '1',
          platform: 'twitter',
          thumbnailUrl: '',
          text: '오늘도 카페에서 작업 중 ☕',
          likes: '47',
          timeAgo: '2시간 전',
          sourceUrl: '#',
        },
        {
          id: '2',
          platform: 'twitter',
          thumbnailUrl: '',
          text: '새벽 감성으로 UI 만지는 중 🌙',
          likes: '234',
          timeAgo: '3일 전',
          sourceUrl: '#',
        },
        {
          id: '3',
          platform: 'youtube',
          thumbnailUrl: '',
          text: '개발자 데스크 셋업 브이로그',
          likes: '1.2K',
          timeAgo: '1주 전',
          sourceUrl: '#',
        },
        {
          id: '4',
          platform: 'pinterest',
          thumbnailUrl: '',
          text: '파스텔 UI 레퍼런스 모음',
          likes: '89',
          timeAgo: '5일 전',
          sourceUrl: '#',
        },
      ],
    },

    map: {
      title: '나의 작업 카페',
      visited: [
        { id: '1', name: '스타벅스 성수', emoji: '☕', rating: 4.2, visits: 12, comment: '콘센트 많아서 자주 감', location: '서울 성수동', color: '#D6E8FF' },
        { id: '2', name: '할리스 합정', emoji: '💻', rating: 4.5, visits: 8, comment: '2층 조용해서 집중 잘 됨', location: '서울 합정동', color: '#EBFFF3' },
        { id: '3', name: '이디야 연남', emoji: '📝', rating: 3.8, visits: 5, comment: '아메리카노가 제일 쌈', location: '서울 연남동', color: '#FFF3EB' },
      ],
      wishlist: [
        { id: '4', name: '카페 드롭탑', emoji: '🤍', location: '서울 강남', comment: '인스타에서 봤는데 분위기 좋아보임' },
      ],
    },

    music: {
      playlistName: '코딩할 때 듣는 노래',
      songs: [
        { title: 'Ditto', artist: 'NewJeans', albumEmoji: '💿', albumColor: '#E8D6FF', duration: '3:05' },
        { title: 'Super Shy', artist: 'NewJeans', albumEmoji: '🐰', albumColor: '#FFD6E8', duration: '2:34' },
        { title: 'UNFORGIVEN', artist: 'LE SSERAFIM', albumEmoji: '🔥', albumColor: '#FFE0D6', duration: '3:24' },
        { title: 'Eve, Psyche...', artist: 'LE SSERAFIM', albumEmoji: '🦋', albumColor: '#D6F0FF', duration: '3:42' },
        { title: 'Cupid', artist: 'FIFTY FIFTY', albumEmoji: '💘', albumColor: '#FFD6D6', duration: '2:54' },
        { title: 'lofi hip hop', artist: 'ChilledCow', albumEmoji: '🎧', albumColor: '#F0F0EB', duration: '∞' },
      ],
    },

    calendar: {
      events: [
        { date: '2026-02-18', title: '디자인 시안 마감', icon: '🎨', color: '#E8915A' },
        { date: '2026-02-20', title: '미팅', icon: '📋', color: '#7AADE8' },
        { date: '2026-02-25', title: '프로젝트 리뷰', icon: '📊', color: '#9A7AE8' },
        { date: '2026-02-28', title: '배포', icon: '🚀', color: '#5AAE80' },
        { date: '2026-03-05', title: '운동', icon: '💪', color: '#E87AAD' },
        { date: '2026-03-10', title: '정기 점검', icon: '⚒️', color: '#C8A830' },
      ],
    },

    notes: [
      {
        title: '📝 할 일 목록',
        content: '☑ 디자인 시안 정리\n☑ 기본 테마 적용\n□ 모바일 최적화\n□ 공유 기능 추가\n□ 피드백 반영',
        updatedAt: '2026.02.18',
      },
      {
        title: '💡 메모',
        content: '• 레트로 감성 테마 추가하기\n• 다크 모드 지원\n• 폰트 커스터마이징\n• 스티커 기능',
        updatedAt: '2026.02.17',
      },
      {
        title: '📚 읽을 책',
        content: '• 디자인 오브 에브리데이 씽즈\n• 린 스타트업\n• 인스파이어드\n• 사용자를 생각하게 하지 마',
        updatedAt: '2026.02.15',
      },
    ],

    expenses: {
      monthTotal: 142800,
      monthName: '2월',
      categories: [
        { name: '카페', emoji: '☕', percentage: 35, color: '#E8915A' },
        { name: '서버/도메인', emoji: '🖥️', percentage: 25, color: '#7AADE8' },
        { name: '디저트(보상)', emoji: '🍰', percentage: 20, color: '#E87AAD' },
        { name: '도서/강의', emoji: '📚', percentage: 15, color: '#9A7AE8' },
        { name: '기타', emoji: '📦', percentage: 5, color: '#C8B8B0' },
      ],
      items: [
        { id: '1', title: 'Vercel Pro', amount: 20000, date: '2/01', comment: '', emoji: '🖥️' },
        { id: '2', title: '아메리카노', amount: 4500, date: '2/15', comment: '', emoji: '☕' },
        { id: '3', title: '디저트', amount: 12800, date: '2/14', comment: '', emoji: '🍰' },
        { id: '4', title: 'Firebase', amount: 15000, date: '2/01', comment: '', emoji: '🔥' },
        { id: '5', title: '온라인 강의', amount: 35000, date: '2/10', comment: '', emoji: '📚' },
        { id: '6', title: '도메인', amount: 22000, date: '2/01', comment: '', emoji: '🌐' },
      ],
      monthlyQuote: '',
    },

    wishlistShop: {
      items: [
        { id: '1', name: '맥북 프로 M4', price: 2990000, emoji: '💻', memo: '', status: 'wish', sourceUrl: '#' },
        { id: '2', name: '에어팟 맥스', price: 769000, emoji: '🎧', memo: '', status: 'wish', sourceUrl: '#' },
        { id: '3', name: '스탠딩 데스크', price: 450000, emoji: '🪑', memo: '', status: 'wish', sourceUrl: '#' },
        { id: '4', name: 'React 공식 문서', price: 45000, emoji: '📘', memo: '', status: 'bought', sourceUrl: '#' },
        { id: '5', name: '커피 그라인더', price: 89000, emoji: '☕', memo: '', status: 'wish', sourceUrl: '#' },
      ],
    },

    messages: [
      { from: '🧑‍💻 개발자 친구', time: '오후 3:00', preview: '주말에 같이 해커톤 나갈래?', unread: true },
      { from: '📋 택배 알림', time: '오전 11:00', preview: '배송이 완료되었습니다', unread: true },
      { from: '☕ 카페', time: '어제', preview: '적립 포인트가 쌓였습니다', unread: false },
    ],

    guestbook: {
      initialEntries: [
        { id: 'g0', author: '빙글', message: '방명록에 인사 남겨주세요 🥥', timeAgo: '고정', isOwner: true },
        { id: 'g1', author: 'coconut_fan', message: '구경하고 갑니다~', timeAgo: '1시간 전', isOwner: false },
        { id: 'g2', author: 'visitor', message: '👋', timeAgo: '3시간 전', isOwner: false },
      ],
    },

    search: {
      recentLinks: [
        { title: 'Next.js 공식 문서', url: 'https://nextjs.org/docs', emoji: '📘' },
        { title: 'Tailwind CSS', url: 'https://tailwindcss.com', emoji: '🎨' },
        { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', emoji: '📖' },
        { title: 'GitHub', url: 'https://github.com', emoji: '🐙' },
      ],
      frequentSites: [
        { name: '깃허브', icon: '🐙', url: 'https://github.com' },
        { name: '트위터', icon: '🐦', url: 'https://twitter.com' },
        { name: '핀터레스트', icon: '📌', url: 'https://pinterest.com' },
        { name: '버셀', icon: '▲', url: 'https://vercel.com' },
      ],
    },

    appStore: {
      appName: 'Dingle Phone',
      rating: 4.9,
      reviews: [
        { id: 'r1', author: 'user_01', rating: 5, comment: '테마 종류가 다양해서 좋아요', timeAgo: '1일 전' },
        { id: 'r2', author: 'user_02', rating: 5, comment: '커스터마이징이 재밌어요 🎀', timeAgo: '2일 전' },
        { id: 'r3', author: 'user_03', rating: 4, comment: '폰 꾸미기 좋네요', timeAgo: '3일 전' },
      ],
    },
  },

  homeScreen: {
    iconShape: 'heart',
    widgets: [
      {
        type: 'info',
        lines: ['🥥 나만의 딩글 폰', '🎵 Ditto — NewJeans ♪'],
      },
    ],
    appLayout: [
      // 사진첩 위젯 (다마고치 프레임) — 2x2
      { id: 'w-photos', icon: '📸', name: '사진첩', iconBg: '#FFF3EB', customIconUrl: '/coconut.png', type: 'widget', appId: 'photos', widgetFrame: 'tamagotchi', widgetSpan: { cols: 2, rows: 2 } },
      // 기본 아이콘 (독에 있는 설정/스토어/메시지/방명록 제외)
      { id: 'calendar', icon: '📅', name: '캘린더', badge: 3, iconBg: '#F3EBFF' },
      { id: 'music', icon: '🎵', name: '음악', iconBg: '#EBFFF3' },
      { id: 'notes', icon: '📝', name: '메모', iconBg: '#FFFCEB' },
      { id: 'social', icon: '🌐', name: 'SNS', iconBg: '#FFEBF3' },
      { id: 'map', icon: '📍', name: '지도', iconBg: '#EBF3FF' },
      { id: 'wishlist', icon: '🛍️', name: '위시', iconBg: '#FFF0EB', customIconUrl: '/cup.webp' },
      { id: 'expenses', icon: '💰', name: '가계부', iconBg: '#F0FFEB' },
    ],
    dock: [
      { id: 'settings', icon: '⚙️', name: '설정', iconBg: '#F2F0ED' },
      { id: 'appstore', icon: '🏪', name: '스토어', iconBg: '#EBF0FF' },
      { id: 'messages', icon: '💬', name: '메시지', iconBg: '#FFEBEB' },
      { id: 'guestbook', icon: '💌', name: '방명록', iconBg: '#FFE8E8' },
    ],
  },
};
