import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send, Star, Bell, CheckCircle } from 'lucide-react';
import { DinglePhoneData, ReviewItem } from '../../types';
import { addDocument, subscribeToCollection } from '../../lib/firebase';

interface AppStoreAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const AppStoreApp: React.FC<AppStoreAppProps> = ({ data, onClose }) => {
  const [firebaseReviews, setFirebaseReviews] = useState<ReviewItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 대기 리스트 상태
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [waitlistDone, setWaitlistDone] = useState(false);

  // 데모 리뷰 (기본 표시용)
  const demoReviews = data.apps.appStore.reviews;

  // Firestore 실시간 구독 - 리뷰
  useEffect(() => {
    const unsubscribe = subscribeToCollection('reviews', (items) => {
      setFirebaseReviews(
        items.map((item) => ({
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

  // 데모 + Firestore 합산
  const allReviews = [...demoReviews, ...firebaseReviews];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDocument('reviews', {
        author: 'visitor',
        rating: newRating,
        comment: newComment,
      });
    } catch (err) {
      console.error('리뷰 저장 실패:', err);
    }
    setNewComment('');
    setIsSubmitting(false);
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
    <div className="flex flex-col h-full bg-white text-text-primary">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-50">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">스토어</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
         {/* App Header */}
         <div className="p-6 pb-8 border-b border-gray-100">
             <div className="flex gap-4 mb-6">
                 <div className="w-24 h-24 rounded-[20px] bg-accent-light border border-accent/20 flex items-center justify-center text-4xl shadow-sm">
                    🧁
                 </div>
                 <div className="flex-1 py-1">
                     <h1 className="text-xl font-bold mb-1">Dingle Phone</h1>
                     <p className="text-sm text-text-secondary mb-3">나만의 덕질 폰 꾸미기</p>
                     <div className="flex gap-2">
                         <span className="bg-bg-secondary text-text-tertiary text-[10px] px-2 py-1 rounded-md border border-gray-200">
                             Entertainment
                         </span>
                         <span className="bg-bg-secondary text-text-tertiary text-[10px] px-2 py-1 rounded-md border border-gray-200">
                             Lifestyle
                         </span>
                     </div>
                 </div>
             </div>

             <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                 <div className="text-center flex-1 border-r border-gray-200">
                     <div className="text-xs text-text-tertiary font-bold mb-1">RATING</div>
                     <div className="font-display font-bold text-lg">4.9</div>
                 </div>
                 <div className="text-center flex-1 border-r border-gray-200">
                     <div className="text-xs text-text-tertiary font-bold mb-1">AGE</div>
                     <div className="font-display font-bold text-lg">4+</div>
                 </div>
                 <div className="text-center flex-1">
                     <div className="text-xs text-text-tertiary font-bold mb-1">DEVELOPER</div>
                     <div className="font-display font-bold text-sm">Dingle</div>
                 </div>
             </div>
         </div>

         {/* Features */}
         <div className="p-6 border-b border-gray-100">
             <h2 className="font-bold mb-3">새로운 기능</h2>
             <div className="text-sm text-text-secondary space-y-1">
                 <p>✅ 사진첩, 음악, 캘린더 기능</p>
                 <p>✅ SNS 피드 모아보기</p>
                 <p>✅ 방명록 주고받기</p>
                 <p className="text-accent">🔜 테마 커스텀 (준비중)</p>
             </div>
         </div>

         {/* Reviews */}
         <div className="p-6 border-b border-gray-100">
             <h2 className="font-bold mb-4 flex items-center justify-between">
                 <span>평가 및 리뷰</span>
                 <button className="text-accent text-sm">모두 보기</button>
             </h2>
             
             {/* Review Form */}
             <form onSubmit={handleSubmit} className="bg-bg-secondary p-4 rounded-xl mb-6 border border-accent/10">
                 <div className="flex justify-between items-center mb-3">
                     <span className="text-xs font-bold text-text-tertiary">의견 남기기</span>
                     <div className="flex gap-1">
                         {[1,2,3,4,5].map(s => (
                             <Star 
                                key={s} size={14} 
                                className={s <= newRating ? "fill-accent text-accent" : "text-gray-300"} 
                                onClick={() => setNewRating(s)}
                             />
                         ))}
                     </div>
                 </div>
                 <div className="flex gap-2">
                     <input 
                        className="flex-1 bg-white rounded-lg px-3 py-2 text-sm outline-none"
                        placeholder="어떤 기능이 더 필요하신가요?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                     />
                     <button disabled={isSubmitting} className="bg-accent text-white p-2 rounded-lg">
                         <Send size={16} />
                     </button>
                 </div>
             </form>

             <div className="space-y-4">
                 {allReviews.map((review) => (
                     <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                         <div className="flex justify-between items-center mb-2">
                             <span className="font-bold text-sm">{review.author}</span>
                             <span className="text-[10px] text-text-tertiary">{review.timeAgo}</span>
                         </div>
                         <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className={i < review.rating ? "fill-accent text-accent" : "text-gray-300"} />
                            ))}
                         </div>
                         <p className="text-sm text-text-secondary">{review.comment}</p>
                     </div>
                 ))}
             </div>
         </div>

         {/* Waitlist / 알림 신청 */}
         <div className="p-6">
             <div className="bg-gradient-to-br from-accent-light to-white p-5 rounded-2xl border border-accent/15">
                 <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                         <Bell size={18} className="text-accent-dark" />
                     </div>
                     <div>
                         <h3 className="font-bold text-sm">새 기능 알림 받기</h3>
                         <p className="text-[11px] text-text-tertiary">테마 커스텀 출시 시 가장 먼저 알려드려요!</p>
                     </div>
                 </div>

                 {waitlistDone ? (
                     <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl text-sm">
                         <CheckCircle size={16} className="text-green-500" />
                         <span className="text-text-secondary">등록 완료! 출시되면 알려드릴게요 💌</span>
                     </div>
                 ) : (
                     <form onSubmit={handleWaitlist} className="flex gap-2">
                         <input
                             type="email"
                             required
                             className="flex-1 bg-white rounded-xl px-3 py-2.5 text-sm outline-none border border-accent/10 focus:border-accent/30 transition-colors"
                             placeholder="이메일을 입력하세요"
                             value={waitlistEmail}
                             onChange={(e) => setWaitlistEmail(e.target.value)}
                         />
                         <button
                             type="submit"
                             disabled={isWaitlistSubmitting}
                             className="bg-accent text-white px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap shadow-sm active:scale-95 transition-transform disabled:opacity-50"
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
