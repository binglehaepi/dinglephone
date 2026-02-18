import React, { useState, useEffect } from 'react';
import { ChevronDown, MoreHorizontal, Play, Pause, SkipBack, SkipForward, ListMusic, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { DinglePhoneData } from '../../types';
import { usePhone } from '../../context/PhoneContext';
import { EditSheet, DingleInput, SaveButton } from '../EditSheet';

interface MusicAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

// Extract YouTube video ID from various URL formats
function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  // youtube.com/watch?v=XXX
  const match1 = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (match1) return match1[1];
  // youtu.be/XXX
  const match2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match2) return match2[1];
  // youtube.com/embed/XXX
  const match3 = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match3) return match3[1];
  // youtube.com/shorts/XXX
  const match4 = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (match4) return match4[1];
  // Bare ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

export const MusicApp: React.FC<MusicAppProps> = ({ data, onClose }) => {
  const { isEditable, currentPhone, updateAppData } = usePhone();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showList, setShowList] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newEmoji, setNewEmoji] = useState('🎵');
  const [newDuration, setNewDuration] = useState('3:30');
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');

  const songs = data.apps.music.songs;
  const currentSong = songs[currentSongIndex] || songs[0];
  const nextSong = songs.length > 1 ? songs[(currentSongIndex + 1) % songs.length] : null;

  useEffect(() => {
    let interval: any;
    if (isPlaying && songs.length > 0 && !currentSong?.youtubeId) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, songs.length, currentSong?.youtubeId]);

  const handleNext = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const openExternal = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !currentPhone) return;
    const colors = ['#E8D6FF', '#FFD6E8', '#D6F0FF', '#FFE0D6', '#FFD6D6', '#FFF3D6', '#D6FFE8'];
    const youtubeId = extractYoutubeId(newYoutubeUrl);
    const updated = {
      ...currentPhone.apps.music,
      songs: [...currentPhone.apps.music.songs, {
        title: newTitle,
        artist: newArtist || 'Unknown',
        albumEmoji: newEmoji || '🎵',
        albumColor: colors[Math.floor(Math.random() * colors.length)],
        duration: newDuration || '3:30',
        youtubeId: youtubeId || undefined,
        sourceUrl: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined,
      }],
    };
    updateAppData('music', updated);
    setShowAdd(false);
    setNewTitle('');
    setNewArtist('');
    setNewEmoji('🎵');
    setNewDuration('3:30');
    setNewYoutubeUrl('');
  };

  const handleDelete = (index: number) => {
    if (!currentPhone) return;
    const updated = {
      ...currentPhone.apps.music,
      songs: currentPhone.apps.music.songs.filter((_, i) => i !== index),
    };
    updateAppData('music', updated);
    if (currentSongIndex >= updated.songs.length) {
      setCurrentSongIndex(Math.max(0, updated.songs.length - 1));
    }
    setShowList(false);
  };

  if (songs.length === 0) {
    return (
      <div className="flex flex-col h-full bg-cream-100 text-ink items-center justify-center">
        <div className="text-5xl mb-4">🎵</div>
        <p className="text-ink-secondary mb-4">아직 곡이 없어요</p>
        {isEditable && (
          <button
            onClick={() => setShowAdd(true)}
            className="text-sm font-bold px-4 py-2 rounded-full"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            + 첫 곡 추가
          </button>
        )}
        <button onClick={onClose} className="mt-4 text-xs text-ink-tertiary">← 돌아가기</button>
        <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="🎵 곡 추가">
          <DingleInput label="YouTube URL" value={newYoutubeUrl} onChange={setNewYoutubeUrl} placeholder="https://www.youtube.com/watch?v=..." />
          <DingleInput label="곡 제목" value={newTitle} onChange={setNewTitle} placeholder="노래 제목" />
          <DingleInput label="아티스트" value={newArtist} onChange={setNewArtist} placeholder="가수/아티스트" />
          <DingleInput label="이모지 (YouTube 없을 때)" value={newEmoji} onChange={setNewEmoji} placeholder="🎵" />
          <DingleInput label="재생 시간" value={newDuration} onChange={setNewDuration} placeholder="3:30" />
          <SaveButton onClick={handleAdd} disabled={!newTitle.trim()} label="추가" />
        </EditSheet>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-cream-100 text-ink relative overflow-hidden">
      {/* Background Decor */}
      <div 
        className="absolute -top-[20%] -right-[20%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000"
        style={{ background: currentSong.albumColor }}
      />
      
      {/* Header */}
      <div className="pt-[54px] px-6 flex items-center justify-between relative z-10">
           <button onClick={onClose} className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center">
             <ChevronDown size={16} className="text-ink" />
           </button>
           <span className="text-sm font-bold tracking-widest uppercase text-ink-secondary font-display">
             Playlist
           </span>
           <div className="flex items-center gap-2">
             {isEditable && (
               <button
                 onClick={() => setShowAdd(true)}
                 className="w-8 h-8 rounded-xl flex items-center justify-center"
                 style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
               >
                 <Plus size={14} />
               </button>
             )}
             <button
               onClick={() => currentSong.sourceUrl ? openExternal(currentSong.sourceUrl) : setShowList(!showList)}
               className="w-8 h-8 rounded-xl bg-cream-200 flex items-center justify-center text-ink-secondary"
             >
               {currentSong.sourceUrl ? <ExternalLink size={14} /> : <ListMusic size={14} />}
             </button>
           </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-8 relative z-10 pt-4">
        {/* Album Art / YouTube Embed */}
        <div className="w-full aspect-square flex items-center justify-center mb-6">
          {currentSong.youtubeId ? (
            <div className="w-full h-full rounded-dingle-lg shadow-elevated overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?rel=0`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          ) : (
            <div 
               className="w-full h-full rounded-dingle-lg shadow-elevated flex items-center justify-center text-[100px] border border-cream-300 relative overflow-hidden bg-cream-50 cursor-pointer"
               onClick={() => openExternal(currentSong.sourceUrl)}
            >
               <div className="absolute inset-0 opacity-20" style={{background: currentSong.albumColor}}></div>
               <div 
                className={`transition-transform duration-[10000ms] linear ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
               >
                  {currentSong.albumEmoji}
               </div>
               {currentSong.sourceUrl && (
                  <div className="absolute bottom-3 right-3 bg-ink/60 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                      <ExternalLink size={10} /> 원본 듣기
                  </div>
               )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-1 font-display text-ink">{currentSong.title}</h2>
            <p className="text-ink-secondary font-medium text-sm">{currentSong.artist}</p>
        </div>

        {/* Progress (only for non-YouTube songs) */}
        {!currentSong.youtubeId && (
          <div className="mb-6">
             <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-dingle rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
             </div>
             <div className="flex justify-between text-xs font-medium text-ink-tertiary font-display">
                <span>{(progress * 0.01 * 3.5).toFixed(2).replace('.',':')}</span>
                <span>-{((100 - progress) * 0.01 * 3.5).toFixed(2).replace('.',':')}</span>
             </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-between items-center px-4 mb-6">
           <button onClick={handlePrev} className="text-ink-secondary hover:text-ink transition-colors">
              <SkipBack size={28} fill="currentColor" />
           </button>
           <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="w-14 h-14 rounded-full bg-dingle text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-dingle/30"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
           </button>
           <button onClick={handleNext} className="text-ink-secondary hover:text-ink transition-colors">
              <SkipForward size={28} fill="currentColor" />
           </button>
        </div>
      </div>
      
      {/* Playlist Preview */}
      {nextSong && (
        <div className="h-[120px] bg-cream-50 rounded-t-[32px] shadow-card border-t border-cream-300 p-5">
           <div className="flex items-center gap-2 text-ink-secondary mb-3">
              <ListMusic size={16} />
              <span className="text-xs font-bold">Up Next</span>
           </div>
           <div
             className="flex items-center justify-between p-2.5 bg-cream-200 rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
             onClick={handleNext}
           >
               <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-dingle-icon flex items-center justify-center text-lg" style={{backgroundColor: nextSong.albumColor}}>
                      {nextSong.youtubeId ? '▶' : nextSong.albumEmoji}
                   </div>
                   <div className="flex flex-col">
                       <span className="text-sm font-bold text-ink">{nextSong.title}</span>
                       <span className="text-xs text-ink-tertiary">{nextSong.artist}</span>
                   </div>
               </div>
               {isEditable && (
                 <button
                   onClick={(e) => { e.stopPropagation(); handleDelete((currentSongIndex + 1) % songs.length); }}
                   className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center"
                 >
                   <Trash2 size={10} className="text-red-400" />
                 </button>
               )}
           </div>
        </div>
      )}

      {/* Add Song Sheet */}
      <EditSheet isOpen={showAdd} onClose={() => setShowAdd(false)} title="🎵 곡 추가">
        <DingleInput label="YouTube URL (선택)" value={newYoutubeUrl} onChange={setNewYoutubeUrl} placeholder="https://www.youtube.com/watch?v=..." />
        {newYoutubeUrl && extractYoutubeId(newYoutubeUrl) && (
          <div className="mb-3 rounded-xl overflow-hidden border border-cream-300">
            <img
              src={`https://img.youtube.com/vi/${extractYoutubeId(newYoutubeUrl)}/mqdefault.jpg`}
              alt="YouTube thumbnail"
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        <DingleInput label="곡 제목" value={newTitle} onChange={setNewTitle} placeholder="노래 제목" />
        <DingleInput label="아티스트" value={newArtist} onChange={setNewArtist} placeholder="가수/아티스트" />
        {!newYoutubeUrl && (
          <DingleInput label="앨범 이모지" value={newEmoji} onChange={setNewEmoji} placeholder="🎵" />
        )}
        <DingleInput label="재생 시간" value={newDuration} onChange={setNewDuration} placeholder="3:30" />
        <SaveButton onClick={handleAdd} disabled={!newTitle.trim()} label="추가" />
      </EditSheet>
    </div>
  );
};
