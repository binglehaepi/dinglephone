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
      albumName: '딩글 개발 일지',
      albumDescription: '혼자 만드는 서비스의 기록',
      items: [
        {
          id: '1',
          emoji: '🎉',
          color: '#FFF3EB',
          caption: '텀블벅 114명 달성!',
          memo: '진짜 울뻔했다. 100명 넘을 줄 몰랐는데... 모든 서포터분들 감사합니다 ㅠㅠ',
          date: '2026.01.15',
          location: '집',
          tags: ['텀블벅', '딩글', '감사'],
        },
        {
          id: '2',
          emoji: '💻',
          color: '#EBF3FF',
          caption: '딩글 v1.0 첫 릴리즈',
          memo: '6개월 만에 드디어 첫 버전 출시. 버그 투성이지만 일단 냈다. 완벽보다 출시!',
          date: '2026.01.20',
          location: '카페',
          tags: ['딩글', '출시', '개발'],
        },
        {
          id: '3',
          emoji: '📱',
          color: '#F3EBFF',
          caption: '딩글 폰 아이디어 스케치',
          memo: '새벽 3시에 갑자기 떠오른 아이디어. 덕질 폰이라는 컨셉. 이거 되겠는데?!',
          date: '2026.02.15',
          location: '집',
          tags: ['딩글폰', '아이디어', '새벽작업'],
        },
        {
          id: '4',
          emoji: '🍰',
          color: '#FFE8D6',
          caption: '개발하다가 먹은 디저트',
          memo: '코딩 12시간 하고 보상으로 먹은 케이크. 개발자의 연료는 설탕.',
          date: '2026.02.10',
          location: '성수동',
          tags: ['디저트', '보상', '개발자일상'],
        },
        {
          id: '5',
          emoji: '📊',
          color: '#EBFFF3',
          caption: '유저 피드백 정리 중',
          memo: '15개의 피드백 중 5개가 "모바일 버전 원해요". 맞아... 모바일 해야지...',
          date: '2026.02.08',
          location: '집',
          tags: ['피드백', '모바일', '유저'],
        },
        {
          id: '6',
          emoji: '📝',
          color: '#FFFCEB',
          caption: '사업계획서 작성 중',
          memo: '정부 지원사업 신청서 쓰는데 "시장 규모"를 어떻게 산정하지... 구글링 3시간째',
          date: '2026.02.17',
          location: '카페',
          tags: ['지원사업', '사업계획', '스타트업'],
        },
        {
          id: '7',
          emoji: '✍️',
          color: '#FFE0EC',
          caption: '데스노트 팬아트 그리던 시절',
          memo: '이때는 그냥 그림 그리는 게 재밌었는데, 이제는 서비스 만드는 게 더 재밌다',
          date: '2025.08.20',
          location: '집',
          tags: ['데스노트', '팬아트', '추억'],
        },
        {
          id: '8',
          emoji: '🎯',
          color: '#F0FFEB',
          caption: '목표: 5만 구독자',
          memo: '월 1만원 × 5만명 = 연 60억. 꿈은 크게. 일단 100명부터.',
          date: '2026.02.01',
          location: '집',
          tags: ['목표', '구독', '비즈니스'],
        },
      ],
    },

    social: {
      feeds: [
        {
          id: '1',
          platform: 'twitter',
          thumbnailUrl: '',
          text: '딩글 폰 프로토타입 만드는 중... 새벽 3시인데 잠이 안 온다 🤯 남의 폰을 구경하는 경험, 이거 진짜 되겠다',
          likes: '47',
          timeAgo: '2시간 전',
          sourceUrl: '#',
        },
        {
          id: '2',
          platform: 'twitter',
          thumbnailUrl: '',
          text: '텀블벅 114명 서포터분들 정말 감사합니다 🥹 여러분이 없었으면 여기까지 못 왔어요',
          likes: '234',
          timeAgo: '3일 전',
          sourceUrl: '#',
        },
        {
          id: '3',
          platform: 'youtube',
          thumbnailUrl: '',
          text: '1인 개발자의 하루 브이로그 — 딩글 만드는 과정',
          likes: '1.2K',
          timeAgo: '1주 전',
          sourceUrl: '#',
        },
        {
          id: '4',
          platform: 'pinterest',
          thumbnailUrl: '',
          text: '딩글 폰 UI 레퍼런스 모음 — 파스텔 폰 꾸미기 영감',
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
        { date: '2026-02-18', title: '딩글 폰 프로토타입 완성', icon: '📱', color: '#E8915A' },
        { date: '2026-02-20', title: '트위터 공유 & 반응 측정', icon: '🐦', color: '#7AADE8' },
        { date: '2026-02-25', title: '지원사업 공고 확인', icon: '📋', color: '#9A7AE8' },
        { date: '2026-02-28', title: '사업계획서 초안 마감', icon: '📝', color: '#E87AAD' },
        { date: '2026-03-05', title: '지원사업 신청서 제출', icon: '🚀', color: '#5AAE80' },
        { date: '2026-03-10', title: '에디터 v1 개발 시작', icon: '⚒️', color: '#C8A830' },
      ],
    },

    notes: [
      {
        title: '🚀 딩글 폰 MVP 체크리스트',
        content: '☑ 잠금화면 → 홈 → 앱 구조\n☑ 6개 테마 시스템\n☑ localStorage 저장\n□ 방명록 Firebase 연동\n□ 앱스토어 리뷰 기능\n□ OG 이미지 제작\n□ 트위터 공유 테스트\n□ 사업계획서 완성',
        updatedAt: '2026.02.18',
      },
      {
        title: '💡 아이디어 메모',
        content: '• 닌텐도 DS 스킨 → 양쪽 화면!\n• 다마고치 스킨 → 레트로 감성\n• 친구 폰 연결 기능 → 네트워크 효과\n• 크리에이터 테마 마켓 → 수익화\n• 방명록에 이미지 첨부 → 팬아트 공유',
        updatedAt: '2026.02.17',
      },
      {
        title: '📊 유저 피드백 정리',
        content: '피드백 15개 분석:\n• 모바일 버전 원함: 5명 (33%)\n• 테마 더 많이: 3명 (20%)\n• 음악 실제 재생: 2명 (13%)\n• SNS 임베드: 2명\n• 공유 기능: 2명\n• 기타: 1명\n\n→ 우선순위: 모바일 > 테마 > 공유',
        updatedAt: '2026.02.15',
      },
      {
        title: '🎯 비즈니스 목표',
        content: '2026년 목표:\n• Q1: 프로토타입 + 지원사업\n• Q2: 에디터 오픈 + 유저 1000명\n• Q3: 크리에이터 마켓\n• Q4: 모바일 앱 출시\n\n꿈: 5만 구독자 × ₩10,000 = 월 5억\n현실: 일단 100명부터 모으자 ㅎㅎ',
        updatedAt: '2026.02.10',
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
        { id: '1', title: 'Vercel Pro 구독', amount: 20000, date: '2/01', comment: '배포 안정성을 위해...', emoji: '🖥️' },
        { id: '2', title: '스타벅스 아메리카노', amount: 4500, date: '2/15', comment: '오늘도 여기서 코딩', emoji: '☕' },
        { id: '3', title: '두쫀쿠 딸기세트', amount: 12800, date: '2/14', comment: '12시간 코딩 후 보상', emoji: '🍰' },
        { id: '4', title: 'Firebase 비용', amount: 15000, date: '2/01', comment: '방명록 때문에 늘었다', emoji: '🔥' },
        { id: '5', title: '리액트 강의', amount: 35000, date: '2/10', comment: 'Next.js 14 마스터 클래스', emoji: '📚' },
        { id: '6', title: '도메인 dingle.kr', amount: 22000, date: '2/01', comment: '1년치 선결제', emoji: '🌐' },
      ],
      monthlyQuote: '서버비는 투자, 디저트는 연료 🍰⚡',
    },

    wishlistShop: {
      items: [
        { id: '1', name: '맥북 프로 M4', price: 2990000, emoji: '💻', memo: '지원사업 되면 첫 구매...', status: 'wish', sourceUrl: '#' },
        { id: '2', name: '에어팟 맥스', price: 769000, emoji: '🎧', memo: '코딩할 때 노이즈캔슬링 필수', status: 'wish', sourceUrl: '#' },
        { id: '3', name: '스탠딩 데스크', price: 450000, emoji: '🪑', memo: '허리가 안 좋아지고 있다', status: 'wish', sourceUrl: '#' },
        { id: '4', name: 'React 공식 문서 (종이책)', price: 45000, emoji: '📘', memo: '전자책보다 종이가 좋아', status: 'bought', sourceUrl: '#' },
        { id: '5', name: '커피 그라인더', price: 89000, emoji: '☕', memo: '집에서도 카페 커피를', status: 'wish', sourceUrl: '#' },
      ],
    },

    messages: [
      { from: '🧑‍💻 개발자 친구', time: '오후 3:00', preview: '딩글 폰 봤어! 이거 미쳤다 ㅋㅋ', unread: true },
      { from: '📋 텀블벅 알림', time: '오전 11:00', preview: '새로운 서포터가 참여했습니다!', unread: true },
      { from: '☕ 카페 단골 사장님', time: '어제', preview: '오늘도 올 거죠? 자리 남겨둘게요', unread: false },
    ],

    guestbook: {
      initialEntries: [
        { id: 'g0', author: 'dev_fan_01', message: '딩글 폰 컨셉 너무 좋아요!! 🤩', timeAgo: '1시간 전', isOwner: false },
        { id: 'g1', author: '빙글', message: '감사합니다! 열심히 만들고 있어요 💪', timeAgo: '30분 전', isOwner: true },
        { id: 'g2', author: 'cute_phone', message: '산리오 테마 최고 ㅠㅠ 나도 만들고싶다', timeAgo: '2시간 전', isOwner: false },
        { id: 'g3', author: 'kpop_lover', message: 'K-pop 테마로 내 최애 폰 만들었어요!!', timeAgo: '3시간 전', isOwner: false },
        { id: 'g4', author: '빙글', message: '다들 예쁘게 만들어주셔서 감동 🥹', timeAgo: '2시간 전', isOwner: true },
      ],
    },

    search: {
      recentLinks: [
        { title: '딩글 텀블벅 페이지', url: '#', emoji: '🎯' },
        { title: 'Next.js 14 공식 문서', url: 'https://nextjs.org/docs', emoji: '📘' },
        { title: 'Tailwind CSS 치트시트', url: 'https://tailwindcss.com', emoji: '🎨' },
        { title: 'Firebase 콘솔', url: 'https://console.firebase.google.com', emoji: '🔥' },
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
        { id: 'r1', author: 'dev_fan', rating: 5, comment: '딩글 폰 프로토타입 너무 잘 만들었어요!', timeAgo: '1일 전' },
        { id: 'r2', author: 'ux_lover', rating: 5, comment: '테마 시스템 진짜 좋아요 🎀', timeAgo: '2일 전' },
        { id: 'r3', author: 'startup_guy', rating: 4, comment: '지원사업 같이 준비해요!', timeAgo: '3일 전' },
      ],
    },
  },

  homeScreen: {
    widgets: [
      {
        type: 'info',
        lines: ['📱 딩글 폰 프로토타입 공개!', '🎵 Ditto — NewJeans ♪'],
      },
    ],
    appLayout: [
      // 사진첩 위젯 (다마고치 프레임) — 2x2
      { id: 'w-photos', icon: '📸', name: '사진첩', iconBg: '#FFF3EB', customIconUrl: '/coconut.png', type: 'widget', appId: 'photos', widgetFrame: 'tamagotchi', widgetSpan: { cols: 2, rows: 2 } },
      // 기본 아이콘
      { id: 'calendar', icon: '📅', name: '캘린더', badge: 3, iconBg: '#F3EBFF' },
      { id: 'music', icon: '🎵', name: '음악', iconBg: '#EBFFF3' },
      { id: 'notes', icon: '📝', name: '메모', iconBg: '#FFFCEB' },
      { id: 'social', icon: '🌐', name: 'SNS', iconBg: '#FFEBF3' },
      { id: 'map', icon: '📍', name: '지도', iconBg: '#EBF3FF' },
      { id: 'wishlist', icon: '🛍️', name: '위시', iconBg: '#FFF0EB', customIconUrl: '/cup.webp' },
      { id: 'expenses', icon: '💰', name: '가계부', iconBg: '#F0FFEB' },
      { id: 'messages', icon: '💬', name: '메시지', badge: 2, iconBg: '#FFEBEB' },
      { id: 'guestbook', icon: '💌', name: '방명록', iconBg: '#FFE8E8' },
      { id: 'settings', icon: '⚙️', name: '설정', iconBg: '#F2F0ED' },
      { id: 'appstore', icon: '🏪', name: '스토어', iconBg: '#EBF0FF' },
    ],
    dock: [
      { id: 'photos', icon: '📸', name: '사진첩', iconBg: '#FFF3EB', customIconUrl: '/coconut.png' },
      { id: 'music', icon: '🎵', name: '음악', iconBg: '#EBFFF3' },
      { id: 'guestbook', icon: '💌', name: '방명록', iconBg: '#FFE8E8' },
      { id: 'appstore', icon: '🏪', name: '스토어', iconBg: '#EBF0FF' },
    ],
  },
};
