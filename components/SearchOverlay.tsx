import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-[60] flex flex-col pt-[54px] px-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-10 bg-gray-100 rounded-full flex items-center px-4 gap-2 text-text-tertiary">
            <Search size={18} />
            <span className="text-sm">검색...</span>
        </div>
        <button onClick={onClose} className="text-text-primary font-medium text-sm">
            취소
        </button>
      </div>

      <div className="space-y-6">
        <div>
            <h3 className="text-xs font-bold text-text-tertiary mb-3">최근 스크랩</h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-border">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg">🔗</div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-text-primary">두쫀쿠 공식 인스타</div>
                        <div className="text-xs text-text-tertiary">instagram.com/doojjon</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-border">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg">🔗</div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-text-primary">카페 추천 블로그</div>
                        <div className="text-xs text-text-tertiary">blog.naver.com/cafe_lover</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-xs font-bold text-text-tertiary mb-3">자주 방문</h3>
            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#E60023]/10 text-[#E60023] flex items-center justify-center text-xl">📌</div>
                    <span className="text-[10px] text-text-secondary">핀터</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center text-xl">🐦</div>
                    <span className="text-[10px] text-text-secondary">트위터</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center text-xl">📷</div>
                    <span className="text-[10px] text-text-secondary">인스타</span>
                </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center text-xl">▶️</div>
                    <span className="text-[10px] text-text-secondary">유튜브</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};