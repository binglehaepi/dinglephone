import React, { useState } from 'react';
import { ChevronLeft, Edit3, Search, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData, NoteItem } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface NotesAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim() || !currentPhone) return;
    const newNote: NoteItem = {
      title: newTitle,
      content: newContent,
      updatedAt: new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }).replace(/\s/g, ''),
    };
    const updated = [...currentPhone.apps.notes, newNote];
    updateAppData('notes', updated);
    setShowAdd(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (index: number) => {
    if (!currentPhone) return;
    const updated = currentPhone.apps.notes.filter((_, i) => i !== index);
    updateAppData('notes', updated);
    setSelectedNote(null);
  };

  if (selectedNote) {
    const noteIndex = data.apps.notes.findIndex(n => n.title === selectedNote.title && n.updatedAt === selectedNote.updatedAt);
    return (
      <div className="flex flex-col h-full bg-cream-100 text-ink">
         <div className="pt-[54px] pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-cream-100/95 backdrop-blur-xl">
          <button onClick={() => setSelectedNote(null)} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          {isEditable && noteIndex >= 0 && (
            <button
              onClick={() => handleDelete(noteIndex)}
              className="w-8 h-8 rounded-full bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          )}
        </div>
        <div className="p-8">
           <h1 className="text-3xl font-bold mb-2 text-ink">{selectedNote.title}</h1>
           <div className="text-xs text-ink-tertiary mb-8 font-display">{selectedNote.updatedAt}</div>
           <p className="text-lg text-ink-secondary whitespace-pre-line leading-loose">
             {selectedNote.content}
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      <div className="pt-[54px] px-4 pb-2">
         <div className="flex justify-between items-center mb-4">
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
               <button className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                   <Edit3 size={16} className="text-ink" />
               </button>
             )}
         </div>
         
         <div className="bg-cream-200 h-12 rounded-full flex items-center px-4 gap-2 text-ink-tertiary border border-cream-300 mb-6">
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
                className="bg-cream-50 p-5 rounded-dingle shadow-card border border-cream-300 active:scale-[0.98] transition-transform"
              >
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-ink">{note.title}</h3>
                    <span className="text-xs text-ink-tertiary font-display bg-cream-200 px-2 py-1 rounded-md">{note.updatedAt}</span>
                 </div>
                 <div className="text-sm text-ink-secondary line-clamp-2 leading-relaxed opacity-80">
                    {note.content}
                 </div>
              </div>
            ))}

            {isEditable && data.apps.notes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-sm text-ink-tertiary">아직 메모가 없어요</p>
                <button
                  onClick={() => setShowAdd(true)}
                  className="mt-3 text-sm font-bold px-4 py-2 rounded-full"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  + 첫 메모 추가
                </button>
              </div>
            )}
         </div>
      </div>

      {/* Add Note Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="📝 메모 추가">
        <DingleInput label="제목" value={newTitle} onChange={setNewTitle} placeholder="메모 제목" />
        <DingleInput label="내용" value={newContent} onChange={setNewContent} placeholder="메모 내용을 입력하세요" multiline />
        <SaveButton onClick={handleAdd} disabled={!newTitle.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
