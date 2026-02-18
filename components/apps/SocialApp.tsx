import React from 'react';
import { ChevronLeft, Heart, MessageCircle, Repeat, Share } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface SocialAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const SocialApp: React.FC<SocialAppProps> = ({ data, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] text-text-primary">
      {/* Header */}
      <div className="pt-[54px] pb-4 px-6 flex items-center gap-2 sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm z-10 border-b border-gray-100">
        <button onClick={onClose} className="text-text-secondary -ml-2 p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-[18px] font-bold">피드</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-8">
        {data.apps.social.feeds.map((item) => (
            <div key={item.id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${item.platform === 'twitter' ? 'bg-blue-100 text-blue-500' : 
                          item.platform === 'youtube' ? 'bg-red-100 text-red-500' :
                          item.platform === 'pinterest' ? 'bg-red-50 text-red-700' :
                          'bg-pink-100 text-pink-500'}`}>
                        {item.platform === 'twitter' ? '🐦' : 
                         item.platform === 'youtube' ? '▶️' :
                         item.platform === 'pinterest' ? '📌' : '📷'}
                    </div>
                    <div>
                        <div className="text-xs font-bold capitalize">{item.platform}</div>
                        <div className="text-[10px] text-text-tertiary">{item.timeAgo}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative aspect-video bg-gray-100">
                    <img src={item.thumbnailUrl} alt="thumbnail" className="w-full h-full object-cover" />
                    {item.platform === 'youtube' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                ▶
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4">
                    <p className="text-sm text-text-primary mb-3 leading-relaxed">{item.text}</p>
                    <div className="flex items-center justify-between text-text-tertiary">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <Heart size={16} className={item.platform === 'instagram' ? 'text-red-400 fill-red-400' : ''} />
                                <span className="text-xs">{item.likes}</span>
                            </div>
                            <MessageCircle size={16} />
                            <Repeat size={16} />
                        </div>
                        <Share size={16} />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};