import React from 'react';
import { UserProfile, LinkItem, ProjectItem, SkillItem, DirectMessage } from '../types';
import { ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import { AudioPlayerWidget } from './AudioPlayerWidget';
import { DirectMessageWidget } from './DirectMessageWidget';
import {
  IconResolver,
  ArrowUpRight,
  Github,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Code2,
  Calendar,
  Layers
} from './IconResolver';

interface BentoGridProps {
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

export const BentoGrid: React.FC<BentoGridProps> = ({
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
  const primaryProject = projects[0];
  const secondaryProject = projects[1];

  const handleLinkPress = (id: string, url: string) => {
    soundEngine.playClick(soundEnabled);
    if (url === '#vcard') {
      onDownloadVCard();
    } else {
      onTrackLinkClick(id, url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* 1. Primary Project Spotlight (Col-span 2 on large screens) */}
      {primaryProject && (
        <div className={`md:col-span-2 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} overflow-hidden flex flex-col justify-between group hover:border-neutral-500/40 transition-all duration-300 shadow-md`}>
          <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-900">
            <img
              src={primaryProject.imageUrl}
              alt={primaryProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-md bg-black/60 border border-white/10 text-neutral-200">
                {primaryProject.category}
              </span>
              <span className="text-xs font-mono-code px-2 py-0.5 rounded backdrop-blur-md bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
                {primaryProject.metric}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                {primaryProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                {primaryProject.description}
              </p>

              {/* Clean unboxed tags with typographic separator */}
              <div className="flex items-center flex-wrap gap-2 text-xs text-neutral-400 mt-4">
                {primaryProject.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="font-mono-code text-[11px] text-neutral-300">
                      #{tag}
                    </span>
                    {idx < primaryProject.tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
              <button
                onClick={() => handleLinkPress('proj-demo-1', primaryProject.demoUrl)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold ${theme.accent} transition-transform active:scale-95 cursor-pointer`}
              >
                <span>Ver Demonstração</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {primaryProject.repoUrl && (
                <button
                  onClick={() => handleLinkPress('proj-repo-1', primaryProject.repoUrl!)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Código-Fonte</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Synthesizer Audio Player Widget */}
      <div className="flex flex-col gap-5">
        <AudioPlayerWidget theme={theme} soundEnabled={soundEnabled} />

        {/* 3. Availability & Direct Coffee Schedule */}
        <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Disponibilidade
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-200">
              Consultoria & Desenvolvimento Sob Demanda
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Atendimento para startups e empresas com foco em escala e IA.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono-code tabular-nums text-neutral-400">
              Agenda Aberta
            </span>
            <button
              onClick={() => handleLinkPress('cal-widget', profile.availability.scheduleUrl)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span>Reservar Horário</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick Interactive Links Strip (Curated high-priority links) */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display text-base font-bold text-neutral-200">
            Canais Principais & Conexões
          </h3>
          <span className="text-xs text-neutral-400 font-mono-code">
            {links.length} links ativos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.slice(0, 6).map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkPress(link.id, link.url)}
              className={`w-full text-left p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} ${theme.cardHover} transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 group-hover:text-emerald-400 group-hover:scale-110 transition-all shrink-0">
                  <IconResolver name={link.icon} className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-neutral-100 truncate group-hover:text-emerald-300 transition-colors">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono-code bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {link.subtitle && (
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {link.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono-code tabular-nums text-neutral-500 group-hover:text-neutral-400">
                  {link.clicks}
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Direct Message Widget */}
      <div className="lg:col-span-1">
        <DirectMessageWidget
          theme={theme}
          soundEnabled={soundEnabled}
          onSendMessage={onSendMessage}
        />
      </div>

      {/* 6. Technical Stack & Skills Bento */}
      <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} lg:col-span-2 flex flex-col justify-between`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-100">
                Stack Tecnológica & Engenharia
              </h3>
              <p className="text-xs text-neutral-400">
                Tecnologias dominadas na prática em projetos reais
              </p>
            </div>
          </div>
          <span className="text-xs font-mono-code text-neutral-500">
            {skills.length} competências
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-neutral-200 truncate">
                  {skill.name}
                </span>
                <span className="font-mono-code tabular-nums text-neutral-400 text-[11px]">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-400 mt-1.5 block">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Secondary Project Card (Design & UI System) */}
      {secondaryProject && (
        <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between group hover:border-neutral-500/40 transition-all`}>
          <div>
            <div className="h-36 rounded-xl overflow-hidden mb-3 relative bg-neutral-900">
              <img
                src={secondaryProject.imageUrl}
                alt={secondaryProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-black/70 border border-white/10 text-neutral-200">
                  {secondaryProject.metric}
                </span>
              </div>
            </div>

            <h4 className="font-display text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
              {secondaryProject.title}
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed line-clamp-2">
              {secondaryProject.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => handleLinkPress('proj-demo-2', secondaryProject.demoUrl)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Explorar Projeto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-neutral-500 font-mono-code">
              Design Engineering
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
