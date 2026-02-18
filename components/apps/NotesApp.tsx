import React, { useState } from 'react';
import { ChevronLeft, Edit3, Search } from 'lucide-react';
import { DinglePhoneData, NoteItem } from '../../types';

interface NotesAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({ data, onClose }) => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  if (selectedNote) {
    return (
      <div className="flex flex-col h-full bg-white text-text-primary animate-in slide-in-from-right duration-200">
         <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-white z-10 border-b border-bg-secondary">
          <button onClick={() => setSelectedNote(null)} className="text-accent -ml-2 p-1 flex items-center">
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="p-8">
           <h1 className="text-3xl font-bold mb-2">{selectedNote.title}</h1>
           <div className="text-xs text-text-tertiary mb-8 font-display">{selectedNote.updatedAt}</div>
           <p className="text-lg text-text-secondary whitespace-pre-line leading-loose">
             {selectedNote.content}
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary">
      <div className="pt-[54px] px-6 pb-2">
         <div className="flex justify-between items-center mb-4">
             <button onClick={onClose} className="text-text-secondary -ml-2">
                <ChevronLeft size={28} />
             </button>
             <h1 className="text-2xl font-bold">Notes</h1>
             <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-md">
                 <Edit3 size={18} />
             </button>
         </div>
         
         <div className="bg-white h-12 rounded-[16px] flex items-center px-4 gap-2 text-text-tertiary border border-bg-secondary shadow-sm mb-6">
            <Search size={18} />
            <span className="text-sm">Search notes...</span>
         </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto no-scrollbar pb-8">
         <div className="grid gap-3">
            {data.apps.notes.map((note, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedNote(note)}
                className="bg-white p-5 rounded-[20px] shadow-sm border border-bg-secondary active:scale-[0.98] transition-transform"
              >
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{note.title}</h3>
                    <span className="text-xs text-text-tertiary font-display bg-bg-secondary px-2 py-1 rounded-md">{note.updatedAt}</span>
                 </div>
                 <div className="text-sm text-text-secondary line-clamp-2 leading-relaxed opacity-80">
                    {note.content}
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};