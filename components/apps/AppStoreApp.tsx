import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send, Star, Bell, CheckCircle, Flag } from 'lucide-react';
import { DinglePhoneData, ReviewItem } from '../../types';
import { addDocument, subscribeToCollection, updateDocument } from '../../lib/firebase';
import { containsBadWords } from '../../lib/moderation';

interface AppStoreAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const AppStoreApp: React.FC<AppStoreAppProps> = ({ data, onClose }) => {
  const [firebaseReviews, setFirebaseReviews] = useState<ReviewItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [waitlistDone, setWaitlistDone] = useState(false);

  const demoReviews = data.apps.appStore.reviews;

  useEffect(() => {
    const unsubscribe = subscribeToCollection('reviews', (items) => {
      setFirebaseReviews(
        items
          .filter((item) => !item.hidden)
          .map((item) => ({
            id: item.id,
            author: item.author ?? 'visitor',
            rating: item.rating ?? 5,
            comment: item.comment ?? '',
            timeAgo: item.timeAgo ?? '방금 전',
          })),
      );
    });
    return () => unsubscribe();
  }, []);

  const allReviews = [...demoReviews, ...firebaseReviews];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (containsBadWords(newComment)) {
      alert('부적절한 내용이 포함되어 있어요. 다시 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDocument('reviews', {
        author: 'visitor',
        rating: newRating,
        comment: newComment,
        reported: false,
        hidden: false,
      });
    } catch (err) {
      console.error('리뷰 저장 실패:', err);
    }
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleReport = async (reviewId: string) => {
    if (!confirm('이 리뷰를 신고하시겠어요?')) return;
    try {
      await updateDocument('reviews', reviewId, { reported: true });
    } catch (err) {
      console.error('신고 실패:', err);
    }
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    setIsWaitlistSubmitting(true);
    try {
      await addDocument('waitlist', {
        email: waitlistEmail,
      });
      setWaitlistDone(true);
      setWaitlistEmail('');
    } catch (err) {
      console.error('대기 리스트 등록 실패:', err);
    }
    setIsWaitlistSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-cream-100/95 backdrop-blur-xl z-10 border-b border-cream-300">
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        <span className="text-base font-semibold text-ink">스토어</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
         {/* App Header - 코코넛 이미지 로고 */}
         <div className="p-6 pb-8 border-b border-cream-300">
             <div className="flex gap-4 mb-6">
                 <div className="w-24 h-24 rounded-dingle bg-cream-50 border border-cream-300 flex items-center justify-center shadow-card overflow-hidden">
                    <img src="/coconut.png" alt="Dingle Phone" className="w-full h-full object-contain p-1" />
                 </div>
                 <div className="flex-1 py-1">
                     <h1 className="text-xl font-bold mb-1 text-ink">Dingle Phone</h1>
                     <p className="text-sm text-ink-secondary mb-3">빙글빙글 딩글딩글 🥥</p>
                     <div className="flex gap-2">
                         <span className="bg-cream-200 text-ink-tertiary text-[10px] px-2 py-1 rounded-md border border-cream-300">
                             Character
                         </span>
                         <span className="bg-cream-200 text-ink-tertiary text-[10px] px-2 py-1 rounded-md border border-cream-300">
                             Lifestyle
                         </span>
                     </div>
                 </div>
             </div>

             <div className="flex justify-between items-center bg-cream-50 p-4 rounded-xl border border-cream-300">
                 <div className="text-center flex-1 border-r border-cream-300">
                     <div className="text-xs text-ink-tertiary font-bold mb-1">RATING</div>
                     <div className="font-display font-bold text-lg text-ink">4.9</div>
                 </div>
                 <div className="text-center flex-1 border-r border-cream-300">
                     <div className="text-xs text-ink-tertiary font-bold mb-1">AGE</div>
                     <div className="font-display font-bold text-lg text-ink">4+</div>
                 </div>
                 <div className="text-center flex-1">
                     <div className="text-xs text-ink-tertiary font-bold mb-1">DEVELOPER</div>
                     <div className="font-display font-bold text-sm text-ink">Dingle</div>
                 </div>
             </div>
         </div>

         {/* Features */}
         <div className="p-6 border-b border-cream-300">
             <h2 className="font-bold mb-3 text-ink">새로운 기능</h2>
             <div className="text-sm text-ink-secondary space-y-1">
                 <p>✅ 딩글 캐릭터 사진첩</p>
                 <p>✅ SNS 피드 (트위터/유튜브/텀블벅)</p>
                 <p>✅ 방명록 & 리뷰</p>
                 <p className="text-dingle">🔜 테마 커스텀 (준비중)</p>
             </div>
         </div>

         {/* Reviews */}
         <div className="p-6 border-b border-cream-300">
             <h2 className="font-bold mb-4 flex items-center justify-between text-ink">
                 <span>평가 및 리뷰</span>
                 <button className="text-dingle text-sm">모두 보기</button>
             </h2>
             
             {/* Review Form */}
             <form onSubmit={handleSubmit} className="bg-cream-200 p-4 rounded-xl mb-6 border border-dingle/10">
                 <div className="flex justify-between items-center mb-3">
                     <span className="text-xs font-bold text-ink-tertiary">의견 남기기</span>
                     <div className="flex gap-1">
                         {[1,2,3,4,5].map(s => (
                             <Star 
                                key={s} size={14} 
                                className={s <= newRating ? "fill-dingle text-dingle" : "text-cream-400"} 
                                onClick={() => setNewRating(s)}
                             />
                         ))}
                     </div>
                 </div>
                 <div className="flex gap-2">
                     <input 
                        className="flex-1 bg-cream-50 rounded-lg px-3 py-2 text-sm outline-none border border-cream-300 focus:border-dingle transition-colors text-ink placeholder:text-ink-tertiary"
                        placeholder="어떤 기능이 더 필요하신가요?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                     />
                     <button disabled={isSubmitting} className="bg-dingle text-white p-2 rounded-lg">
                         <Send size={16} />
                     </button>
                 </div>
             </form>

             <div className="space-y-4">
                 {allReviews.map((review) => (
                     <div key={review.id} className="bg-cream-50 p-4 rounded-dingle border border-cream-300 shadow-card">
                         <div className="flex justify-between items-center mb-2">
                             <span className="font-bold text-sm text-ink">{review.author}</span>
                             <div className="flex items-center gap-2">
                               <span className="text-[10px] text-ink-tertiary">{review.timeAgo}</span>
                               {!review.id.startsWith('r') && (
                                 <button
                                   onClick={() => handleReport(review.id)}
                                   className="text-ink-tertiary hover:text-red-400 transition-colors"
                                   title="신고"
                                 >
                                   <Flag size={11} />
                                 </button>
                               )}
                             </div>
                         </div>
                         <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className={i < review.rating ? "fill-dingle text-dingle" : "text-cream-400"} />
                            ))}
                         </div>
                         <p className="text-sm text-ink-secondary">{review.comment}</p>
                     </div>
                 ))}
             </div>
         </div>

         {/* Waitlist */}
         <div className="p-6">
             <div className="bg-gradient-to-r from-dingle/10 to-dingle-light p-5 rounded-dingle-lg border border-dingle/15">
                 <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 rounded-full bg-dingle/10 flex items-center justify-center">
                         <Bell size={18} className="text-dingle-dark" />
                     </div>
                     <div>
                         <h3 className="font-bold text-sm text-ink">새 기능 알림 받기</h3>
                         <p className="text-[11px] text-ink-tertiary">테마 커스텀 출시 시 가장 먼저 알려드려요!</p>
                     </div>
                 </div>

                 {waitlistDone ? (
                     <div className="flex items-center gap-2 bg-cream-50/80 p-3 rounded-xl text-sm">
                         <CheckCircle size={16} className="text-green-500" />
                         <span className="text-ink-secondary">등록 완료! 출시되면 알려드릴게요 💌</span>
                     </div>
                 ) : (
                     <form onSubmit={handleWaitlist} className="flex gap-2">
                         <input
                             type="email"
                             required
                             className="flex-1 bg-cream-50 rounded-xl px-3 py-2.5 text-sm outline-none border border-dingle/10 focus:border-dingle/30 transition-colors text-ink placeholder:text-ink-tertiary"
                             placeholder="이메일을 입력하세요"
                             value={waitlistEmail}
                             onChange={(e) => setWaitlistEmail(e.target.value)}
                         />
                         <button
                             type="submit"
                             disabled={isWaitlistSubmitting}
                             className="bg-dingle text-white px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap shadow-sm active:scale-95 transition-transform disabled:opacity-50"
                         >
                             {isWaitlistSubmitting ? '...' : '신청'}
                         </button>
                     </form>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
};
