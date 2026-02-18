import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface CalendarAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const CalendarApp: React.FC<CalendarAppProps> = ({ data, onClose }) => {
  const today = 18; // Hardcoded
  const daysInMonth = 28; // Feb
  const startDay = 0; // Sunday

  const renderCalendarGrid = () => {
    const grid = [];
    for (let i = 0; i < startDay; i++) {
      grid.push(<div key={`empty-${i}`} className="h-10" />);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const event = data.apps.calendar.events.find(e => parseInt(e.date.split('-')[2]) === d);
      const isToday = d === today;
      
      grid.push(
        <div key={d} className="h-12 flex flex-col items-center justify-center relative">
          <div 
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
              isToday ? 'bg-accent text-white shadow-md' : 'text-text-primary'
            }`}
          >
            {d}
          </div>
          {event && !isToday && (
            <div className="w-1 h-1 rounded-full mt-1" style={{background: event.color}} />
          )}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary">
      <div className="pt-[54px] pb-4 px-6 flex items-center justify-between sticky top-0 bg-bg-primary/90 backdrop-blur-sm z-10">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={28} />
        </button>
        <span className="text-xl font-bold font-display">February</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
         {/* Calendar Grid */}
         <div className="bg-white p-4 rounded-[24px] shadow-sm border border-bg-secondary mb-6">
            <div className="grid grid-cols-7 text-center text-text-tertiary text-[10px] font-bold mb-2 tracking-widest">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {renderCalendarGrid()}
            </div>
         </div>

         {/* Events List */}
         <div className="space-y-4 pb-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-sm font-bold text-text-secondary">Upcoming</span>
            </div>

            {data.apps.calendar.events.map((event, i) => (
              <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-[20px] shadow-sm border border-bg-secondary">
                 <div className="flex flex-col items-center w-12 border-r border-dashed border-bg-secondary pr-4">
                    <span className="text-[10px] uppercase font-bold text-text-tertiary font-display">Feb</span>
                    <span className="text-xl font-bold text-text-primary font-display">{event.date.split('-')[2]}</span>
                 </div>
                 <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{backgroundColor: `${event.color}33`}}>
                        {event.icon}
                    </div>
                    <div>
                       <div className="font-bold text-text-primary">{event.title}</div>
                       <div className="text-xs text-text-tertiary">All day</div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};