import React, { useState, useEffect } from 'react';
import { ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import { Play, Pause, Volume2, Music, Sparkle } from './IconResolver';

interface AudioPlayerWidgetProps {
  theme: ThemeConfig;
  soundEnabled: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({ theme, soundEnabled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [bars, setBars] = useState<number[]>([14, 24, 18, 30, 22, 36, 16, 20]);

  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const loop = () => {
        setBars(soundEngine.getVisualizerData());
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    } else {
      setBars([10, 16, 12, 18, 14, 20, 12, 14]);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleToggle = () => {
    soundEngine.playClick(soundEnabled);
    const newState = soundEngine.toggleAmbient((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-xl relative overflow-hidden group`}>
      {/* Background soft glow */}
      <div
        className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: theme.glow }}
      />

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Lofi & Flow Sonoro
              </span>
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <p className="text-sm font-medium text-neutral-200 line-clamp-1">
              Late Night Focus · Ambient Chords
            </p>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handleToggle}
          title={isPlaying ? 'Pausar áudio sintetizado' : 'Tocar áudio sintetizado'}
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.accent} transition-transform active:scale-95 shadow-md cursor-pointer shrink-0`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Interactive Visualizer Waveform */}
      <div className="h-10 w-full flex items-end justify-between gap-1.5 py-1 px-2 rounded-lg bg-black/30 border border-white/5 my-3">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-all duration-100"
            style={{
              height: `${Math.min(100, Math.max(15, (height / 40) * 100))}%`,
              background: isPlaying
                ? `linear-gradient(to top, #10b981, #38bdf8)`
                : `rgba(255,255,255,0.15)`,
            }}
          />
        ))}
      </div>

      {/* Volume & Details */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
        <div className="flex items-center gap-2 flex-1 max-w-[140px]">
          <Volume2 className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            title="Volume"
          />
        </div>
        <span className="font-mono-code text-[11px] text-neutral-400">
          {isPlaying ? 'Sintetizador 432Hz' : 'Pausado'}
        </span>
      </div>
    </div>
  );
};
