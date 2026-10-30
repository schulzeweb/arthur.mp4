import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { ThemeConfig } from '../utils/theme';
import { MapPin, Clock, Copy, Check, ExternalLink, Calendar } from './IconResolver';

interface ProfileHeaderProps {
  profile: UserProfile;
  theme: ThemeConfig;
  onTrackClick: (id: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, theme, onTrackClick }) => {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Live real-time clock for creator's timezone (São Paulo / BRT)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(now);
        setLocalTime(timeStr);
      } catch {
        setLocalTime('23:45');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full mb-8">
      {/* Banner Backdrop */}
      <div className="relative w-full h-44 sm:h-60 rounded-3xl overflow-hidden border border-white/10 shadow-lg">
        <img
          src={profile.bannerUrl}
          alt={`Banner de ${profile.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            // High-fidelity CSS fallback gradient
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.heroOverlay}`} />

        {/* Live Availability Ribbon */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <a
            href={profile.availability.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackClick('header-availability')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/15 text-xs font-medium text-white hover:bg-black/80 transition-colors shadow-sm`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profile.availability.text}</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Profile Overlap Info Box */}
      <div className="relative px-4 sm:px-8 -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Avatar and Identity */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
          {/* Avatar frame */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-white/20 to-white/5 border border-white/20 shadow-2xl backdrop-blur-xl">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  // Fallback lettermark
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {/* Online Indicator */}
            <span
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-950 shadow-md"
              title="Disponível agora"
            />
          </div>

          {/* Titles & Bio */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
                {profile.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded font-mono-code bg-neutral-800 text-neutral-300 border border-neutral-700">
                {profile.handle}
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-neutral-300">
              {profile.tagline}
            </p>

            {/* Unboxed Metadata with Typographic Separators */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-neutral-400 pt-0.5">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {profile.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-mono-code tabular-nums">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {localTime || 'São Paulo'} (UTC-3)
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code tabular-nums">
                {profile.stats.experience} de XP
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0 pt-2 sm:pt-0">
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-200 transition-all cursor-pointer shadow-sm`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Perfil</span>
              </>
            )}
          </button>

          <a
            href={profile.availability.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackClick('cal-hero-btn')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl ${theme.accent} shadow-md transition-all active:scale-95 cursor-pointer`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Reunião</span>
          </a>
        </div>
      </div>

      {/* Editorial Bio Statement */}
      <div className="px-4 sm:px-8 mt-5">
        <p className="text-sm leading-relaxed text-neutral-300 max-w-3xl">
          {profile.bio}
        </p>
      </div>
    </div>
  );
};
