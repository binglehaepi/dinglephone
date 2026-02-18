import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, Heart } from 'lucide-react';
import { DinglePhoneData, PhotoItem } from '../../types';

interface PhotosAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const PhotosApp: React.FC<PhotosAppProps> = ({ data, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  if (selectedPhoto) {
    return (
      <div className="flex flex-col h-full bg-[#FAFAFA] text-text-primary animate-in slide-in-from-bottom duration-300 relative z-50">
        <div className="pt-[54px] px-6 flex justify-between items-center bg-white sticky top-0 z-10 pb-2 border-b border-gray-100">
             <div className="text-xl text-accent font-bold">♡</div>
            <button onClick={() => setSelectedPhoto(null)} className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary">
                <ChevronDown size={20} />
            </button>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-6">
          <div 
            className="w-full aspect-square rounded-[20px] flex items-center justify-center text-[80px] shadow-soft mb-6 relative overflow-hidden border border-black/5"
            style={{ background: selectedPhoto.color }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            {selectedPhoto.emoji}
          </div>
          
          <div className="space-y-4">
             <div>
                <h2 className="text-[16px] font-bold mb-1 text-text-primary">{selectedPhoto.caption}</h2>
             </div>

             <div className="bg-white p-4 rounded-[16px] border border-bg-secondary shadow-sm">
                <p className="text-[14px] text-text-secondary leading-relaxed font-sans">
                    {selectedPhoto.memo}
                </p>
             </div>

             <div className="flex justify-between items-center text-[12px] text-text-tertiary px-1 font-display">
                <span>{selectedPhoto.date}</span>
                <span>{selectedPhoto.location}</span>
             </div>

             <div className="flex flex-wrap gap-2 pt-2">
                {selectedPhoto.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-[20px] bg-accent-light text-accent-dark text-[12px] font-bold border border-accent/10">
                    #{tag}
                </span>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="pt-[54px] pb-4 px-6 flex items-center justify-between sticky top-0 bg-bg-primary/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
            <ChevronLeft size={24} />
            </button>
            <span className="text-[18px] font-bold">사진첩</span>
        </div>
        <span className="text-sm text-text-tertiary font-display">♡ {data.apps.photos.items.length}</span>
      </div>

      {/* Album Banner */}
      <div className="px-6 mb-6">
        <div className="bg-white p-5 rounded-[20px] border border-bg-secondary shadow-soft">
            <div className="text-xs text-text-tertiary font-bold mb-1">ALBUM</div>
            <div className="font-bold text-lg text-text-primary mb-0.5">{data.apps.photos.albumName}</div>
            <div className="text-sm text-text-secondary">"{data.apps.photos.albumDescription}"</div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
        <div className="grid grid-cols-3 gap-[3px] rounded-[12px] overflow-hidden">
          {data.apps.photos.items.map((item, index) => (
            <button
              key={item.id}
              className="aspect-square relative flex items-center justify-center text-[36px] overflow-hidden animate-in fade-in zoom-in duration-500 fill-mode-backwards active:opacity-80"
              style={{ 
                background: item.color,
                animationDelay: `${index * 30}ms`
              }}
              onClick={() => setSelectedPhoto(item)}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};