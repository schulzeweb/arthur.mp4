import React from 'react';
import { UserProfile, LinkItem } from '../types';
import { ThemeConfig } from '../utils/theme';
import { BarChart3, Eye, ArrowUpRight, IconResolver } from './IconResolver';

interface AnalyticsViewProps {
  profile: UserProfile;
  links: LinkItem[];
  theme: ThemeConfig;
  totalViews: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  profile,
  links,
  theme,
  totalViews,
}) => {
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

  const sortedLinks = [...links].sort((a, b) => b.clicks - a.clicks);
  const maxClicks = Math.max(...links.map((l) => l.clicks), 1);

  // Group by category
  const categoriesCount = links.reduce<Record<string, number>>((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + l.clicks;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-100">
          Métricas de Engajamento & Acessos
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Estatísticas consolidadas de cliques e desempenho do perfil
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span>Visualizações Totais</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-display text-3xl font-bold text-neutral-100 font-mono-code tabular-nums">
            {totalViews.toLocaleString('pt-BR')}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Acessos ao seu BioHub
          </span>
        </div>

        <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span>Cliques Totais</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-display text-3xl font-bold text-neutral-100 font-mono-code tabular-nums">
            {totalClicks.toLocaleString('pt-BR')}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Interações com seus links
          </span>
        </div>

        <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span>Taxa de Conversão (CTR)</span>
            <BarChart3 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display text-3xl font-bold text-neutral-100 font-mono-code tabular-nums">
            {ctr}%
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Média de cliques por visitante
          </span>
        </div>
      </div>

      {/* Ranked Performance Breakdown */}
      <div className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-200">
            Desempenho por Canal & Link
          </h3>
          <span className="text-xs text-neutral-400 font-mono-code">
            Ordenado por popularidade
          </span>
        </div>

        <div className="space-y-3">
          {sortedLinks.map((link, idx) => {
            const percentage = Math.round((link.clicks / maxClicks) * 100);

            return (
              <div key={link.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-neutral-500 w-4">
                      {idx + 1}.
                    </span>
                    <IconResolver name={link.icon} className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-medium text-neutral-200">
                      {link.title}
                    </span>
                  </div>
                  <span className="font-mono-code tabular-nums text-neutral-400 font-semibold">
                    {link.clicks.toLocaleString('pt-BR')} cliques
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-neutral-800/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
