import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface ExpenseAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const ExpenseApp: React.FC<ExpenseAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newEmoji, setNewEmoji] = useState('💰');

  const handleAdd = () => {
    if (!newTitle.trim() || !newAmount || !currentPhone) return;
    const amount = parseInt(newAmount) || 0;
    const newItem = {
      id: crypto.randomUUID(),
      title: newTitle,
      amount,
      date: new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: '2-digit' }).replace(/\s/g, ''),
      comment: newComment,
      emoji: newEmoji || '💰',
    };
    const existingItems = currentPhone.apps.expenses.items;
    const updatedItems = [...existingItems, newItem];
    const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const updated = {
      ...currentPhone.apps.expenses,
      items: updatedItems,
      monthTotal: newTotal,
    };
    updateAppData('expenses', updated);
    setShowAdd(false);
    setNewTitle('');
    setNewAmount('');
    setNewComment('');
    setNewEmoji('💰');
  };

  const handleDelete = (id: string) => {
    if (!currentPhone) return;
    const updatedItems = currentPhone.apps.expenses.items.filter(item => item.id !== id);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const updated = {
      ...currentPhone.apps.expenses,
      items: updatedItems,
      monthTotal: newTotal,
    };
    updateAppData('expenses', updated);
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
       <div className="pt-[54px] pb-4 px-6 flex items-center justify-between sticky top-0 bg-cream-100/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          <span className="text-base font-semibold text-ink">가계부</span>
        </div>
        {isEditable && (
          <button
            onClick={() => setShowAdd(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
        {/* Total Card */}
        <div className="bg-cream-50 p-6 rounded-dingle-lg shadow-card mb-6 border border-cream-300">
            <div className="text-sm text-ink-tertiary mb-1 font-bold">{data.apps.expenses.monthName} 총 지출</div>
            <div className="text-3xl font-bold text-dingle mb-6 font-display">
                ₩{data.apps.expenses.monthTotal.toLocaleString()}
            </div>

            {/* Bars */}
            <div className="space-y-3">
                {data.apps.expenses.categories.map((cat, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-8 flex justify-center text-lg">{cat.emoji}</div>
                        <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{width: `${cat.percentage}%`, background: cat.color}}></div>
                        </div>
                        <div className="text-xs font-bold text-ink-tertiary w-8 text-right">{cat.percentage}%</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Receipt List */}
        <div className="relative bg-cream-50 p-6 pb-8 rounded-[6px] shadow-card border-t-8 border-dingle-medium">
             <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(circle,transparent_50%,#FFFDF9_50%)] bg-[length:16px_16px] -mt-2"></div>
             
             <div className="text-center mb-6 border-b-2 border-dashed border-cream-300 pb-4">
                 <div className="text-lg font-bold tracking-wider text-ink">RECEIPT</div>
                 <div className="text-xs text-ink-tertiary mt-1">RECENT TRANSACTIONS</div>
             </div>

             <div className="space-y-6">
                 {data.apps.expenses.items.map((item) => (
                     <div key={item.id} className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline">
                             <span className="font-bold text-sm flex items-center gap-2 text-ink">
                                 <span>{item.emoji}</span>
                                 {item.title}
                             </span>
                             <div className="flex items-center gap-2">
                               <span className="font-display font-bold text-ink">₩{item.amount.toLocaleString()}</span>
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
                         <div className="flex justify-between text-xs text-ink-tertiary pl-6">
                             <span className="text-ink-secondary italic">"{item.comment}"</span>
                             <span>{item.date}</span>
                         </div>
                     </div>
                 ))}

                 {isEditable && data.apps.expenses.items.length === 0 && (
                   <div className="text-center py-4">
                     <p className="text-sm text-ink-tertiary">지출 내역을 추가해보세요</p>
                   </div>
                 )}
             </div>

             {data.apps.expenses.monthlyQuote && (
               <div className="mt-8 pt-4 border-t-2 border-dashed border-cream-300 text-center">
                   <p className="text-sm text-dingle font-bold">
                       "{data.apps.expenses.monthlyQuote}"
                   </p>
               </div>
             )}

             <div className="absolute bottom-0 left-0 right-0 h-2 bg-[radial-gradient(circle,#FFFDF9_50%,transparent_50%)] bg-[length:16px_16px] -mb-2"></div>
        </div>
      </div>

      {/* Add Expense Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="💰 지출 추가">
        <DingleInput label="이모지" value={newEmoji} onChange={setNewEmoji} placeholder="💰" />
        <DingleInput label="항목명" value={newTitle} onChange={setNewTitle} placeholder="커피" />
        <DingleInput label="금액" value={newAmount} onChange={setNewAmount} placeholder="5000" type="number" />
        <DingleInput label="메모" value={newComment} onChange={setNewComment} placeholder="오늘도 카페에서 코딩" />
        <SaveButton onClick={handleAdd} disabled={!newTitle.trim() || !newAmount} label="추가" />
      </EditSheet>
    </div>
  );
};
