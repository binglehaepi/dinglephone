import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send, MoreVertical } from 'lucide-react';
import { DinglePhoneData, GuestbookEntry } from '../../types';
import { addDocument, subscribeToCollection } from '../../lib/firebase';

interface GuestbookAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const GuestbookApp: React.FC<GuestbookAppProps> = ({ data, onClose }) => {
  const [firebaseEntries, setFirebaseEntries] = useState<GuestbookEntry[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // 데모 데이터 (기본 표시용)
  const demoEntries = data.apps.guestbook.entries;

  // Firestore 실시간 구독
  useEffect(() => {
    const unsubscribe = subscribeToCollection('guestbook', (items) => {
      setFirebaseEntries(
        items.map((item) => ({
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

  // 데모 + Firestore 합산
  const allEntries = [...demoEntries, ...firebaseEntries];

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      await addDocument('guestbook', {
        author: 'visitor',
        message: newMessage,
        isOwner: false,
      });
    } catch (err) {
      console.error('방명록 저장 실패:', err);
    }
    setNewMessage('');
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#E5E5E5] text-text-primary relative">
      {/* Chat Header */}
      <div className="pt-[54px] pb-3 px-4 flex items-center gap-3 bg-white/90 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <button onClick={onClose} className="text-text-primary">
          <ChevronLeft size={26} />
        </button>
        <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-xl border border-white">
            {data.owner.emoji}
        </div>
        <div className="flex-1">
            <div className="font-bold text-sm">{data.owner.name}의 방명록</div>
            <div className="text-xs text-text-tertiary">방문자 {allEntries.length}명 ♡</div>
        </div>
        <button className="text-text-tertiary">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-[#F2F4F6] pb-20">
         <div className="text-center text-[10px] text-text-tertiary my-4 bg-white/50 py-1 px-3 rounded-full mx-auto w-fit">
            오늘
         </div>

         {allEntries.map((entry, i) => (
             <div key={entry.id ?? i} className={`flex flex-col ${entry.isOwner ? 'items-start' : 'items-end'}`}>
                 <div className={`flex gap-2 max-w-[80%] ${entry.isOwner ? 'flex-row' : 'flex-row-reverse'}`}>
                     {!entry.isOwner && (
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs border border-gray-100 shadow-sm shrink-0 uppercase font-bold text-accent">
                             {entry.author[0]}
                         </div>
                     )}
                     {entry.isOwner && (
                         <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-sm border border-white shadow-sm shrink-0">
                             {data.owner.emoji}
                         </div>
                     )}
                     
                     <div className={`flex flex-col ${entry.isOwner ? 'items-start' : 'items-end'}`}>
                         <div className="text-[10px] text-text-secondary mb-1 px-1">{entry.author}</div>
                         <div 
                            className={`px-4 py-2.5 rounded-[18px] text-sm shadow-sm border border-transparent ${
                                entry.isOwner 
                                ? 'bg-white text-text-primary rounded-tl-none border-gray-100' 
                                : 'bg-accent-light text-text-primary rounded-tr-none border-accent/10'
                            }`}
                         >
                             {entry.message}
                         </div>
                         <div className="text-[9px] text-text-tertiary mt-1 px-1">{entry.timeAgo}</div>
                     </div>
                 </div>
             </div>
         ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-white px-4 py-3 pb-8 border-t border-gray-100">
         <div className="flex items-center gap-2 bg-[#F2F4F6] px-4 py-2.5 rounded-full">
            <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="방명록을 남겨주세요..." 
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-text-tertiary"
            />
            <button 
                onClick={handleSend}
                disabled={isSending}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-all
                    ${newMessage.trim() ? 'bg-accent scale-100' : 'bg-gray-300 scale-90'}`}
            >
                <Send size={14} />
            </button>
         </div>
      </div>
    </div>
  );
};
