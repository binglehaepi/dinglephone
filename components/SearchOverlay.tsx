import React from 'react';
import { Search, Link2, Pin, AtSign, Camera, Play } from 'lucide-react';

interface SearchOverlayProps {
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col pt-[54px] px-6"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-base) 95%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-10 bg-cream-200 rounded-full flex items-center px-4 gap-2 text-ink-tertiary border border-cream-300">
            <Search size={18} />
            <span className="text-sm">검색...</span>
        </div>
        <button onClick={onClose} className="text-ink font-medium text-sm">
            취소
        </button>
      </div>

      <div className="space-y-6">
        <div>
            <h3 className="text-xs font-bold text-ink-tertiary mb-3">최근 스크랩</h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl border border-cream-300">
                    <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center">
                      <Link2 size={14} className="text-ink-secondary" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-ink">두쫀쿠 공식 인스타</div>
                        <div className="text-xs text-ink-tertiary truncate">instagram.com/doojjon</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl border border-cream-300">
                    <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center">
                      <Link2 size={14} className="text-ink-secondary" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-bold text-ink">카페 추천 블로그</div>
                        <div className="text-xs text-ink-tertiary truncate">blog.naver.com/cafe_lover</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-xs font-bold text-ink-tertiary mb-3">자주 방문</h3>
            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#FFEBF0] flex items-center justify-center">
                      <Pin size={18} color="#E60023" />
                    </div>
                    <span className="text-[10px] text-ink-secondary">핀터</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#EBF5FF] flex items-center justify-center">
                      <AtSign size={18} color="#1DA1F2" />
                    </div>
                    <span className="text-[10px] text-ink-secondary">트위터</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#FFEBF3] flex items-center justify-center">
                      <Camera size={18} color="#E1306C" />
                    </div>
                    <span className="text-[10px] text-ink-secondary">인스타</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#FFEBEB] flex items-center justify-center">
                      <Play size={18} color="#FF0000" />
                    </div>
                    <span className="text-[10px] text-ink-secondary">유튜브</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
