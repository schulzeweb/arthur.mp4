import React, { useState } from 'react';
import { LinkItem } from '../types';
import { ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import { IconResolver, ArrowUpRight, Search } from './IconResolver';

interface LinksStreamProps {
  links: LinkItem[];
  theme: ThemeConfig;
  soundEnabled: boolean;
  onTrackLinkClick: (linkId: string, url: string) => void;
  onDownloadVCard: () => void;
}

export const LinksStream: React.FC<LinksStreamProps> = ({
  links,
  theme,
  soundEnabled,
  onTrackLinkClick,
  onDownloadVCard,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Links' },
    { id: 'work', label: 'Projetos & Code' },
    { id: 'contact', label: 'Contato Direto' },
    { id: 'content', label: 'Conteúdo & Vídeo' },
    { id: 'social', label: 'Redes Sociais' },
  ];

  const filteredLinks = links.filter((link) => {
    const matchesCategory =
      activeCategory === 'all' || link.category === activeCategory;
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.subtitle && link.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar links, redes ou canais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
        </div>

        {/* Category Segmented Control (Interactive button filter tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playClick(soundEnabled);
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? `${theme.accent} shadow-sm font-semibold`
                  : 'bg-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Links Stack */}
      <div className="space-y-3">
        {filteredLinks.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-neutral-400">Nenhum link encontrado para sua busca.</p>
          </div>
        ) : (
          filteredLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkPress(link.id, link.url)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} ${theme.cardHover} transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer shadow-sm relative overflow-hidden`}
            >
              {link.isPinned && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
              )}

              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 group-hover:text-emerald-400 group-hover:scale-105 transition-all shrink-0">
                  <IconResolver name={link.icon} className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-emerald-300 transition-colors truncate">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-mono-code bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  {link.subtitle && (
                    <p className="text-xs text-neutral-400 mt-0.5 truncate">
                      {link.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono-code tabular-nums mt-1">
                    <span>{link.clicks} acessos</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{link.url.replace(/^https?:\/\//, '')}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald-500 group-hover:text-neutral-950 text-neutral-400 transition-all">
                <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
