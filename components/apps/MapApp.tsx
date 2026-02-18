import React, { useState } from 'react';
import { ChevronLeft, MapPin, Star, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface MapAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const MapApp: React.FC<MapAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newEmoji, setNewEmoji] = useState('📍');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('4.0');

  const handleAdd = () => {
    if (!newName.trim() || !currentPhone) return;
    const colors = ['#D6E8FF', '#EBFFF3', '#FFF3EB', '#F3EBFF', '#FFE0EC'];
    const newPlace = {
      id: crypto.randomUUID(),
      name: newName,
      emoji: newEmoji || '📍',
      rating: parseFloat(newRating) || 4.0,
      visits: 1,
      comment: newComment,
      location: newLocation,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    const updated = {
      ...currentPhone.apps.map,
      visited: [...currentPhone.apps.map.visited, newPlace],
    };
    updateAppData('map', updated);
    setShowAdd(false);
    setNewName('');
    setNewLocation('');
    setNewEmoji('📍');
    setNewComment('');
    setNewRating('4.0');
  };

  const handleDelete = (id: string) => {
    if (!currentPhone) return;
    const updated = {
      ...currentPhone.apps.map,
      visited: currentPhone.apps.map.visited.filter(p => p.id !== id),
    };
    updateAppData('map', updated);
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      {/* Header */}
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

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
        {/* Fake Map Visual */}
        <div className="h-[180px] bg-cream-200 rounded-dingle-lg border border-cream-300 relative overflow-hidden mb-2">
            <div className="absolute top-[30%] left-0 w-full h-3 bg-cream-50/60"></div>
            <div className="absolute top-0 left-[40%] w-3 h-full bg-cream-50/60"></div>
            <div className="absolute top-[60%] left-0 w-full h-2 bg-cream-50/60 rotate-12"></div>
            
            <div className="absolute top-[20%] left-[20%] text-xl drop-shadow-md">🧁</div>
            <div className="absolute top-[50%] left-[60%] text-xl drop-shadow-md">☕</div>
            <div className="absolute bottom-[30%] right-[20%] text-xl drop-shadow-md">🍰</div>
            
            <div className="absolute bottom-2 right-3 bg-cream-50/80 px-2 py-1 rounded-full text-[10px] text-ink-tertiary">
                dingle map
            </div>
        </div>

        <div className="flex items-center gap-2 px-1">
            <div className="h-[1px] flex-1 bg-cream-300"></div>
            <span className="text-xs text-ink-tertiary font-bold">VISITED PLACES</span>
            <div className="h-[1px] flex-1 bg-cream-300"></div>
        </div>

        {/* Place List */}
        <div className="space-y-3">
            {data.apps.map.places.map((place) => (
                <div key={place.id} className="bg-cream-50 p-4 rounded-dingle shadow-card border border-cream-300 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{backgroundColor: place.color}}>
                        {place.emoji}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-[15px] text-ink">{place.name}</h3>
                            <div className="flex items-center gap-1 text-xs font-bold text-dingle-dark">
                                <Star size={12} fill="currentColor" />
                                {place.rating}
                            </div>
                        </div>
                        <p className="text-xs text-ink-secondary mb-2 line-clamp-1">"{place.comment}"</p>
                        <div className="flex gap-2 items-center">
                            <span className="bg-cream-200 text-ink-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold">
                                방문 {place.visits}회
                            </span>
                            {isEditable && (
                              <button
                                onClick={() => handleDelete(place.id)}
                                className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center"
                              >
                                <Trash2 size={10} className="text-red-400" />
                              </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {isEditable && data.apps.map.places.length === 0 && (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-sm text-ink-tertiary">장소를 추가해보세요</p>
              </div>
            )}
        </div>
      </div>

      {/* Add Place Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="📍 장소 추가">
        <DingleInput label="이모지" value={newEmoji} onChange={setNewEmoji} placeholder="📍" />
        <DingleInput label="장소 이름" value={newName} onChange={setNewName} placeholder="카페 이름" />
        <DingleInput label="위치" value={newLocation} onChange={setNewLocation} placeholder="서울 성수동" />
        <DingleInput label="별점" value={newRating} onChange={setNewRating} placeholder="4.5" type="number" />
        <DingleInput label="한줄평" value={newComment} onChange={setNewComment} placeholder="여기 좋았어요!" />
        <SaveButton onClick={handleAdd} disabled={!newName.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
