import React, { useState, useEffect } from 'react';
import { PhoneData } from '../../types';

interface WidgetContentProps {
  appId: string;
  phone: PhoneData;
  photoIndex?: number; // DS 하단 스크린용
}

export const WidgetContent: React.FC<WidgetContentProps> = ({ appId, phone, photoIndex = 0 }) => {
  switch (appId) {
    case 'photos':
      return <PhotosPreview items={phone.apps.photos.items} index={photoIndex} />;
    case 'music':
      return <MusicPreview song={phone.apps.music.songs[0]} />;
    case 'calendar':
      return <CalendarPreview events={phone.apps.calendar.events} />;
    case 'notes':
      return <NotesPreview notes={phone.apps.notes} />;
    case 'expenses':
      return <ExpensesPreview data={phone.apps.expenses} />;
    case 'map':
      return <MapPreview places={phone.apps.map.visited} />;
    case 'guestbook':
      return <GuestbookPreview entries={phone.apps.guestbook.initialEntries} />;
    case 'social':
      return <SocialPreview feeds={phone.apps.social.feeds} />;
    case 'messages':
      return <MessagesPreview messages={phone.apps.messages} />;
    case 'wishlist':
      return <WishlistPreview items={phone.apps.wishlistShop.items} />;
    default:
      return (
        <div className="flex items-center justify-center h-full opacity-30 text-xs">♡</div>
      );
  }
};

// ── 사진첩: 자동 순환 (A/B 슬롯 크로스페이드) ──
function PhotosPreview({ items, index = 0 }: { items: PhoneData['apps']['photos']['items']; index?: number }) {
  // A/B 두 슬롯을 항상 렌더, activeSlot으로 교대
  const [slotA, setSlotA] = useState(index % Math.max(items.length, 1));
  const [slotB, setSlotB] = useState((index + 1) % Math.max(items.length, 1));
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      if (activeSlot === 'A') {
        // B에 다음 사진 세팅 후 B를 활성화
        setSlotB((slotA + 1) % items.length);
        setActiveSlot('B');
      } else {
        // A에 다음 사진 세팅 후 A를 활성화
        setSlotA((slotB + 1) % items.length);
        setActiveSlot('A');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length, activeSlot, slotA, slotB]);

  if (items.length === 0) {
    return <div className="flex items-center justify-center h-full text-lg opacity-30">📸</div>;
  }

  const renderSlot = (idx: number) => {
    const item = items[idx % items.length];
    if (!item) return null;
    if (item.imageUrl) {
      return <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" draggable={false} />;
    }
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center text-2xl" style={{ background: item.color || 'var(--bg-sunken)' }}>
        {item.emoji}
      </div>
    );
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 슬롯 A */}
      <div
        className="absolute inset-0"
        style={{
          opacity: activeSlot === 'A' ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        {renderSlot(slotA)}
      </div>
      {/* 슬롯 B */}
      <div
        className="absolute inset-0"
        style={{
          opacity: activeSlot === 'B' ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        {renderSlot(slotB)}
      </div>
    </div>
  );
}

// ── 음악: 현재 곡 (깔끔한 디자인) ──
function MusicPreview({ song }: { song?: PhoneData['apps']['music']['songs'][0] }) {
  if (!song) {
    return <div className="flex items-center justify-center h-full text-lg opacity-30">🎵</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-2.5 gap-1">
      <span className="text-xl">{song.albumEmoji}</span>
      <div className="w-full text-center">
        <div
          className="text-[8px] font-bold truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {song.title}
        </div>
        <div
          className="text-[7px] truncate mt-0.5"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {song.artist}
        </div>
      </div>
      {/* 재생 바 */}
      <div className="w-full px-1 mt-0.5">
        <div className="w-full h-[2px] rounded-full" style={{ background: 'var(--border)' }}>
          <div className="w-1/3 h-full rounded-full" style={{ background: 'var(--accent)' }} />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-0.5">
        <span style={{ fontSize: 7, color: 'var(--text-tertiary)' }}>⏮</span>
        <span style={{ fontSize: 9, color: 'var(--accent)' }}>▶</span>
        <span style={{ fontSize: 7, color: 'var(--text-tertiary)' }}>⏭</span>
      </div>
    </div>
  );
}

// ── 캘린더: 오늘 날짜 + 다가오는 일정 ──
function CalendarPreview({ events }: { events: PhoneData['apps']['calendar']['events'] }) {
  const now = new Date();
  const day = now.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
  const upcoming = events.slice(0, 2);
  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{day}</span>
        <span className="text-[7px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>
          {now.getMonth() + 1}월 {weekday}요일
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-0.5 mt-1">
        {upcoming.length === 0 && (
          <span className="text-[7px]" style={{ color: 'var(--text-tertiary)' }}>일정 없음</span>
        )}
        {upcoming.map((evt) => (
          <div
            key={evt.date}
            className="flex items-center gap-1 px-1 py-0.5 rounded"
            style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent 92%)' }}
          >
            <span className="text-[7px]">{evt.icon}</span>
            <span className="text-[7px] truncate font-medium" style={{ color: 'var(--text-primary)' }}>
              {evt.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 메모: 첫 메모 미리보기 ──
function NotesPreview({ notes }: { notes: PhoneData['apps']['notes'] }) {
  const first = notes[0];
  if (!first) {
    return <div className="flex items-center justify-center h-full text-lg opacity-30">📝</div>;
  }
  return (
    <div className="p-2 h-full flex flex-col">
      <div
        className="text-[8px] font-bold truncate mb-0.5"
        style={{ color: 'var(--text-primary)' }}
      >
        {first.title}
      </div>
      <div className="w-full h-[1px] mb-1" style={{ background: 'var(--border)' }} />
      <div
        className="text-[7px] leading-[1.4] flex-1 overflow-hidden"
        style={{
          color: 'var(--text-tertiary)',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {first.content}
      </div>
    </div>
  );
}

// ── 가계부: 월 총액 + 한줄 인용 ──
function ExpensesPreview({ data }: { data: PhoneData['apps']['expenses'] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-2 gap-0.5">
      <span className="text-[7px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>이번 달 지출</span>
      <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
        ₩{data.monthTotal.toLocaleString()}
      </span>
      <div className="w-8 h-[1px] my-0.5" style={{ background: 'var(--border)' }} />
      <span className="text-[6px] text-center" style={{ color: 'var(--text-tertiary)' }}>
        {data.monthlyQuote}
      </span>
    </div>
  );
}

// ── 지도: 방문 장소 ──
function MapPreview({ places }: { places: PhoneData['apps']['map']['visited'] }) {
  const topPlaces = places.slice(0, 3);
  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[8px]">📍</span>
        <span className="text-[8px] font-bold" style={{ color: 'var(--text-primary)' }}>
          {places.length}곳 방문
        </span>
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        {topPlaces.map((place, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="text-[7px]">{place.emoji}</span>
            <span className="text-[7px] truncate" style={{ color: 'var(--text-secondary)' }}>
              {place.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 방명록: 최근 메시지 ──
function GuestbookPreview({ entries }: { entries: PhoneData['apps']['guestbook']['initialEntries'] }) {
  const recent = entries.filter((e) => !e.isOwner).slice(0, 3);
  return (
    <div className="flex flex-col p-2 gap-0.5 h-full">
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-[8px]">💌</span>
        <span className="text-[7px] font-bold" style={{ color: 'var(--text-primary)' }}>방명록</span>
      </div>
      {recent.length === 0 && (
        <span className="text-[7px]" style={{ color: 'var(--text-tertiary)' }}>아직 글이 없어요</span>
      )}
      {recent.map((entry, i) => (
        <div
          key={i}
          className="px-1.5 py-0.5 rounded"
          style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent 94%)' }}
        >
          <span className="text-[6px] font-bold" style={{ color: 'var(--accent)' }}>{entry.author}</span>
          <span className="text-[6px] ml-1 truncate block" style={{ color: 'var(--text-secondary)' }}>
            {entry.message}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── SNS: 최근 포스트 ──
function SocialPreview({ feeds }: { feeds: PhoneData['apps']['social']['feeds'] }) {
  const first = feeds[0];
  if (!first) {
    return <div className="flex items-center justify-center h-full text-lg opacity-30">🌐</div>;
  }
  const platformIcon = first.platform === 'twitter' ? '🐦' : first.platform === 'youtube' ? '▶️' : '📌';
  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[8px]">{platformIcon}</span>
        <span className="text-[7px] font-bold" style={{ color: 'var(--text-primary)' }}>{first.platform}</span>
      </div>
      <div
        className="text-[7px] leading-[1.3] flex-1 overflow-hidden"
        style={{
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {first.text}
      </div>
    </div>
  );
}

// ── 메시지: 미리보기 ──
function MessagesPreview({ messages }: { messages: PhoneData['apps']['messages'] }) {
  const recent = messages.slice(0, 3);
  return (
    <div className="flex flex-col p-2 gap-0.5 h-full">
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-[8px]">💬</span>
        <span className="text-[7px] font-bold" style={{ color: 'var(--text-primary)' }}>메시지</span>
      </div>
      {recent.length === 0 && (
        <span className="text-[7px]" style={{ color: 'var(--text-tertiary)' }}>메시지 없음</span>
      )}
      {recent.map((msg, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="text-[6px] font-bold shrink-0" style={{ color: 'var(--accent)' }}>{msg.from}</span>
          <span className="text-[6px] truncate" style={{ color: 'var(--text-tertiary)' }}>{msg.preview}</span>
        </div>
      ))}
    </div>
  );
}

// ── 위시리스트: 아이템 ──
function WishlistPreview({ items }: { items: PhoneData['apps']['wishlistShop']['items'] }) {
  if (items.length === 0) {
    return <div className="flex items-center justify-center h-full text-lg opacity-30">🛍️</div>;
  }
  const first = items[0];
  return (
    <div className="flex flex-col items-center justify-center h-full p-2 gap-0.5">
      <span className="text-lg">{first.emoji}</span>
      <span
        className="text-[8px] font-bold truncate w-full text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        {first.name}
      </span>
      <span className="text-[7px] font-semibold" style={{ color: 'var(--accent)' }}>
        ₩{first.price.toLocaleString()}
      </span>
    </div>
  );
}
