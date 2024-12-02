import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export function VideoPlayer({
  src,
  className = '',
  controls = true,
  autoPlay = false,
  muted = false,
  playsInline = true
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
      <video
        src={src}
        controls={isPlaying && controls}
        autoPlay={autoPlay}
        muted={muted}
        playsInline={playsInline}
        className={`absolute inset-0 w-full h-full object-contain ${className}`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
          onClick={handlePlay}
        >
          <button className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Play className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}