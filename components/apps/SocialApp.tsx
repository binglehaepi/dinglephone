import React, { useState } from 'react';
import { ChevronLeft, Heart, MessageCircle, Repeat, ExternalLink, AtSign, Pin, Play, Instagram, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData, SocialFeedItem } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface SocialAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

const platformConfig: Record<string, { icon: React.ComponentType<any>; color: string; bg: string; label: string }> = {
  twitter:   { icon: AtSign,    color: '#1DA1F2', bg: '#EBF5FF', label: 'X (Twitter)' },
  youtube:   { icon: Play,      color: '#FF0000', bg: '#FFEBEB', label: 'YouTube' },
  pinterest: { icon: Pin,       color: '#E60023', bg: '#FFEBF0', label: 'Tumblbug' },
  instagram: { icon: Instagram, color: '#E1306C', bg: '#FFEBF3', label: 'Instagram' },
};

export const SocialApp: React.FC<SocialAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [showAdd, setShowAdd] = useState(false);
  const [newText, setNewText] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');
  const [newPlatform, setNewPlatform] = useState<'twitter' | 'youtube' | 'pinterest' | 'instagram'>('twitter');

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const detectPlatform = (url: string): 'twitter' | 'youtube' | 'pinterest' | 'instagram' => {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('pinterest') || url.includes('tumblbug')) return 'pinterest';
    if (url.includes('instagram.com')) return 'instagram';
    return 'twitter';
  };

  const handleAdd = () => {
    if (!newText.trim() || !currentPhone) return;
    const platform = newUrl ? detectPlatform(newUrl) : newPlatform;
    const newFeed: SocialFeedItem = {
      id: crypto.randomUUID(),
      platform,
      thumbnailUrl: newThumbnailUrl || '',
      text: newText,
      likes: '0',
      timeAgo: '방금 전',
      sourceUrl: newUrl || '#',
    };
    const updated = {
      ...currentPhone.apps.social,
      feeds: [...currentPhone.apps.social.feeds, newFeed],
    };
    updateAppData('social', updated);
    setShowAdd(false);
    setNewText('');
    setNewUrl('');
    setNewThumbnailUrl('');
  };

  const handleDelete = (id: string) => {
    if (!currentPhone) return;
    const updated = {
      ...currentPhone.apps.social,
      feeds: currentPhone.apps.social.feeds.filter(f => f.id !== id),
    };
    updateAppData('social', updated);
  };

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink">
      {/* Header */}
      <div className="pt-[54px] pb-4 px-6 flex items-center justify-between sticky top-0 bg-cream-100/95 backdrop-blur-sm z-10 border-b border-cream-300">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
            <ChevronLeft size={16} className="text-ink" />
          </button>
          <span className="text-base font-semibold text-ink">dingle</span>
        </div>
        {isEditable && (
          <button
            onClick={() => setShowAdd(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-8">
        {data.apps.social.feeds.map((item) => {
            const pConfig = platformConfig[item.platform] || platformConfig.twitter;
            const PlatformIcon = pConfig.icon;
            return (
              <div
                key={item.id}
                className="bg-cream-50 rounded-dingle shadow-card border border-cream-300 overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-cream-300">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: pConfig.bg }}
                      >
                        <PlatformIcon size={14} color={pConfig.color} strokeWidth={2} />
                      </div>
                      <div>
                          <div className="text-xs font-bold text-ink">{pConfig.label}</div>
                          <div className="text-[10px] text-ink-tertiary">{item.timeAgo}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditable && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"
                        >
                          <Trash2 size={10} className="text-red-400" />
                        </button>
                      )}
                      <button onClick={() => openLink(item.sourceUrl)}>
                        <ExternalLink size={14} className="text-ink-tertiary" />
                      </button>
                    </div>
                </div>

                {/* Thumbnail */}
                {item.thumbnailUrl && (
                  <div
                    className="relative aspect-video bg-cream-200 cursor-pointer active:scale-[0.98] transition-transform"
                    onClick={() => openLink(item.sourceUrl)}
                  >
                      <img src={item.thumbnailUrl} alt="thumbnail" className="w-full h-full object-contain bg-cream-50" />
                      {item.platform === 'youtube' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                                  <Play size={20} fill="currentColor" />
                              </div>
                          </div>
                      )}
                  </div>
                )}

                {/* Footer */}
                <div className="p-4">
                    <p className="text-sm text-ink mb-3 leading-relaxed">{item.text}</p>
                    <div className="flex items-center justify-between text-ink-tertiary">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <Heart size={16} />
                                <span className="text-xs">{item.likes}</span>
                            </div>
                            <MessageCircle size={16} />
                            <Repeat size={16} />
                        </div>
                        <button
                          onClick={() => openLink(item.sourceUrl)}
                          className="text-xs text-dingle font-medium flex items-center gap-1"
                        >
                          원본 보기 <ExternalLink size={10} />
                        </button>
                    </div>
                </div>
              </div>
            );
        })}

        {isEditable && data.apps.social.feeds.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🌐</div>
            <p className="text-sm text-ink-tertiary">SNS 피드를 추가해보세요</p>
          </div>
        )}
      </div>

      {/* Add Feed Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="🌐 SNS 피드 추가">
        <DingleInput label="URL" value={newUrl} onChange={(v) => { setNewUrl(v); if (v) setNewPlatform(detectPlatform(v)); }} placeholder="https://..." />
        <DingleInput label="본문 / 제목" value={newText} onChange={setNewText} placeholder="포스트 내용" multiline />
        <DingleInput label="썸네일 이미지 URL (선택)" value={newThumbnailUrl} onChange={setNewThumbnailUrl} placeholder="https://example.com/image.jpg" />
        {newThumbnailUrl && (
          <div className="mb-3 rounded-xl overflow-hidden border border-cream-300">
            <img
              src={newThumbnailUrl}
              alt="thumbnail preview"
              className="w-full h-32 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <div className="mb-3">
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
            플랫폼
          </label>
          <div className="flex gap-2">
            {(['twitter', 'youtube', 'pinterest', 'instagram'] as const).map(p => {
              const cfg = platformConfig[p];
              return (
                <button
                  key={p}
                  onClick={() => setNewPlatform(p)}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${
                    newPlatform === p ? 'ring-2' : 'opacity-50'
                  }`}
                  style={{
                    background: cfg.bg,
                    color: cfg.color,
                    ...(newPlatform === p ? { '--tw-ring-color': cfg.color } as any : {}),
                  }}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
        <SaveButton onClick={handleAdd} disabled={!newText.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
