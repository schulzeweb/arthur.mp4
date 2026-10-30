import React from 'react';
import { UserProfile, LinkItem, ProjectItem, SkillItem, DirectMessage } from '../types';
import { ThemeConfig } from '../utils/theme';
import { ProfileHeader } from './ProfileHeader';
import { BentoGrid } from './BentoGrid';
import { LinksStream } from './LinksStream';
import { Smartphone } from './IconResolver';

interface MobileDeviceFrameProps {
  profile: UserProfile;
  links: LinkItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  theme: ThemeConfig;
  soundEnabled: boolean;
  onTrackLinkClick: (linkId: string, url: string) => void;
  onSendMessage: (msg: DirectMessage) => void;
  onOpenQr: () => void;
  onDownloadVCard: () => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  profile,
  links,
  projects,
  skills,
  theme,
  soundEnabled,
  onTrackLinkClick,
  onSendMessage,
  onOpenQr,
  onDownloadVCard,
}) => {
  const [internalMode, setInternalMode] = React.useState<'feed' | 'bento'>('feed');

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2">
      {/* Device Mode Switcher */}
      <div className="mb-6 flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setInternalMode('feed')}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            internalMode === 'feed'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Visual Feed Mobile
        </button>
        <button
          onClick={() => setInternalMode('bento')}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            internalMode === 'bento'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Visual Bento Mobile
        </button>
      </div>

      {/* iPhone 16 Pro Mockup Chassis */}
      <div className="relative w-full max-w-[400px] h-[780px] rounded-[52px] p-3.5 bg-neutral-900 border-[7px] border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col">
        {/* Dynamic Island Pill */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5 pointer-events-none border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Screen Frame */}
        <div className={`w-full h-full rounded-[42px] overflow-y-auto ${theme.containerBg} ${theme.bodyClass} pt-8 pb-12 px-3 relative scrollbar-none`}>
          <ProfileHeader
            profile={profile}
            theme={theme}
            onTrackClick={(id) => onTrackLinkClick(id, '#')}
          />

          <div className="mt-4">
            {internalMode === 'feed' ? (
              <LinksStream
                links={links}
                theme={theme}
                soundEnabled={soundEnabled}
                onTrackLinkClick={onTrackLinkClick}
                onDownloadVCard={onDownloadVCard}
              />
            ) : (
              <BentoGrid
                profile={profile}
                links={links}
                projects={projects}
                skills={skills}
                theme={theme}
                soundEnabled={soundEnabled}
                onTrackLinkClick={onTrackLinkClick}
                onSendMessage={onSendMessage}
                onOpenQr={onOpenQr}
                onDownloadVCard={onDownloadVCard}
              />
            )}
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full pointer-events-none z-50" />
      </div>
    </div>
  );
};
