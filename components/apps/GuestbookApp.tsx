import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send, MoreVertical, Pin, Flag } from 'lucide-react';
import { DinglePhoneData, GuestbookEntry } from '../../types';
import { addDocument, subscribeToCollection, updateDocument } from '../../lib/firebase';
import { containsBadWords } from '../../lib/moderation';
import { useTheme } from '../../context/ThemeContext';

interface GuestbookAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const GuestbookApp: React.FC<GuestbookAppProps> = ({ data, onClose }) => {
  const { theme } = useTheme();
  const [firebaseEntries, setFirebaseEntries] = useState<GuestbookEntry[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const demoEntries = data.apps.guestbook.entries;

  useEffect(() => {
    const unsubscribe = subscribeToCollection('guestbook', (items) => {
      setFirebaseEntries(
        items
          .filter((item) => !item.hidden) // 숨김 처리된 항목 제외
          .map((item) => ({
            id: item.id,
            author: item.author ?? 'visitor',
            message: item.message ?? '',
            timeAgo: item.timeAgo ?? '방금 전',
            isOwner: item.isOwner ?? false,
          })),
      );
    });
    return () => unsubscribe();
  }, []);

  const allEntries = [...demoEntries, ...firebaseEntries];

  // 고정 메시지 (첫 번째 isOwner 엔트리) 분리
  const pinnedEntry = allEntries.find(e => e.id === 'g0');
  const chatEntries = allEntries.filter(e => e.id !== 'g0');

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    if (containsBadWords(newMessage)) {
      alert('부적절한 내용이 포함되어 있어요. 다시 작성해주세요.');
      return;
    }

    setIsSending(true);
    try {
      await addDocument('guestbook', {
        author: 'visitor',
        message: newMessage,
        isOwner: false,
        reported: false,
        hidden: false,
      });
    } catch (err) {
      console.error('방명록 저장 실패:', err);
    }
    setNewMessage('');
    setIsSending(false);
  };

  const handleReport = async (entryId: string) => {
    if (!confirm('이 메시지를 신고하시겠어요?')) return;
    try {
      await updateDocument('guestbook', entryId, { reported: true });
    } catch (err) {
      console.error('신고 실패:', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-cream-200 text-ink relative">
      {/* Chat Header */}
      <div className="pt-[54px] pb-3 px-4 flex items-center gap-3 bg-cream-50/90 backdrop-blur-md sticky top-0 z-20 shadow-card border-b border-cream-300">
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        {/* 코코넛 프로필 이미지 */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-dingle-light flex items-center justify-center border border-cream-300">
            <img src="/coconut.png" alt="dinglephone" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
            <div className="font-bold text-sm text-ink">dinglephone</div>
            <div className="text-xs text-ink-tertiary">방문자 {allEntries.length}명 ♡</div>
        </div>
        <button className="text-ink-tertiary">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-cream-100 pb-20">
         {/* 고정 메시지 */}
         {pinnedEntry && (
           <div className="bg-dingle-light/60 border border-dingle/15 rounded-dingle p-4 mb-2 relative">
              <div className="flex items-center gap-2 mb-2">
                <Pin size={12} className="text-dingle-dark" />
                <span className="text-[10px] font-bold text-dingle-dark">고정된 메시지</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-cream-50 border border-cream-300 shrink-0">
                    <img src="/coconut.png" alt="dinglephone" className="w-full h-full object-contain" />
                </div>
                <div>
                    <div className="text-[11px] text-dingle-dark font-bold mb-1">dinglephone</div>
                    <div className="text-sm text-ink leading-relaxed whitespace-pre-line">{pinnedEntry.message}</div>
                </div>
              </div>
           </div>
         )}

         <div className="text-center text-[10px] text-ink-tertiary my-4 bg-cream-50/80 py-1 px-3 rounded-full mx-auto w-fit">
            오늘
         </div>

         {chatEntries.map((entry, i) => (
             <div key={entry.id ?? i} className={`flex flex-col ${entry.isOwner ? 'items-start' : 'items-end'}`}>
                 <div className={`flex gap-2 max-w-[75%] ${entry.isOwner ? 'flex-row' : 'flex-row-reverse'}`}>
                     {!entry.isOwner && (
                         <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center text-xs border border-cream-300 shadow-sm shrink-0 uppercase font-bold text-dingle">
                             {entry.author[0]}
                         </div>
                     )}
                     {entry.isOwner && (
                         <div className="w-8 h-8 rounded-full overflow-hidden bg-dingle-light border border-cream-300 shadow-sm shrink-0">
                             <img src="/coconut.png" alt="dinglephone" className="w-full h-full object-contain" />
                         </div>
                     )}
                     
                     <div className={`flex flex-col ${entry.isOwner ? 'items-start' : 'items-end'}`}>
                         <div className="text-[11px] text-ink-tertiary mb-1 px-1">{entry.author}</div>
                         <div 
                            className="px-4 py-2.5 text-sm shadow-sm text-ink"
                            style={
                                entry.isOwner
                                ? {
                                    background: theme.guestbook.ownerBubble,
                                    border: `1px solid ${theme.guestbook.ownerBorder}`,
                                    borderRadius: '18px 18px 18px 4px',
                                  }
                                : {
                                    background: theme.guestbook.visitorBubble,
                                    border: `1px solid ${theme.guestbook.visitorBubble}`,
                                    borderRadius: '18px 18px 4px 18px',
                                  }
                            }
                         >
                             {entry.message}
                         </div>
                         <div className="flex items-center gap-1 mt-1 px-1">
                           <span className="text-[9px] text-ink-tertiary">{entry.timeAgo}</span>
                           {!entry.isOwner && !entry.id.startsWith('g') && (
                             <button
                               onClick={() => handleReport(entry.id)}
                               className="text-ink-tertiary hover:text-red-400 transition-colors ml-1"
                               title="신고"
                             >
                               <Flag size={9} />
                             </button>
                           )}
                         </div>
                     </div>
                 </div>
             </div>
         ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-cream-50 px-4 py-3 pb-8 border-t border-cream-300">
         <div className="flex items-center gap-2 bg-cream-200 px-4 py-2.5 rounded-full border border-cream-300 focus-within:border-dingle focus-within:ring-1 focus-within:ring-dingle/20 transition-colors">
            <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="방명록을 남겨주세요..." 
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-ink-tertiary text-ink"
            />
            <button 
                onClick={handleSend}
                disabled={isSending}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-all
                    ${newMessage.trim() ? 'bg-dingle scale-100' : 'bg-cream-400 scale-90'}`}
            >
                <Send size={14} />
            </button>
         </div>
      </div>
    </div>
  );
};
