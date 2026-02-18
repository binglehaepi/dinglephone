import React, { useState, useEffect } from 'react';
import { ChevronLeft, Eye, EyeOff, Trash2, Shield } from 'lucide-react';
import { subscribeToReported, updateDocument, removeDocument } from '../lib/firebase';

interface ReportedItem {
  id: string;
  _collection: string;
  author?: string;
  message?: string;
  comment?: string;
  nickname?: string;
  content?: string;
  hidden?: boolean;
  reported?: boolean;
  timeAgo: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

const COLLECTIONS = ['guestbook', 'reviews', 'community_posts'] as const;

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [reportedItems, setReportedItems] = useState<ReportedItem[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    COLLECTIONS.forEach((col) => {
      const unsub = subscribeToReported(col, (items) => {
        setReportedItems((prev) => {
          // 해당 컬렉션의 기존 항목을 제거하고 새 항목으로 교체
          const filtered = prev.filter((item) => item._collection !== col);
          return [...filtered, ...items].sort((a, b) => {
            // hidden이 false인 것(미처리)을 먼저 표시
            if (a.hidden !== b.hidden) return a.hidden ? 1 : -1;
            return 0;
          });
        });
      });
      unsubscribes.push(unsub);
    });

    return () => unsubscribes.forEach((u) => u());
  }, []);

  const getDisplayText = (item: ReportedItem): string => {
    return item.content || item.message || item.comment || '(내용 없음)';
  };

  const getAuthor = (item: ReportedItem): string => {
    return item.nickname || item.author || 'unknown';
  };

  const getCollectionLabel = (col: string): string => {
    switch (col) {
      case 'guestbook': return '방명록';
      case 'reviews': return '리뷰';
      case 'community_posts': return '커뮤니티';
      default: return col;
    }
  };

  const handleToggleHidden = async (item: ReportedItem) => {
    setActionLoading(item.id);
    try {
      await updateDocument(item._collection, item.id, {
        hidden: !item.hidden,
      });
    } catch (err) {
      console.error('숨김 처리 실패:', err);
    }
    setActionLoading(null);
  };

  const handleDelete = async (item: ReportedItem) => {
    if (!confirm('정말 삭제하시겠어요? 복구할 수 없습니다.')) return;
    setActionLoading(item.id);
    try {
      await removeDocument(item._collection, item.id);
    } catch (err) {
      console.error('삭제 실패:', err);
    }
    setActionLoading(null);
  };

  const handleClearReport = async (item: ReportedItem) => {
    setActionLoading(item.id);
    try {
      await updateDocument(item._collection, item.id, {
        reported: false,
      });
    } catch (err) {
      console.error('신고 해제 실패:', err);
    }
    setActionLoading(null);
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      {/* Header */}
      <div className="pt-[54px] pb-2 px-6 flex items-center gap-2 sticky top-0 bg-cream-100/95 backdrop-blur-sm z-10">
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        <Shield size={16} className="text-red-500" />
        <span className="text-base font-semibold text-ink">관리자 패널</span>
        <span className="ml-auto text-xs text-ink-tertiary">{reportedItems.length}건</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8 space-y-3">
        {reportedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-ink-tertiary">
            <Shield size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-bold">신고된 콘텐츠가 없어요</p>
            <p className="text-xs mt-1">모든 콘텐츠가 깨끗합니다 ✨</p>
          </div>
        ) : (
          reportedItems.map((item) => (
            <div
              key={`${item._collection}-${item.id}`}
              className={`p-4 rounded-xl border shadow-sm ${
                item.hidden
                  ? 'bg-red-50 border-red-200 opacity-60'
                  : 'bg-cream-50 border-cream-300'
              }`}
            >
              {/* Info */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-ink/10 text-ink-secondary font-bold">
                  {getCollectionLabel(item._collection)}
                </span>
                <span className="text-[10px] text-ink-tertiary">{item.timeAgo}</span>
                {item.hidden && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-500 font-bold">숨김</span>
                )}
              </div>

              {/* Author & Content */}
              <div className="text-xs font-bold text-ink mb-1">{getAuthor(item)}</div>
              <div className="text-xs text-ink-secondary line-clamp-3 mb-3">{getDisplayText(item)}</div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleHidden(item)}
                  disabled={actionLoading === item.id}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors ${
                    item.hidden
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {item.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
                  {item.hidden ? '보이기' : '숨기기'}
                </button>
                <button
                  onClick={() => handleClearReport(item)}
                  disabled={actionLoading === item.id}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 transition-colors"
                >
                  신고 해제
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={actionLoading === item.id}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold bg-red-100 text-red-500 transition-colors ml-auto"
                >
                  <Trash2 size={12} />
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
