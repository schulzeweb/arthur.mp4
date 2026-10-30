import React, { useState } from 'react';
import { UserProfile, LinkItem, ThemeId, DirectMessage } from '../types';
import { THEMES, ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Edit3,
  Check,
  IconResolver,
  Coffee,
  Bookmark,
  Sparkles,
  Download,
  Copy
} from './IconResolver';

interface StudioEditorProps {
  profile: UserProfile;
  links: LinkItem[];
  messages: DirectMessage[];
  theme: ThemeConfig;
  soundEnabled: boolean;
  onUpdateProfile: (updated: UserProfile) => void;
  onUpdateLinks: (links: LinkItem[]) => void;
  onDeleteMessage: (msgId: string) => void;
  onResetDefaults: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({
  profile,
  links,
  messages,
  theme,
  soundEnabled,
  onUpdateProfile,
  onUpdateLinks,
  onDeleteMessage,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'themes' | 'inbox'>('links');

  // New Link form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'social' | 'work' | 'contact' | 'content'>('work');
  const [newIcon, setNewIcon] = useState('globe');
  const [newBadge, setNewBadge] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Link modification functions
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    soundEngine.playClick(soundEnabled);

    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      url: newUrl.trim().startsWith('http') || newUrl.startsWith('mailto:') || newUrl.startsWith('tel:') || newUrl.startsWith('#')
        ? newUrl.trim()
        : `https://${newUrl.trim()}`,
      category: newCategory,
      icon: newIcon,
      badge: newBadge.trim() || undefined,
      isPinned: newIsPinned,
      clicks: 0,
    };

    onUpdateLinks([newLink, ...links]);
    setNewTitle('');
    setNewUrl('');
    setNewSubtitle('');
    setNewBadge('');
    setNewIsPinned(false);
    setShowAddForm(false);
  };

  const handleDeleteLink = (id: string) => {
    soundEngine.playClick(soundEnabled);
    onUpdateLinks(links.filter((l) => l.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    soundEngine.playClick(soundEnabled);
    const newLinks = [...links];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newLinks.length) return;

    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIdx];
    newLinks[targetIdx] = temp;
    onUpdateLinks(newLinks);
  };

  const handleTogglePin = (id: string) => {
    soundEngine.playClick(soundEnabled);
    onUpdateLinks(
      links.map((l) => (l.id === id ? { ...l, isPinned: !l.isPinned } : l))
    );
  };

  // Export JSON
  const handleExportJson = () => {
    const data = { profile, links };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biohub_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Studio Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-100">
            Estúdio Criador & Personalização
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Gerencie cada elemento do seu agrupador de links em tempo real
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar JSON</span>
          </button>
          <button
            onClick={onResetDefaults}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            Restaurar Padrões
          </button>
        </div>
      </div>

      {/* Segmented Mode Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 border border-white/10 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('links')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'links'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Links & Redes ({links.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Perfil & Biografia
        </button>

        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'themes'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Temas & Estilos
        </button>

        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'inbox'
              ? `${theme.accent} shadow-sm font-semibold`
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>Recados Diretos</span>
          {messages.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
              {messages.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: LINKS MANAGEMENT */}
      {activeTab === 'links' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-neutral-400">
              Arraste ou use as setas para reordenar a prioridade dos links
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg ${theme.accent} flex items-center gap-1.5 cursor-pointer shadow-sm`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Fechar Formulário' : 'Novo Link'}</span>
            </button>
          </div>

          {/* Add Link Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddLink}
              className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} space-y-3 animate-fade-in`}
            >
              <h3 className="text-sm font-semibold text-neutral-200">
                Adicionar Novo Link ou Canal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Título Principal *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Novo Repositório no GitHub"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">URL de Destino *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Subtítulo ou Descrição curta</label>
                  <input
                    type="text"
                    placeholder="Ex: Código aberto com documentação"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Badge de Destaque</label>
                  <input
                    type="text"
                    placeholder="Ex: Novo, Destaque, Ao Vivo"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Ícone</label>
                  <select
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="globe">Globo / Site Geral</option>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="calendar">Calendário / Cal.com</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">X / Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="mail">E-mail</option>
                    <option value="code">Código / Dev</option>
                    <option value="file-text">Documento / PDF</option>
                    <option value="coffee">Café / Apoio</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="work">Trabalho & Código</option>
                    <option value="contact">Contato</option>
                    <option value="content">Conteúdo & Mídia</option>
                    <option value="social">Rede Social</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={newIsPinned}
                  onChange={(e) => setNewIsPinned(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="pinCheck" className="text-xs text-neutral-300 cursor-pointer">
                  Fixar no topo como destaque principal
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-xs font-semibold rounded-lg ${theme.accent}`}
                >
                  Adicionar Link
                </button>
              </div>
            </form>
          )}

          {/* Links List */}
          <div className="space-y-2.5">
            {links.map((link, idx) => (
              <div
                key={link.id}
                className={`p-3.5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                    <IconResolver name={link.icon} className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-neutral-200 truncate">
                        {link.title}
                      </span>
                      {link.isPinned && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-700 text-emerald-400">
                          Fixado
                        </span>
                      )}
                      {link.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono-code truncate block">
                      {link.url}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleTogglePin(link.id)}
                    title={link.isPinned ? 'Desafixar' : 'Fixar'}
                    className={`p-1.5 rounded-lg border border-white/10 ${
                      link.isPinned ? 'text-emerald-400 bg-emerald-500/10' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para cima"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    disabled={idx === links.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para baixo"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                    title="Remover link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE & IDENTITY */}
      {activeTab === 'profile' && (
        <div className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} space-y-4`}>
          <h3 className="text-sm font-semibold text-neutral-200">
            Informações do Perfil & Identidade Digital
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Nome Completo</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">Identificador / Handle</label>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) => onUpdateProfile({ ...profile, handle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-neutral-400 block mb-1">Tagline Profissional</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => onUpdateProfile({ ...profile, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-neutral-400 block mb-1">Biografia Curta</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => onUpdateProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">Localização</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => onUpdateProfile({ ...profile, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">E-mail Principal</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onUpdateProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">Status de Disponibilidade</label>
              <input
                type="text"
                value={profile.availability.text}
                onChange={(e) =>
                  onUpdateProfile({
                    ...profile,
                    availability: { ...profile.availability, text: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">Link de Agendamento (Cal.com / Calendly)</label>
              <input
                type="text"
                value={profile.availability.scheduleUrl}
                onChange={(e) =>
                  onUpdateProfile({
                    ...profile,
                    availability: { ...profile.availability, scheduleUrl: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg text-xs bg-black/50 border border-white/10 text-neutral-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THEMES & STYLING */}
      {activeTab === 'themes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
              const th = THEMES[themeKey];
              const isSelected = profile.theme === themeKey;

              return (
                <button
                  key={themeKey}
                  onClick={() => {
                    soundEngine.playClick(soundEnabled);
                    onUpdateProfile({ ...profile, theme: themeKey });
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'border-white/10 hover:border-white/20'
                  } ${th.cardBg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-neutral-200">
                      {th.name}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
                    {th.tagline}
                  </p>

                  {/* Micro color preview palette */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                    <div className="w-4 h-4 rounded-full bg-black border border-white/20" />
                    <div className={`w-4 h-4 rounded-full ${th.accent}`} />
                    <div className="w-4 h-4 rounded-full bg-neutral-700" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: INBOX / DIRECT MESSAGES */}
      {activeTab === 'inbox' && (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <Coffee className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-sm text-neutral-300 font-semibold">Caixa de entrada vazia</p>
              <p className="text-xs text-neutral-500 mt-1">
                Quando alguém deixar um recado pelo widget no seu BioHub, ele aparecerá aqui.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between gap-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-200">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono-code">
                      ({msg.senderContact})
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono-code">
                    {new Date(msg.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                  "{msg.message}"
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onDeleteMessage(msg.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
