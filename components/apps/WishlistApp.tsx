import React from 'react';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface WishlistAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const WishlistApp: React.FC<WishlistAppProps> = ({ data, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-white text-text-primary">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-50">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">위시리스트</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
         <div className="text-center pb-2">
             <span className="text-xs font-bold text-accent tracking-widest border border-accent/30 px-3 py-1 rounded-full">SHOPPING LIST ♡</span>
         </div>

         {data.apps.wishlistShop.items.map((item) => (
             <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-dashed border-gray-100 last:border-0">
                 <div className="w-24 h-24 rounded-[16px] bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                     {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center text-3xl">{item.emoji}</div>
                     )}
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-1">
                         <h3 className="font-bold text-[15px] truncate pr-2">{item.name}</h3>
                         <span className="text-[10px] text-text-tertiary border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                            Link <ExternalLink size={8} />
                         </span>
                     </div>
                     <div className="text-sm font-display font-bold text-text-primary mb-2">₩{item.price.toLocaleString()}</div>
                     
                     <div className="text-xs text-text-secondary bg-bg-secondary p-2 rounded-lg mb-2">
                         "{item.memo}"
                     </div>

                     <div className={`text-[10px] font-bold inline-block px-2 py-1 rounded-md
                        ${item.status === 'bought' ? 'bg-green-100 text-green-600' :
                          item.status === 'gifted' ? 'bg-purple-100 text-purple-600' :
                          'bg-pink-100 text-pink-600'}`}>
                        {item.status === 'bought' ? '🛒 구매완료' :
                         item.status === 'gifted' ? '🎁 선물받음' : '♡ 찜!'}
                     </div>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};