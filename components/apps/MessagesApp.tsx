import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send, Flag, Sparkles, MessageCircle } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { addDocument, subscribeToCollection, updateDocument } from '../../lib/firebase';
import { containsBadWords } from '../../lib/moderation';

interface CommunityPost {
  id: string;
  nickname: string;
  content: string;
  timeAgo: string;
  reported?: boolean;
  hidden?: boolean;
}

interface MessagesAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const MessagesApp: React.FC<MessagesAppProps> = ({ data, onClose }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newNickname, setNewNickname] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCollection('community_posts', (items) => {
      setPosts(
        items
          .filter((item) => !item.hidden)
          .map((item) => ({
            id: item.id,
            nickname: item.nickname ?? '익명',
            content: item.content ?? '',
            timeAgo: item.timeAgo ?? '방금 전',
            reported: item.reported ?? false,
            hidden: item.hidden ?? false,
          }))
          .reverse(), // 최신순으로
      );
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!newContent.trim()) return;

    const nickname = newNickname.trim() || '익명';
    const content = newContent.trim();

    if (containsBadWords(nickname) || containsBadWords(content)) {
      alert('부적절한 내용이 포함되어 있어요. 다시 작성해주세요.');
      return;
    }

    setIsSending(true);
    try {
      await addDocument('community_posts', {
        nickname,
        content,
        reported: false,
        hidden: false,
      });
      setNewContent('');
      setNewNickname('');
      setShowForm(false);
    } catch (err) {
      console.error('게시물 저장 실패:', err);
    }
    setIsSending(false);
  };

  const handleReport = async (postId: string) => {
    if (!confirm('이 게시물을 신고하시겠어요?')) return;
    try {
      await updateDocument('community_posts', postId, { reported: true });
    } catch (err) {
      console.error('신고 실패:', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      {/* Header */}
      <div className="pt-[54px] pb-2 px-6 flex items-center justify-between sticky top-0 bg-cream-100/95 backdrop-blur-xl z-10">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          <div>
            <span className="text-base font-semibold text-ink">폰 꾸미기 게시판</span>
            <p className="text-[10px] text-ink-tertiary">나의 폰 꾸미기를 자랑해보세요!</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          <Sparkles size={16} />
        </button>
      </div>

      {/* Write Form */}
      {showForm && (
        <div className="px-4 pb-4">
          <div className="bg-cream-50 rounded-xl border border-dingle/15 p-4 shadow-card space-y-3">
            <div className="text-xs font-bold text-ink-secondary mb-1">✏️ 새 글 작성</div>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="닉네임 (선택)"
              className="w-full bg-cream-200 rounded-lg px-3 py-2 text-sm outline-none border border-cream-300 focus:border-dingle transition-colors text-ink placeholder:text-ink-tertiary"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="나만의 폰 꾸미기를 공유해보세요! 어떤 테마, 아이콘, 배경화면을 사용하셨나요?"
              rows={4}
              className="w-full bg-cream-200 rounded-lg px-3 py-2 text-sm outline-none border border-cream-300 focus:border-dingle transition-colors text-ink placeholder:text-ink-tertiary resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowForm(false); setNewContent(''); setNewNickname(''); }}
                className="flex-1 py-2 rounded-xl bg-cream-200 text-ink-secondary text-sm font-bold"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSending || !newContent.trim()}
                className="flex-1 py-2 rounded-xl bg-dingle text-white text-sm font-bold flex items-center justify-center gap-1 disabled:opacity-50"
              >
                <Send size={14} />
                {isSending ? '게시중...' : '게시하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8 space-y-3">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-ink-tertiary py-20">
            <MessageCircle size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">아직 게시물이 없어요</p>
            <p className="text-xs mt-1">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-cream-50 rounded-xl p-4 border border-cream-300 shadow-sm"
            >
              {/* Author & Time */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-dingle-light flex items-center justify-center text-[11px] font-bold text-dingle-dark border border-dingle/15 uppercase">
                    {post.nickname[0]}
                  </div>
                  <span className="text-sm font-bold text-ink">{post.nickname}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-ink-tertiary">{post.timeAgo}</span>
                  <button
                    onClick={() => handleReport(post.id)}
                    className="text-ink-tertiary hover:text-red-400 transition-colors"
                    title="신고"
                  >
                    <Flag size={11} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-ink-secondary leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
