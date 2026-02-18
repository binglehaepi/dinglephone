import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PhoneData } from '../../types';

interface ExpandedWidgetContentProps {
  appId: string;
  phone: PhoneData;
}

export const ExpandedWidgetContent: React.FC<ExpandedWidgetContentProps> = ({ appId, phone }) => {
  switch (appId) {
    case 'photos':
      return <ExpandedPhotos items={phone.apps.photos.items} albumName={phone.apps.photos.albumName} />;
    case 'music':
      return <ExpandedMusic songs={phone.apps.music.songs} playlistName={phone.apps.music.playlistName} />;
    case 'calendar':
      return <ExpandedCalendar events={phone.apps.calendar.events} />;
    case 'notes':
      return <ExpandedNotes notes={phone.apps.notes} />;
    case 'expenses':
      return <ExpandedExpenses data={phone.apps.expenses} />;
    case 'map':
      return <ExpandedMap data={phone.apps.map} />;
    case 'guestbook':
      return <ExpandedGuestbook entries={phone.apps.guestbook.initialEntries} />;
    case 'social':
      return <ExpandedSocial feeds={phone.apps.social.feeds} />;
    case 'messages':
      return <ExpandedMessages messages={phone.apps.messages} />;
    case 'wishlist':
      return <ExpandedWishlist items={phone.apps.wishlistShop.items} />;
    default:
      return (
        <div className="flex items-center justify-center h-32 opacity-40 text-sm">
          콘텐츠 없음
        </div>
      );
  }
};

// ── 사진첩: 좌우로 넘길 수 있는 사진 갤러리 ──
function ExpandedPhotos({ items, albumName }: { items: PhoneData['apps']['photos']['items']; albumName: string }) {
  const [idx, setIdx] = useState(0);
  const item = items[idx];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 opacity-30 text-sm">
        📸 사진이 없어요
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
          {albumName}
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
          {idx + 1} / {items.length}
        </span>
      </div>
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {item?.imageUrl ? (
              <img src={item.imageUrl} className="w-full h-full object-cover" alt="" draggable={false} />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-4xl"
                style={{ background: item?.color || 'var(--bg-sunken)' }}
              >
                {item?.emoji}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {/* 좌우 버튼 */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev - 1 + items.length) % items.length); }}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((prev) => (prev + 1) % items.length); }}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>
      {item && (
        <div className="px-1">
          <div className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{item.caption}</div>
          {item.memo && (
            <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.memo}</div>
          )}
          <div className="flex items-center gap-2 mt-1">
            {item.location && (
              <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>📍 {item.location}</span>
            )}
            <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>{item.date}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 음악: 곡 리스트 ──
function ExpandedMusic({ songs, playlistName }: { songs: PhoneData['apps']['music']['songs']; playlistName: string }) {
  if (songs.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">🎵 곡이 없어요</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
          🎵 {playlistName}
        </span>
        <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>
          {songs.length}곡
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {songs.map((song, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent 94%)' }}
          >
            <span className="text-lg">{song.albumEmoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {song.title}
              </div>
              <div className="text-[9px] truncate" style={{ color: 'var(--text-tertiary)' }}>
                {song.artist}
              </div>
            </div>
            <span className="text-[9px] shrink-0" style={{ color: 'var(--text-tertiary)' }}>
              {song.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 캘린더: 전체 일정 목록 ──
function ExpandedCalendar({ events }: { events: PhoneData['apps']['calendar']['events'] }) {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2 px-1">
        <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{day}</span>
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
          {month}월 {weekday}요일
        </span>
      </div>
      {events.length === 0 ? (
        <div className="text-[11px] px-1" style={{ color: 'var(--text-tertiary)' }}>예정된 일정이 없어요</div>
      ) : (
        <div className="flex flex-col gap-1">
          {events.map((evt, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl"
              style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent 94%)' }}
            >
              <span className="text-sm">{evt.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {evt.title}
                </div>
                <div className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>{evt.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 메모: 전체 메모 목록 ──
function ExpandedNotes({ notes }: { notes: PhoneData['apps']['notes'] }) {
  if (notes.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">📝 메모가 없어요</div>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {notes.map((note, i) => (
        <div
          key={i}
          className="px-2.5 py-2 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--accent) 5%, transparent 95%)', border: '1px solid var(--border)' }}
        >
          <div className="text-[11px] font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {note.title}
          </div>
          <div
            className="text-[10px] leading-[1.5]"
            style={{
              color: 'var(--text-tertiary)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {note.content}
          </div>
          <div className="text-[8px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{note.updatedAt}</div>
        </div>
      ))}
    </div>
  );
}

// ── 가계부: 상세 지출 정보 ──
function ExpandedExpenses({ data }: { data: PhoneData['apps']['expenses'] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
          💰 {data.monthName} 지출
        </span>
        <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
          ₩{data.monthTotal.toLocaleString()}
        </span>
      </div>
      {data.monthlyQuote && (
        <div className="text-[10px] px-1" style={{ color: 'var(--text-tertiary)' }}>
          &ldquo;{data.monthlyQuote}&rdquo;
        </div>
      )}
      {/* 카테고리 */}
      {data.categories.length > 0 && (
        <div className="flex flex-wrap gap-1 px-1">
          {data.categories.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px]"
              style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent 92%)' }}
            >
              <span>{cat.emoji}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>{cat.percentage}%</span>
            </div>
          ))}
        </div>
      )}
      {/* 최근 항목 */}
      {data.items.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {data.items.slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
              <span className="text-sm">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-medium truncate block" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-bold shrink-0" style={{ color: 'var(--accent)' }}>
                ₩{item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 지도: 방문 장소 전체 ──
function ExpandedMap({ data }: { data: PhoneData['apps']['map'] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
          📍 {data.title}
        </span>
        <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>
          {data.visited.length}곳
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {data.visited.map((place, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2.5 py-2 rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--accent) 5%, transparent 95%)' }}
          >
            <span className="text-lg">{place.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {place.name}
              </div>
              <div className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>
                {place.location} · {place.visits}회 방문
              </div>
            </div>
            {place.rating > 0 && (
              <span className="text-[9px]" style={{ color: 'var(--accent)' }}>
                {'★'.repeat(Math.min(place.rating, 5))}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* 위시리스트 */}
      {data.wishlist.length > 0 && (
        <>
          <div className="text-[10px] font-bold px-1 mt-1" style={{ color: 'var(--text-secondary)' }}>가고 싶은 곳</div>
          <div className="flex flex-col gap-0.5">
            {data.wishlist.map((wish, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                <span className="text-sm">{wish.emoji}</span>
                <span className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>{wish.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── 방명록: 전체 글 ──
function ExpandedGuestbook({ entries }: { entries: PhoneData['apps']['guestbook']['initialEntries'] }) {
  if (entries.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">💌 아직 글이 없어요</div>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[11px] font-bold px-1" style={{ color: 'var(--text-primary)' }}>
        💌 방명록 · {entries.length}개
      </div>
      {entries.map((entry, i) => (
        <div
          key={i}
          className="px-2.5 py-2 rounded-xl"
          style={{
            background: entry.isOwner
              ? 'color-mix(in srgb, var(--accent) 10%, transparent 90%)'
              : 'color-mix(in srgb, var(--accent) 4%, transparent 96%)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>{entry.author}</span>
            <span className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>{entry.timeAgo}</span>
          </div>
          <div className="text-[10px] leading-[1.5]" style={{ color: 'var(--text-primary)' }}>
            {entry.message}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SNS: 피드 목록 ──
function ExpandedSocial({ feeds }: { feeds: PhoneData['apps']['social']['feeds'] }) {
  if (feeds.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">🌐 피드가 없어요</div>;
  }

  const platformIcons: Record<string, string> = {
    twitter: '🐦',
    youtube: '▶️',
    pinterest: '📌',
    instagram: '📷',
  };

  return (
    <div className="flex flex-col gap-1.5">
      {feeds.map((feed, i) => (
        <div
          key={i}
          className="px-2.5 py-2 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--accent) 5%, transparent 95%)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px]">{platformIcons[feed.platform] || '🌐'}</span>
            <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>{feed.platform}</span>
            <span className="text-[8px] ml-auto" style={{ color: 'var(--text-tertiary)' }}>{feed.timeAgo}</span>
          </div>
          <div className="text-[10px] leading-[1.5]" style={{ color: 'var(--text-primary)' }}>
            {feed.text}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>♡ {feed.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 메시지: 대화 목록 ──
function ExpandedMessages({ messages }: { messages: PhoneData['apps']['messages'] }) {
  if (messages.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">💬 메시지가 없어요</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-[11px] font-bold px-1" style={{ color: 'var(--text-primary)' }}>
        💬 메시지
      </div>
      {messages.map((msg, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl"
          style={{ background: msg.unread ? 'color-mix(in srgb, var(--accent) 8%, transparent 92%)' : 'transparent' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
            style={{ background: 'var(--bg-sunken)', color: 'var(--accent)' }}
          >
            {msg.from.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                {msg.from}
              </span>
              <span className="text-[8px] shrink-0" style={{ color: 'var(--text-tertiary)' }}>{msg.time}</span>
            </div>
            <div className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>
              {msg.preview}
            </div>
          </div>
          {msg.unread && (
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── 위시리스트: 전체 아이템 ──
function ExpandedWishlist({ items }: { items: PhoneData['apps']['wishlistShop']['items'] }) {
  if (items.length === 0) {
    return <div className="flex items-center justify-center h-32 opacity-30 text-sm">🛍️ 위시가 없어요</div>;
  }

  const statusLabels: Record<string, string> = {
    wish: '🤍 갖고 싶어',
    bought: '💜 구매완료',
    gifted: '🎁 선물받음',
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[11px] font-bold px-1" style={{ color: 'var(--text-primary)' }}>
        🛍️ 위시리스트 · {items.length}개
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--accent) 5%, transparent 95%)', border: '1px solid var(--border)' }}
        >
          <span className="text-xl">{item.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {item.name}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                ₩{item.price.toLocaleString()}
              </span>
              <span className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>
                {statusLabels[item.status] || item.status}
              </span>
            </div>
            {item.memo && (
              <div className="text-[9px] mt-0.5 truncate" style={{ color: 'var(--text-tertiary)' }}>{item.memo}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
