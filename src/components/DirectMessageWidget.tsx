import React, { useState } from 'react';
import { DirectMessage } from '../types';
import { ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import { Send, Coffee, Check } from './IconResolver';

interface DirectMessageWidgetProps {
  theme: ThemeConfig;
  soundEnabled: boolean;
  onSendMessage: (msg: DirectMessage) => void;
}

export const DirectMessageWidget: React.FC<DirectMessageWidgetProps> = ({
  theme,
  soundEnabled,
  onSendMessage,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    soundEngine.playClick(soundEnabled);

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderName: name.trim(),
      senderContact: contact.trim() || 'Não informado',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    onSendMessage(newMsg);
    setSent(true);
    setName('');
    setContact('');
    setMessage('');

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <div className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-xl relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
            <Coffee className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">
              Deixe um Recado Direto
            </h3>
            <p className="text-xs text-neutral-400">
              Mensagem instantânea privada para o Juan
            </p>
          </div>
        </div>
      </div>

      {sent ? (
        <div className="py-6 px-4 text-center rounded-xl bg-emerald-950/40 border border-emerald-800/40 my-1 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
            <Check className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-emerald-300">
            Recado enviado com sucesso!
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Juan Carlos responderá em breve através do seu contato.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Seu nome ou empresa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <input
              type="text"
              placeholder="E-mail ou WhatsApp (opcional)"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <textarea
            required
            rows={2}
            placeholder="Escreva sua ideia, proposta ou olá..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          />

          <button
            type="submit"
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold ${theme.accent} flex items-center justify-center gap-1.5 transition-transform active:scale-98 shadow-sm cursor-pointer`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Mensagem Direta</span>
          </button>
        </form>
      )}
    </div>
  );
};
