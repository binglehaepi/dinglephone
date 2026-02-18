// ── 콘텐츠 관리 유틸리티 ──

// 관리자 비밀번호 (실서비스에서는 서버 사이드로 이동 필요)
export const ADMIN_PASSWORD = 'dingle-admin-2026';

// ── 금지어 목록 (한국어 + 영어 기본) ──
const BANNED_WORDS: string[] = [
  // 한국어 욕설
  '시발', '씨발', '씨팔', '시팔', '씹', '좆', '지랄', '병신', '미친놈', '미친년',
  '개새끼', '개세끼', '개씨', '꺼져', '닥쳐', '느금마', '느금', '엠창',
  '쌍놈', '쌍년', '후레', '창녀', '보지', '자지',
  // 영어 욕설
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'nigger', 'faggot',
  'bastard', 'slut', 'whore', 'cunt',
  // 음란 관련
  '야동', '포르노', 'porn', 'xxx', 'sex',
];

/**
 * 텍스트에 금지어가 포함되어 있는지 검사
 */
export function containsBadWords(text: string): boolean {
  const lower = text.toLowerCase().replace(/\s/g, '');
  return BANNED_WORDS.some((word) => lower.includes(word.toLowerCase()));
}

/**
 * 텍스트에서 금지어를 ***로 마스킹
 */
export function maskBadWords(text: string): string {
  let result = text;
  BANNED_WORDS.forEach((word) => {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, '*'.repeat(word.length));
  });
  return result;
}
