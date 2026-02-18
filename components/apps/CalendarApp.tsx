import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface CalendarAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

const EMOJI_OPTIONS = ['📱', '🎯', '📦', '🎁', '📝', '🚀', '⚒️', '🐦', '📋', '🎉', '☕', '💻'];

export const CalendarApp: React.FC<CalendarAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newIcon, setNewIcon] = useState('📅');
  const [newColor, setNewColor] = useState('#E8915A');

  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const eventMonthsArr = data.apps.calendar.events.map(e => parseInt(e.date.split('-')[1]));
  const displayMonth = eventMonthsArr.length > 0 ? eventMonthsArr[0] : currentMonth;
  const displayYear = 2026;
  const daysInMonth = new Date(displayYear, displayMonth, 0).getDate();
  const startDay = new Date(displayYear, displayMonth - 1, 1).getDay();

  const handleAdd = () => {
    if (!newTitle.trim() || !newDate || !currentPhone) return;
    const updated = {
      ...currentPhone.apps.calendar,
      events: [...currentPhone.apps.calendar.events, {
        date: newDate,
        title: newTitle,
        icon: newIcon,
        color: newColor,
      }],
    };
    updateAppData('calendar', updated);
    setShowAdd(false);
    setNewTitle('');
    setNewDate('');
    setNewIcon('📅');
    setNewColor('#E8915A');
  };

  const handleDelete = (index: number) => {
    if (!currentPhone) return;
    const updated = {
      ...currentPhone.apps.calendar,
      events: currentPhone.apps.calendar.events.filter((_, i) => i !== index),
    };
    updateAppData('calendar', updated);
  };

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
              isToday ? 'bg-dingle text-white shadow-md' : 'text-ink'
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
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      <div className="pt-[54px] pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-cream-100/95 backdrop-blur-xl">
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        {isEditable ? (
          <button
            onClick={() => setShowAdd(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10"
          >
            <Plus size={16} className="text-ink" />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
         <div className="bg-cream-50 p-4 rounded-dingle-lg shadow-card border border-cream-300 mb-6">
            <div className="grid grid-cols-7 text-center text-ink-tertiary text-[10px] font-bold mb-2 tracking-widest">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {renderCalendarGrid()}
            </div>
         </div>

         <div className="space-y-4 pb-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-dingle"></div>
                <span className="text-sm font-bold text-ink-secondary">Upcoming</span>
            </div>

            {data.apps.calendar.events.map((event, i) => (
              <div key={i} className="flex gap-4 items-center bg-cream-50 p-4 rounded-dingle shadow-card border border-cream-300">
                 <div className="flex flex-col items-center w-12 border-r border-dashed border-cream-300 pr-4">
                    <span className="text-[10px] uppercase font-bold text-ink-tertiary font-display">
                      {parseInt(event.date.split('-')[1]) === 1 ? 'Jan' : parseInt(event.date.split('-')[1]) === 2 ? 'Feb' : 'Mar'}
                    </span>
                    <span className="text-xl font-bold text-ink font-display">{event.date.split('-')[2]}</span>
                 </div>
                 <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{backgroundColor: `${event.color}33`}}>
                        {event.icon}
                    </div>
                    <div className="flex-1">
                       <div className="font-bold text-ink">{event.title}</div>
                       <div className="text-xs text-ink-tertiary">All day</div>
                    </div>
                    {isEditable && (
                      <button
                        onClick={() => handleDelete(i)}
                        className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    )}
                 </div>
              </div>
            ))}

            {isEditable && data.apps.calendar.events.length === 0 && (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-sm text-ink-tertiary">일정을 추가해보세요</p>
              </div>
            )}
         </div>
      </div>

      {/* Add Event Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="📅 일정 추가">
        <DingleInput label="제목" value={newTitle} onChange={setNewTitle} placeholder="일정 제목" />
        <DingleInput label="날짜" value={newDate} onChange={setNewDate} placeholder="2026-02-20" type="date" />
        <div className="mb-3">
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
            아이콘
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(e => (
              <button
                key={e}
                onClick={() => setNewIcon(e)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                  newIcon === e ? 'ring-2 scale-110' : 'opacity-60'
                }`}
                style={{
                  background: 'var(--bg-sunken)',
                  ...(newIcon === e ? { '--tw-ring-color': 'var(--accent)' } as any : {}),
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
        <SaveButton onClick={handleAdd} disabled={!newTitle.trim() || !newDate} label="추가" />
      </EditSheet>
    </div>
  );
};
