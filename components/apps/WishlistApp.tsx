import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface WishlistAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const WishlistApp: React.FC<WishlistAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newEmoji, setNewEmoji] = useState('🎁');
  const [newMemo, setNewMemo] = useState('');
  const [newStatus, setNewStatus] = useState<'wish' | 'bought' | 'gifted'>('wish');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !currentPhone) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: newName,
      price: parseInt(newPrice) || 0,
      emoji: newEmoji || '🎁',
      memo: newMemo,
      status: newStatus,
      sourceUrl: newSourceUrl || '#',
      imageUrl: newImageUrl || undefined,
    };
    const updated = {
      items: [...currentPhone.apps.wishlistShop.items, newItem],
    };
    updateAppData('wishlistShop', updated);
    setShowAdd(false);
    setNewName('');
    setNewPrice('');
    setNewEmoji('🎁');
    setNewMemo('');
    setNewStatus('wish');
    setNewSourceUrl('');
    setNewImageUrl('');
  };

  const handleDelete = (id: string) => {
    if (!currentPhone) return;
    const updated = {
      items: currentPhone.apps.wishlistShop.items.filter(item => item.id !== id),
    };
    updateAppData('wishlistShop', updated);
  };

  const handleToggleStatus = (id: string) => {
    if (!currentPhone || !isEditable) return;
    const items = currentPhone.apps.wishlistShop.items.map(item => {
      if (item.id === id) {
        const nextStatus: 'wish' | 'bought' | 'gifted' = item.status === 'wish' ? 'bought' : item.status === 'bought' ? 'gifted' : 'wish';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    updateAppData('wishlistShop', { items });
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
       <div className="pt-[54px] pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-cream-100/95 backdrop-blur-xl">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        {isEditable && (
          <button
            onClick={() => setShowAdd(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10"
          >
            <Plus size={16} className="text-ink" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
         <div className="text-center pb-2">
             <span className="text-xs font-bold text-dingle tracking-widest border border-dingle/30 px-3 py-1 rounded-full">SHOPPING LIST ♡</span>
         </div>

         {data.apps.wishlistShop.items.length === 0 && isEditable && (
           <div className="text-center py-8">
             <p className="text-sm text-ink-tertiary">위시리스트를 추가해보세요</p>
           </div>
         )}

         {data.apps.wishlistShop.items.map((item) => (
             <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-dashed border-cream-300 last:border-0">
                 <div className="w-20 h-20 rounded-xl bg-cream-200 overflow-hidden shrink-0 border border-cream-300">
                     {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center text-3xl">{item.emoji}</div>
                     )}
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-1">
                         <h3 className="font-medium text-sm text-ink truncate pr-2">{item.name}</h3>
                         <div className="flex items-center gap-1.5">
                           {item.sourceUrl && item.sourceUrl !== '#' && (
                             <span className="text-[10px] text-ink-tertiary border border-cream-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                                Link <ExternalLink size={8} />
                             </span>
                           )}
                           {isEditable && (
                             <button
                               onClick={() => handleDelete(item.id)}
                               className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0"
                             >
                               <Trash2 size={10} className="text-red-400" />
                             </button>
                           )}
                         </div>
                     </div>
                     <div className="text-sm font-display font-semibold text-dingle mb-2">₩{item.price.toLocaleString()}</div>
                     
                     {item.memo && (
                       <div className="text-xs text-ink-secondary bg-cream-200 p-2 rounded-lg mb-2">
                           "{item.memo}"
                       </div>
                     )}

                     <button
                       onClick={() => handleToggleStatus(item.id)}
                       className={`text-[10px] font-bold inline-block px-2 py-1 rounded-full transition-colors
                        ${item.status === 'bought' ? 'bg-green-50 text-green-600' :
                          item.status === 'gifted' ? 'bg-purple-50 text-purple-600' :
                          'bg-dingle-light text-dingle-dark'}`}
                     >
                        {item.status === 'bought' ? '🛒 구매완료' :
                         item.status === 'gifted' ? '🎁 선물받음' : '♡ 찜!'}
                     </button>
                 </div>
             </div>
         ))}
      </div>

      {/* Add Wishlist Item Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="🎁 위시 아이템 추가">
        <DingleInput label="상품 링크 (선택)" value={newSourceUrl} onChange={setNewSourceUrl} placeholder="https://..." />
        <DingleInput label="이미지 URL (선택)" value={newImageUrl} onChange={setNewImageUrl} placeholder="https://example.com/product.jpg" />
        {newImageUrl && (
          <div className="mb-3 rounded-xl overflow-hidden border border-cream-300">
            <img
              src={newImageUrl}
              alt="product preview"
              className="w-full h-32 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <DingleInput label="이름" value={newName} onChange={setNewName} placeholder="맥북 프로" />
        <DingleInput label="가격" value={newPrice} onChange={setNewPrice} placeholder="1000000" type="number" />
        <DingleInput label="이모지 (이미지 없을 때)" value={newEmoji} onChange={setNewEmoji} placeholder="🎁" />
        <DingleInput label="메모" value={newMemo} onChange={setNewMemo} placeholder="언젠간 살 거야..." />
        <div className="mb-3">
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>상태</label>
          <div className="flex gap-2">
            {(['wish', 'bought', 'gifted'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setNewStatus(s)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                  newStatus === s
                    ? 'text-white'
                    : 'bg-cream-200 text-ink-tertiary'
                }`}
                style={newStatus === s ? { background: 'var(--accent)' } : undefined}
              >
                {s === 'wish' ? '♡ 찜' : s === 'bought' ? '🛒 구매' : '🎁 선물'}
              </button>
            ))}
          </div>
        </div>
        <SaveButton onClick={handleAdd} disabled={!newName.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
