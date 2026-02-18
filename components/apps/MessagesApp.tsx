import React from 'react';
import { ChevronLeft, Edit } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface MessagesAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const MessagesApp: React.FC<MessagesAppProps> = ({ data, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-white text-text-primary">
      {/* Header */}
      <div className="pt-[54px] pb-2 px-6 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
            <ChevronLeft size={24} />
            </button>
            <span className="text-[20px] font-bold">메시지</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-text-primary">
            <Edit size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
         {data.apps.messages.map((msg, i) => (
             <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 active:bg-gray-50">
                 <div className="w-12 h-12 rounded-full bg-sub-pink flex items-center justify-center text-xl shrink-0">
                    {i === 0 ? "🍰" : i === 1 ? "☕" : "🎂"}
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-baseline mb-0.5">
                         <span className="font-bold text-[15px] text-text-primary truncate">{msg.from}</span>
                         <span className={`text-[12px] ${msg.unread ? 'text-accent font-bold' : 'text-text-tertiary'}`}>{msg.time}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className={`text-[14px] truncate ${msg.unread ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                            {msg.preview}
                        </span>
                        {msg.unread && (
                            <div className="w-2 h-2 rounded-full bg-accent shrink-0 ml-2"></div>
                        )}
                     </div>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};