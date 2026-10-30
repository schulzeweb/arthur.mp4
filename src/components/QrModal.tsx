import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { UserProfile } from '../types';
import { ThemeConfig } from '../utils/theme';
import { soundEngine } from '../utils/audio';
import { Copy, Check, Download, Share2, MessageCircle, Twitter, Linkedin, ExternalLink } from './IconResolver';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  theme: ThemeConfig;
  soundEnabled: boolean;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  profile,
  theme,
  soundEnabled,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrColor, setQrColor] = useState<'dark' | 'emerald'>('dark');

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://carlosjuan.dev';

  useEffect(() => {
    if (!isOpen) return;

    const generateCode = async () => {
      try {
        const darkColor = qrColor === 'emerald' ? '#10b981' : '#000000';
        const url = await QRCode.toDataURL(shareUrl, {
          width: 320,
          margin: 2,
          color: {
            dark: darkColor,
            light: '#ffffff',
          },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Error generating QR code', err);
      }
    };

    generateCode();
  }, [isOpen, qrColor, shareUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    soundEngine.playClick(soundEnabled);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    soundEngine.playClick(soundEnabled);
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode_${profile.handle.replace('@', '')}.png`;
    a.click();
  };

  const shareText = encodeURIComponent(
    `Confira o BioHub de ${profile.name} (${profile.handle}) - ${profile.tagline}: ${shareUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-md p-6 rounded-3xl border ${theme.cardBorder} ${theme.cardBg} shadow-2xl relative space-y-5`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <div className="text-center space-y-1">
          <h3 className="font-display text-lg font-bold text-neutral-100">
            Compartilhar BioHub
          </h3>
          <p className="text-xs text-neutral-400">
            Aponte a câmera do celular para abrir instantaneamente
          </p>
        </div>

        {/* QR Code Canvas Frame */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-2xl shadow-xl border border-neutral-200">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code do perfil"
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-neutral-400">
                Gerando QR Code...
              </div>
            )}
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-2 mt-3 text-xs">
            <span className="text-neutral-400">Estilo:</span>
            <button
              onClick={() => setQrColor('dark')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                qrColor === 'dark' ? 'bg-white text-black' : 'bg-white/10 text-white'
              }`}
            >
              Preto Clássico
            </button>
            <button
              onClick={() => setQrColor('emerald')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                qrColor === 'emerald' ? 'bg-emerald-500 text-black font-semibold' : 'bg-white/10 text-white'
              }`}
            >
              Verde Esmeralda
            </button>
          </div>
        </div>

        {/* URL Box & Copy */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/50 border border-white/10">
          <span className="text-xs text-neutral-400 truncate px-2.5 flex-1 font-mono-code">
            {shareUrl}
          </span>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${theme.accent} flex items-center gap-1.5 shrink-0 cursor-pointer`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Shares */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block text-center">
            Compartilhar via
          </span>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/40 text-xs font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-950/40 border border-sky-800/40 text-sky-400 hover:bg-sky-900/40 text-xs font-medium transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X / Twitter</span>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-400 hover:bg-blue-900/40 text-xs font-medium transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Download QR Button */}
        <button
          onClick={handleDownloadQr}
          className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Baixar Imagem QR Code (PNG)</span>
        </button>
      </div>
    </div>
  );
};
