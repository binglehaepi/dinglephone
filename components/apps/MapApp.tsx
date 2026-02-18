import React from 'react';
import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface MapAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const MapApp: React.FC<MapAppProps> = ({ data, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-[#F3F6F8] text-text-primary">
      {/* Header */}
      <div className="pt-[54px] pb-4 px-6 flex items-center justify-between sticky top-0 bg-[#F3F6F8]/95 backdrop-blur-sm z-10 border-b border-black/5">
        <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
            <ChevronLeft size={24} />
            </button>
            <span className="text-[18px] font-bold">{data.apps.map.title}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
        {/* Fake Map Visual */}
        <div className="h-[180px] bg-[#E8F1F5] rounded-[24px] border border-black/5 relative overflow-hidden mb-2">
            {/* Roads */}
            <div className="absolute top-[30%] left-0 w-full h-3 bg-white/60"></div>
            <div className="absolute top-0 left-[40%] w-3 h-full bg-white/60"></div>
            <div className="absolute top-[60%] left-0 w-full h-2 bg-white/60 rotate-12"></div>
            
            {/* Pins */}
            <div className="absolute top-[20%] left-[20%] text-xl drop-shadow-md">🧁</div>
            <div className="absolute top-[50%] left-[60%] text-xl drop-shadow-md">☕</div>
            <div className="absolute bottom-[30%] right-[20%] text-xl drop-shadow-md">🍰</div>
            
            <div className="absolute bottom-2 right-3 bg-white/80 px-2 py-1 rounded-full text-[10px] text-text-tertiary">
                dingle map
            </div>
        </div>

        <div className="flex items-center gap-2 px-1">
            <div className="h-[1px] flex-1 bg-black/5"></div>
            <span className="text-xs text-text-tertiary font-bold">VISITED PLACES</span>
            <div className="h-[1px] flex-1 bg-black/5"></div>
        </div>

        {/* Place List */}
        <div className="space-y-3">
            {data.apps.map.places.map((place) => (
                <div key={place.id} className="bg-white p-4 rounded-[20px] shadow-sm border border-black/5 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{backgroundColor: place.color}}>
                        {place.emoji}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-[15px]">{place.name}</h3>
                            <div className="flex items-center gap-1 text-xs font-bold text-accent-dark">
                                <Star size={12} fill="currentColor" />
                                {place.rating}
                            </div>
                        </div>
                        <p className="text-xs text-text-secondary mb-2 line-clamp-1">"{place.comment}"</p>
                        <div className="flex gap-2">
                            <span className="bg-[#F5F5F5] text-text-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold">
                                방문 {place.visits}회
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};