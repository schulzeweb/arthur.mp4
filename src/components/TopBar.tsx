import React from 'react';
import { LayoutMode } from '../types';
import { ThemeConfig } from '../utils/theme';
import { QrCode, Volume2, VolumeX, Download } from './IconResolver';

interface TopBarProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  activeView: 'hub' | 'editor' | 'analytics';
  setActiveView: (view: 'hub' | 'editor' | 'analytics') => void;
  theme: ThemeConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenQr: () => void;
  onDownloadVCard: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  layoutMode,
  setLayoutMode,
  activeView,
  setActiveView,
  theme,
  soundEnabled,
  onToggleSound,
  onOpenQr,
  onDownloadVCard,
}) => {
  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b ${theme.cardBorder} ${theme.cardBg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => {
            setActiveView('hub');
            setLayoutMode('bento');
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className={`font-display text-base sm:text-lg font-bold tracking-tight text-neutral-100 group-hover:${theme.accentText} transition-colors whitespace-nowrap`}>
            BIOHUB <span className="opacity-40">/</span> JUAN CARLOS
          </span>
        </button>

        {/* Zone 2: Navigation Links / Segmented Switcher */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => {
              setActiveView('hub');
              setLayoutMode('bento');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === 'hub' && layoutMode === 'bento'
                ? `${theme.accent} shadow-sm`
                : `${theme.textMuted} hover:${theme.textPrimary}`
            }`}
          >
            Bento Grid
          </button>

          <button
            onClick={() => {
              setActiveView('hub');
              setLayoutMode('stream');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === 'hub' && layoutMode === 'stream'
                ? `${theme.accent} shadow-sm`
                : `${theme.textMuted} hover:${theme.textPrimary}`
            }`}
          >
            Feed de Links
          </button>

          <button
            onClick={() => {
              setActiveView('hub');
              setLayoutMode('phone');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === 'hub' && layoutMode === 'phone'
                ? `${theme.accent} shadow-sm`
                : `${theme.textMuted} hover:${theme.textPrimary}`
            }`}
          >
            Simulador Celular
          </button>

          <button
            onClick={() => setActiveView('editor')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === 'editor'
                ? `${theme.accent} shadow-sm`
                : `${theme.textMuted} hover:${theme.textPrimary}`
            }`}
          >
            Estúdio Criador
          </button>

          <button
            onClick={() => setActiveView('analytics')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeView === 'analytics'
                ? `${theme.accent} shadow-sm`
                : `${theme.textMuted} hover:${theme.textPrimary}`
            }`}
          >
            Métricas
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar som tátil' : 'Ativar som tátil'}
            aria-label="Som tátil"
            className={`p-2 rounded-lg border ${theme.cardBorder} text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onDownloadVCard}
            title="Baixar Cartão de Contato (.vcf)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>vCard</span>
          </button>

          <button
            onClick={onOpenQr}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg ${theme.accent} shadow-sm transition-transform active:scale-95 whitespace-nowrap cursor-pointer`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR & Compartilhar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
