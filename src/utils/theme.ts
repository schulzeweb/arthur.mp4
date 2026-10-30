import { ThemeId } from '../types';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  bodyClass: string;
  containerBg: string;
  cardBg: string;
  cardBorder: string;
  cardHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentText: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
  heroOverlay: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  noir: {
    id: 'noir',
    name: 'Noir Studio',
    tagline: 'OLED Obsidian & Esmeralda Tátil',
    bodyClass: 'bg-[#09090b] text-[#f4f4f5]',
    containerBg: 'bg-[#09090b]',
    cardBg: 'bg-[#121215]/90',
    cardBorder: 'border-white/[0.08]',
    cardHover: 'hover:border-emerald-500/40 hover:bg-[#16161b]',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    accent: 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 border border-emerald-800/50',
    badgeText: 'text-emerald-300',
    glow: 'rgba(16, 185, 129, 0.15)',
    heroOverlay: 'from-[#09090b] via-[#09090b]/80 to-transparent',
  },
  atelier: {
    id: 'atelier',
    name: 'Editorial Atelier',
    tagline: 'Travertino Editorial & Tipografia Suíça',
    bodyClass: 'bg-[#f7f5f0] text-[#1c1917]',
    containerBg: 'bg-[#f7f5f0]',
    cardBg: 'bg-white/95',
    cardBorder: 'border-stone-300/80',
    cardHover: 'hover:border-stone-400 hover:shadow-md',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-700',
    textMuted: 'text-stone-500',
    accent: 'bg-[#c2410c] hover:bg-[#9a3412] text-white',
    accentText: 'text-[#c2410c]',
    badgeBg: 'bg-stone-100 border border-stone-200',
    badgeText: 'text-stone-800',
    glow: 'rgba(194, 65, 12, 0.08)',
    heroOverlay: 'from-[#f7f5f0] via-[#f7f5f0]/80 to-transparent',
  },
  aurora: {
    id: 'aurora',
    name: 'Cyber Aurora',
    tagline: 'Indigo Profundo & Glow Fotônico',
    bodyClass: 'bg-[#080c18] text-[#f1f5f9]',
    containerBg: 'bg-[#080c18]',
    cardBg: 'bg-[#0f172a]/75 backdrop-blur-md',
    cardBorder: 'border-cyan-500/20',
    cardHover: 'hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold',
    accentText: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/70 border border-cyan-800/60',
    badgeText: 'text-cyan-300',
    glow: 'rgba(56, 189, 248, 0.22)',
    heroOverlay: 'from-[#080c18] via-[#080c18]/80 to-transparent',
  },
  brutalist: {
    id: 'brutalist',
    name: 'Brutalist Craft',
    tagline: 'Alto Contraste & Geometria Pura',
    bodyClass: 'bg-[#0d0d0d] text-white',
    containerBg: 'bg-[#0d0d0d]',
    cardBg: 'bg-[#171717]',
    cardBorder: 'border-2 border-white/20',
    cardHover: 'hover:border-yellow-400 hover:bg-[#202020]',
    textPrimary: 'text-white',
    textSecondary: 'text-neutral-200',
    textMuted: 'text-neutral-400',
    accent: 'bg-yellow-400 hover:bg-yellow-300 text-black font-bold',
    accentText: 'text-yellow-400',
    badgeBg: 'bg-neutral-800 border-2 border-neutral-600',
    badgeText: 'text-yellow-300',
    glow: 'rgba(250, 204, 21, 0.15)',
    heroOverlay: 'from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent',
  },
  monolith: {
    id: 'monolith',
    name: 'Monolith Minimal',
    tagline: 'Grafite Arquitetônico & Silêncio Visual',
    bodyClass: 'bg-[#111318] text-[#e2e8f0]',
    containerBg: 'bg-[#111318]',
    cardBg: 'bg-[#181c24]/90',
    cardBorder: 'border-slate-800',
    cardHover: 'hover:border-slate-600 hover:bg-[#1e232d]',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-500',
    accent: 'bg-slate-200 hover:bg-white text-slate-900',
    accentText: 'text-slate-200',
    badgeBg: 'bg-slate-800/80 border border-slate-700',
    badgeText: 'text-slate-300',
    glow: 'rgba(226, 232, 240, 0.08)',
    heroOverlay: 'from-[#111318] via-[#111318]/80 to-transparent',
  },
};
