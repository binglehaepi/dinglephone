import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface ExpenseAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const ExpenseApp: React.FC<ExpenseAppProps> = ({ data, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-text-primary">
       <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 z-10">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">가계부</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
        {/* Total Card */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm mb-6 border border-gray-200">
            <div className="text-sm text-text-tertiary mb-1 font-bold">{data.apps.expenses.monthName} 총 지출</div>
            <div className="text-3xl font-bold text-accent mb-6 font-display">
                ₩{data.apps.expenses.monthTotal.toLocaleString()}
            </div>

            {/* Bars */}
            <div className="space-y-3">
                {data.apps.expenses.categories.map((cat, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-8 flex justify-center text-lg">{cat.emoji}</div>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{width: `${cat.percentage}%`, background: cat.color}}></div>
                        </div>
                        <div className="text-xs font-bold text-text-tertiary w-8 text-right">{cat.percentage}%</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Receipt List */}
        <div className="relative bg-white p-6 pb-8 rounded-[6px] shadow-sm border-t-8 border-accent-light">
             {/* Serrated Edge Top */}
             <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(circle,transparent_50%,#fff_50%)] bg-[length:16px_16px] -mt-2"></div>
             
             <div className="text-center mb-6 border-b-2 border-dashed border-gray-100 pb-4">
                 <div className="text-lg font-bold tracking-wider">RECEIPT</div>
                 <div className="text-xs text-text-tertiary mt-1">RECENT TRANSACTIONS</div>
             </div>

             <div className="space-y-6">
                 {data.apps.expenses.items.map((item) => (
                     <div key={item.id} className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline">
                             <span className="font-bold text-sm flex items-center gap-2">
                                 <span>{item.emoji}</span>
                                 {item.title}
                             </span>
                             <span className="font-display font-bold">₩{item.amount.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-xs text-text-tertiary pl-6">
                             <span className="text-text-secondary">"{item.comment}"</span>
                             <span>{item.date}</span>
                         </div>
                     </div>
                 ))}
             </div>

             <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-100 text-center">
                 <p className="text-sm font-handwriting text-accent font-bold">
                     "{data.apps.expenses.monthlyQuote}"
                 </p>
             </div>

             {/* Serrated Edge Bottom */}
             <div className="absolute bottom-0 left-0 right-0 h-2 bg-[radial-gradient(circle,#fff_50%,transparent_50%)] bg-[length:16px_16px] -mb-2"></div>
        </div>
      </div>
    </div>
  );
};