import React, { useState, useEffect } from 'react';
import { ChevronDown, MoreHorizontal, Play, Pause, SkipBack, SkipForward, ListMusic } from 'lucide-react';
import { DinglePhoneData } from '../../types';

interface MusicAppProps {
  data: DinglePhoneData;
  onClose: () => void;
}

export const MusicApp: React.FC<MusicAppProps> = ({ data, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const songs = data.apps.music.songs;
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary relative overflow-hidden">
      {/* Background Decor */}
      <div 
        className="absolute -top-[20%] -right-[20%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-30 transition-colors duration-1000"
        style={{ background: currentSong.albumColor }}
      />
      
      {/* Header */}
      <div className="pt-[54px] px-6 flex items-center justify-between relative z-10">
           <button onClick={onClose} className="text-text-secondary">
             <ChevronDown />
           </button>
           <span className="text-sm font-bold tracking-widest uppercase text-text-secondary font-display">
             Playlist
           </span>
           <button className="text-text-secondary">
             <MoreHorizontal />
           </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-8 relative z-10 pt-4">
        {/* Album Art */}
        <div className="w-full aspect-square flex items-center justify-center mb-10">
          <div 
             className="w-full h-full rounded-[24px] shadow-soft flex items-center justify-center text-[100px] border border-white/50 relative overflow-hidden bg-white"
          >
             <div className="absolute inset-0 opacity-20" style={{background: currentSong.albumColor}}></div>
             <div 
              className={`transition-transform duration-[10000ms] linear ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
             >
                {currentSong.albumEmoji}
             </div>
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-1 font-display">{currentSong.title}</h2>
            <p className="text-text-secondary font-medium">{currentSong.artist}</p>
        </div>

        {/* Progress */}
        <div className="mb-10">
           <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden mb-2">
              <div className="h-full bg-accent rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
           </div>
           <div className="flex justify-between text-xs font-medium text-text-tertiary font-display">
              <span>{(progress * 0.01 * 3.5).toFixed(2).replace('.',':')}</span>
              <span>-{((100 - progress) * 0.01 * 3.5).toFixed(2).replace('.',':')}</span>
           </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-4 mb-8">
           <button onClick={handlePrev} className="text-text-secondary hover:text-text-primary transition-colors">
              <SkipBack size={32} fill="currentColor" />
           </button>
           <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-accent/30"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
           </button>
           <button onClick={handleNext} className="text-text-secondary hover:text-text-primary transition-colors">
              <SkipForward size={32} fill="currentColor" />
           </button>
        </div>
      </div>
      
      {/* Playlist Preview */}
      <div className="h-[140px] bg-white rounded-t-[32px] shadow-soft p-6">
         <div className="flex items-center gap-2 text-text-secondary mb-4">
            <ListMusic size={18} />
            <span className="text-sm font-bold">Up Next</span>
         </div>
         <div className="flex items-center justify-between p-3 bg-bg-secondary rounded-xl">
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-sub-peach flex items-center justify-center text-lg">🍑</div>
                 <div className="flex flex-col">
                     <span className="text-sm font-bold">Peaches</span>
                     <span className="text-xs text-text-tertiary">Justin Bieber</span>
                 </div>
             </div>
             <div className="w-6 h-6 rounded-full border border-text-tertiary flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-accent"></div>
             </div>
         </div>
      </div>
    </div>
  );
};