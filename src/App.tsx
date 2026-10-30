/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  Play,
  MessageCircle,
  Instagram,
  Youtube,
  Mail,
  Share2,
  Copy,
  Check,
  Scissors,
  Sparkles,
  X,
  ArrowUpRight,
  Tv,
  Film,
  Flame,
  Maximize2,
  FolderOpen,
  ExternalLink,
  Quote,
  Search,
  Globe
} from 'lucide-react';

// Tipagem de Idiomas Suportados
export type Language = 'pt' | 'en';

export const TRANSLATIONS = {
  pt: {
    role: 'EDITOR DE VÍDEOS',
    bioLine1: 'não seja genérico',
    bioLine2: 'edito e faço vídeos :)',
    available: 'Disponível para Projetos',
    snoopyTap: 'Toque no Snoopy!',
    watch: 'Assistir',
    projectsFolderTitle: 'Pasta de Projetos',
    projectsBadge: 'PROJETOS',
    projectsSubtitle: 'Confira projetos meus postados no youtube!',
    budgetTitle: 'Pedir Orçamento',
    budgetOnline: 'ONLINE',
    budgetSubtitle: 'se quiser elevar o nível dos seus projetos, me chame!',
    discordTitle: 'Server do Discord',
    discordBadge: 'COMUNIDADE',
    discordSubtitle: 'Nossa comunidade, pra fazer networking, jogar ou só trocar ideia!',
    instagramSubtitle: 'bastidores :)',
    youtubeSubtitle: 'diversos tipos de conteudo',
    emailTitle: 'E-mail Comercial',
    emailBadge: 'CONTATO',
    copy: 'Copiar',
    copied: 'Copiado!',
    shareTooltip: 'Compartilhar Link',
    shareModalTitle: 'Compartilhar arthur.mp4',
    shareModalDesc: 'Aponte a câmera para abrir o link',
    shareCopyUrl: 'Copiar Link',
    footerRights: 'Todos os direitos reservados.',
    footerTagline: 'Edição de Vídeos · Motion Design · Storytelling & Games',
    toastEmailCopied: 'E-mail copiado!',
    toastLinkCopied: 'Link copiado!',
    toastPhoneCopied: 'Telefone copiado!',
    // Showreel modal
    showreelTitle: 'PILOTO — Arthur.MP4 | Video Editor',
    showreelTag: 'Showreel 2026',
    showreelWatchYt: 'Ver no YouTube',
    showreelRequestBudget: 'Pedir Orçamento',
    showreelOpenYt: 'Abrir no YouTube',
    // Projects modal
    modalProjectsTitle: 'Pasta de Projetos',
    modalProjectsFilesSingular: 'ARQUIVO',
    modalProjectsFilesPlural: 'ARQUIVOS',
    modalProjectsNiche: 'Escolha o Nicho / Formato:',
    modalProjectsTotal: 'no total',
    modalProjectsSearchPlaceholder: 'Filtrar por título (ex: Histórias, Godenot, Motion...)',
    modalProjectsClearSearch: 'Limpar busca',
    modalProjectsClickToPlay: 'Clique para reproduzir aqui',
    modalProjectsWatchBadge: 'ASSISTIR',
    modalProjectsClosePlayer: 'Fechar player',
    modalProjectsNoResultsTitle: 'Nenhum projeto encontrado',
    modalProjectsNoResultsDescTerm: 'Não encontramos vídeos com o termo',
    modalProjectsNoResultsDescFolder: 'nesta pasta.',
    modalProjectsSoonTitle: 'Novos Projetos em Breve',
    modalProjectsSoonDesc: 'Arthur está finalizando edições nesta categoria. Quer ser o próximo destaque deste nicho?',
    modalProjectsRequestFormat: 'Pedir Edição deste Formato',
    modalProjectsFooterNote: 'me ajude a encher essa pasta, me contrate :)',
    // Budget modal
    budgetModalTitle: 'Pedir Orçamento',
    budgetModalSubtitle: 'Escolha por onde prefere conversar',
    discordCardTitle: 'Discord',
    discordCardBadge: 'PV DIRETO',
    discordCardDesc: 'Conversar direto pelo perfil do Discord',
    discordCardButton: 'Chamar no Discord',
    whatsappCardTitle: 'WhatsApp',
    whatsappCardDesc: '(16) 99898-0590 · Resposta rápida',
    whatsappCardButton: 'Chamar no WhatsApp',
    whatsappCardCopy: 'Copiar',
    budgetModalFooter: '⚡ Vamos combinar estilo, prazo e valores sob medida para o seu canal ou marca!',
    langToggleTitle: 'Mudar idioma / Switch language',
  },
  en: {
    role: 'VIDEO EDITOR',
    bioLine1: "don't be generic",
    bioLine2: 'I edit & craft videos :)',
    available: 'Available for Projects',
    snoopyTap: 'Tap Snoopy!',
    watch: 'Watch',
    projectsFolderTitle: 'Projects Folder',
    projectsBadge: 'PROJECTS',
    projectsSubtitle: 'Check out my video projects posted on YouTube!',
    budgetTitle: 'Get a Quote',
    budgetOnline: 'ONLINE',
    budgetSubtitle: 'want to level up your video projects? Hit me up!',
    discordTitle: 'Discord Server',
    discordBadge: 'COMMUNITY',
    discordSubtitle: 'Our community to network, play games or just chat!',
    instagramSubtitle: 'behind the scenes :)',
    youtubeSubtitle: 'various types of content',
    emailTitle: 'Business Email',
    emailBadge: 'CONTACT',
    copy: 'Copy',
    copied: 'Copied!',
    shareTooltip: 'Share Link',
    shareModalTitle: 'Share arthur.mp4',
    shareModalDesc: 'Scan with your camera to open the link',
    shareCopyUrl: 'Copy Link',
    footerRights: 'All rights reserved.',
    footerTagline: 'Video Editing · Motion Design · Storytelling & Games',
    toastEmailCopied: 'Email copied!',
    toastLinkCopied: 'Link copied!',
    toastPhoneCopied: 'Phone number copied!',
    // Showreel modal
    showreelTitle: 'PILOTO — Arthur.MP4 | Video Editor',
    showreelTag: 'Showreel 2026',
    showreelWatchYt: 'Watch on YouTube',
    showreelRequestBudget: 'Request Quote',
    showreelOpenYt: 'Open in YouTube',
    // Projects modal
    modalProjectsTitle: 'Projects Folder',
    modalProjectsFilesSingular: 'FILE',
    modalProjectsFilesPlural: 'FILES',
    modalProjectsNiche: 'Choose Niche / Format:',
    modalProjectsTotal: 'total',
    modalProjectsSearchPlaceholder: 'Filter by title (e.g. Stories, Godenot, Motion...)',
    modalProjectsClearSearch: 'Clear search',
    modalProjectsClickToPlay: 'Click to play here',
    modalProjectsWatchBadge: 'WATCH',
    modalProjectsClosePlayer: 'Close player',
    modalProjectsNoResultsTitle: 'No projects found',
    modalProjectsNoResultsDescTerm: 'No videos found matching',
    modalProjectsNoResultsDescFolder: 'in this folder.',
    modalProjectsSoonTitle: 'New Projects Coming Soon',
    modalProjectsSoonDesc: 'Arthur is finishing edits in this category. Want to be the next featured creator in this niche?',
    modalProjectsRequestFormat: 'Request this Video Format',
    modalProjectsFooterNote: 'help me fill this folder, hire me :)',
    // Budget modal
    budgetModalTitle: 'Request a Quote',
    budgetModalSubtitle: 'Choose where you prefer to chat',
    discordCardTitle: 'Discord',
    discordCardBadge: 'DIRECT DM',
    discordCardDesc: 'Chat directly via Discord profile',
    discordCardButton: 'Reach out on Discord',
    whatsappCardTitle: 'WhatsApp',
    whatsappCardDesc: '+55 16 99898-0590 · Fast response',
    whatsappCardButton: 'Chat on WhatsApp',
    whatsappCardCopy: 'Copy',
    budgetModalFooter: "⚡ Let's tailor the editing style, turnaround, and rates to your channel or brand!",
    langToggleTitle: 'Switch language / Mudar idioma',
  },
};

// Ícone do Discord em SVG nítido
function DiscordIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Ícone do WhatsApp em SVG nítido
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.55 20.16 9.1 19.76 7.84 19.01L7.54 18.83L4.41 19.65L5.24 16.6L5.05 16.29C4.23 14.99 3.79 13.47 3.79 11.91C3.79 7.37 7.49 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.06 8.02 12.23C8.15 12.39 9.75 14.86 12.19 15.92C12.77 16.17 13.22 16.32 13.57 16.43C14.15 16.62 14.68 16.59 15.1 16.53C15.57 16.46 16.55 15.94 16.75 15.37C16.96 14.79 16.96 14.3 16.9 14.2C16.83 14.1 16.68 14.04 16.45 13.92C16.22 13.81 15.1 13.26 14.89 13.18C14.69 13.11 14.54 13.07 14.4 13.3C14.25 13.52 13.82 14.04 13.69 14.19C13.56 14.33 13.43 14.35 13.2 14.24C12.97 14.12 12.03 13.81 10.92 12.82C10.05 12.05 9.47 11.09 9.3 10.8C9.13 10.51 9.28 10.36 9.4 10.24C9.51 10.13 9.64 9.96 9.76 9.82C9.88 9.68 9.92 9.57 10 9.41C10.08 9.25 10.04 9.11 9.98 8.99C9.92 8.87 9.47 7.76 9.28 7.31C9.1 6.87 8.92 6.93 8.78 6.92C8.65 6.92 8.5 6.92 8.35 6.92" />
    </svg>
  );
}

// Nichamento da Pasta de Projetos
type ProjectCategory = 'todos' | 'historias' | 'gameplay' | 'curtos' | 'vlog' | 'motion';
type ProjectCategoryType = 'historias' | 'gameplay' | 'curtos' | 'vlog' | 'motion';

interface PortfolioProject {
  id: string;
  titlePt: string;
  titleEn: string;
  category: ProjectCategoryType | ProjectCategoryType[];
  categoryLabelPt: string;
  categoryLabelEn: string;
  youtubeId: string;
  youtubeUrl: string;
  descriptionPt: string;
  descriptionEn: string;
  badgePt?: string;
  badgeEn?: string;
  testimonial?: {
    author: string;
    avatar: string;
    rolePt?: string;
    roleEn?: string;
    quotePt: string;
    quoteEn: string;
  };
}

function projectMatchesCategory(project: PortfolioProject, categoryId: ProjectCategory): boolean {
  if (categoryId === 'todos') return true;
  if (Array.isArray(project.category)) {
    return project.category.includes(categoryId as ProjectCategoryType);
  }
  return project.category === categoryId;
}

const CATEGORY_TABS: { id: ProjectCategory; labelPt: string; labelEn: string; icon: string }[] = [
  { id: 'todos', labelPt: 'Todos', labelEn: 'All', icon: '📁' },
  { id: 'historias', labelPt: 'Histórias', labelEn: 'Stories', icon: '📖' },
  { id: 'gameplay', labelPt: 'Gameplay', labelEn: 'Gaming', icon: '🎮' },
  { id: 'curtos', labelPt: 'Curtos', labelEn: 'Shorts', icon: '⚡' },
  { id: 'vlog', labelPt: 'Vlog', labelEn: 'Vlog', icon: '📹' },
  { id: 'motion', labelPt: 'Motion', labelEn: 'Motion', icon: '✨' },
];

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'historias-storytelling',
    titlePt: 'Edição de Histórias & Storytelling',
    titleEn: 'Storytelling & Narrative Editing',
    category: 'historias',
    categoryLabelPt: 'Histórias',
    categoryLabelEn: 'Stories',
    youtubeId: '7aH9G8AAtU8',
    youtubeUrl: 'https://youtu.be/7aH9G8AAtU8',
    descriptionPt: 'Narrativa imersiva, ritmo cadenciado, sound design envolvente e retenção contínua para prender a atenção.',
    descriptionEn: 'Immersive storytelling, deliberate pacing, punchy sound design and relentless viewer retention.',
    badgePt: 'YOUTUBE · HISTÓRIAS',
    badgeEn: 'YOUTUBE · STORIES',
  },
  {
    id: 'godenot',
    titlePt: 'Vídeo do Godenot',
    titleEn: 'Godenot Gameplay Video',
    category: 'gameplay',
    categoryLabelPt: 'Gameplay',
    categoryLabelEn: 'Gaming',
    youtubeId: 'PlggSVYnwSo',
    youtubeUrl: 'https://youtu.be/PlggSVYnwSo?si=WM4zTKX_gT5kKDaL',
    descriptionPt: 'vídeo editado a muito tempo atrás, juro que estou melhor agora :)',
    descriptionEn: 'video edited a while back, I promise my craft is even better now :)',
    badgePt: 'YOUTUBE · GAMEPLAY',
    badgeEn: 'YOUTUBE · GAMING',
    testimonial: {
      author: 'Godenot',
      avatar: 'https://yt3.googleusercontent.com/xVQ_C_cttXFpFr67Z5qfBKw0q4BJLfigYbR6gkFznFhXoZYEy-W7p14pg0Y6tQTuaHmXMAhY=s160-c-k-c0x00ffffff-no-rj',
      rolePt: 'Depoimento no vídeo',
      roleEn: 'Video Testimonial',
      quotePt: 'execelente editor',
      quoteEn: 'excellent editor',
    },
  },
  {
    id: 'motion-vfx',
    titlePt: 'Motion Design & Efeitos Visuais',
    titleEn: 'Motion Design & Visual Effects',
    category: 'motion',
    categoryLabelPt: 'Motion & VFX',
    categoryLabelEn: 'Motion & VFX',
    youtubeId: 'XAXqeBLzv3Y',
    youtubeUrl: 'https://youtube.com/shorts/XAXqeBLzv3Y',
    descriptionPt: 'Animações dinâmicas, tipografia cinética, sound design imersivo e efeitos visuais com alta retenção.',
    descriptionEn: 'Kinetic typography, smooth animations, punchy SFX and high-retention visual hooks.',
    badgePt: 'AFTER EFFECTS · MOTION',
    badgeEn: 'AFTER EFFECTS · MOTION',
  },
  {
    id: 'gameplay-highlights',
    titlePt: 'Edição Gameplay & Dinamismo',
    titleEn: 'Dynamic Gaming & Highlights',
    category: 'gameplay',
    categoryLabelPt: 'Gameplay',
    categoryLabelEn: 'Gaming',
    youtubeId: '8OEAC57qKsc',
    youtubeUrl: 'https://youtu.be/8OEAC57qKsc?si=QaFPDSMURHPYGsj5',
    descriptionPt: 'Cortes dinâmicos, zooms cômicos pontuais, sound design imersivo e ritmo acelerado para alta retenção.',
    descriptionEn: 'Fast-paced cuts, comedic zooms, immersive sound design and energetic flow for maximum watch time.',
    badgePt: 'YOUTUBE · GAMEPLAY',
    badgeEn: 'YOUTUBE · GAMING',
  },
  {
    id: 'shorts-motion-viral',
    titlePt: 'Vídeo Curto Viral & Motion Design',
    titleEn: 'Viral Short-Form & Motion Design',
    category: ['curtos', 'motion'],
    categoryLabelPt: 'Vídeos Curtos & Motion',
    categoryLabelEn: 'Shorts & Motion',
    youtubeId: 'tE5J2mWeQNY',
    youtubeUrl: 'https://youtube.com/shorts/tE5J2mWeQNY',
    descriptionPt: 'Edição acelerada com foco em retenção, elementos de motion graphics dinâmicos e sound design para viralização.',
    descriptionEn: 'High-speed pacing optimized for retention algorithms, motion graphics and sound design for viral growth.',
    badgePt: 'VIRAL · SHORTS & MOTION',
    badgeEn: 'VIRAL · SHORTS & MOTION',
  },
];

// Variantes de animação de entrada sequencial com física de mola
const linksContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.09,
    },
  },
};

const linkItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  hover: {
    scale: 1.02,
    y: -3,
    x: -2,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 24,
    },
  },
};

// Entrada e hover para thumbnail dos links
const linkThumbVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0, rotate: -6 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 18,
    },
  },
  hover: {
    scale: 1.12,
    rotate: -3,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 18,
    },
  },
};

// Entrada de texto e badges internos do card
const linkTextVariants: Variants = {
  hidden: { x: -14, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Entrada e hover para a seta indicadora
const linkArrowVariants: Variants = {
  hidden: { x: 22, opacity: 0, scale: 0.7 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 20,
    },
  },
  hover: {
    x: 3,
    y: -3,
    scale: 1.15,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 18,
    },
  },
};

// Variantes para modais suaves com backdrop blur e spring dialog
const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalDialogVariants: Variants = {
  hidden: { scale: 0.85, y: 35, opacity: 0 },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 340,
      damping: 24,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
  exit: {
    scale: 0.88,
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.16,
      ease: 'easeIn',
    },
  },
};

// Entrada individual para itens internos dos modais
const modalItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 22,
    },
  },
};

export default function App() {
  const [showShowreelModal, setShowShowreelModal] = useState(false);
  const [showProjectsFolder, setShowProjectsFolder] = useState(false);
  const [activeFolderCategory, setActiveFolderCategory] = useState<ProjectCategory>('todos');
  const [playingProjectId, setPlayingProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  // Instância do Lenis para Smooth Scrolling ultra suave
  const lenisRef = useRef<Lenis | null>(null);
  const isAnyModalOpen =
    showShowreelModal || showProjectsFolder || showShareModal || showBudgetModal;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pausa a rolagem do Lenis quando modais estiverem abertos
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isAnyModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isAnyModalOpen]);

  // Language State with persistence in localStorage
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('arthur_mp4_lang');
      if (saved === 'en' || saved === 'pt') return saved;
      return 'pt';
    } catch {
      return 'pt';
    }
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'pt' ? 'en' : 'pt';
    setLang(nextLang);
    try {
      localStorage.setItem('arthur_mp4_lang', nextLang);
    } catch {}
  };

  const t = TRANSLATIONS[lang];

  // Typewriter effect for bioLine2
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTypedText('');
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const fullText = t.bioLine2;
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < fullText.length) {
      timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 70);
    } else if (!isDeleting && typedText.length === fullText.length) {
      // Pause at full text before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3200);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length - 1));
      }, 35);
    } else if (isDeleting && typedText.length === 0) {
      // Pause before typing again
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, t.bioLine2]);

  // Silent feedback helper
  const playClapSound = () => {
    // Silent
  };

  // Red and white comic confetti pop
  const triggerRedWhiteConfetti = (e?: React.MouseEvent) => {
    playClapSound();
    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.4;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x, y },
      colors: ['#ffffff', '#ef4444', '#dc2626', '#18181b'],
    });
  };

  // Share QR Code modal
  const handleOpenShare = () => {
    playClapSound();
    QRCode.toDataURL(window.location.href, {
      width: 280,
      margin: 2,
      color: {
        dark: '#dc2626',
        light: '#ffffff',
      },
    }).then((url) => setQrCodeUrl(url));
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    playClapSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(t.toastLinkCopied);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClapSound();
    navigator.clipboard.writeText('arthurrmp4@gmail.com');
    setCopiedNotification(t.toastEmailCopied);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleCopyWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClapSound();
    navigator.clipboard.writeText('16998980590');
    setCopiedNotification(lang === 'en' ? 'WhatsApp copied: +55 (16) 99898-0590' : 'WhatsApp copiado: (16) 99898-0590');
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const getProjectTitle = (p: PortfolioProject) => (lang === 'en' ? p.titleEn : p.titlePt);
  const getProjectDesc = (p: PortfolioProject) => (lang === 'en' ? p.descriptionEn : p.descriptionPt);
  const getProjectCategoryLabel = (p: PortfolioProject) => (lang === 'en' ? p.categoryLabelEn : p.categoryLabelPt);
  const getProjectBadge = (p: PortfolioProject) => (lang === 'en' ? (p.badgeEn || p.categoryLabelEn) : (p.badgePt || p.categoryLabelPt));

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const folderFilteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    const matchesCategory = projectMatchesCategory(p, activeFolderCategory);
    const title = getProjectTitle(p).toLowerCase();
    const catLabel = getProjectCategoryLabel(p).toLowerCase();
    const desc = getProjectDesc(p).toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      title.includes(normalizedSearch) ||
      catLabel.includes(normalizedSearch) ||
      desc.includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-red-600 text-neutral-900 flex flex-col items-center justify-between px-4 py-6 sm:py-8 lg:px-8 xl:px-12 relative overflow-x-hidden selection:bg-black selection:text-white font-sans">


      {/* CLAPPERBOARD STRIPE ACCENT BAR AT VERY TOP (ENTRANCE SCALE-IN) */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md lg:max-w-6xl xl:max-w-7xl h-2 rounded-full overflow-hidden mb-3 border-2 border-black shadow-[2px_2px_0px_#000000] clapper-stripes-animated origin-center"
        title="Claquete de Cinema"
      />

      {/* TOP HEADER (SPRING ENTRANCE DROP-IN) */}
      <motion.header
        initial={{ y: -40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.05 }}
        className="sticky top-3 w-full max-w-md lg:max-w-6xl xl:max-w-7xl flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border-[2.5px] border-black shadow-[3px_3px_0px_#000000] mb-6 z-30 transition-shadow"
      >
        <motion.div
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.14, type: 'spring', stiffness: 320 }}
          className="flex items-center gap-2"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.22, type: 'spring', stiffness: 400 }}
            className="relative flex h-2.5 w-2.5"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 border border-black" />
          </motion.span>
          <span className="font-mono text-xs sm:text-sm font-black text-black tracking-wider">
            arthur.mp4
          </span>
        </motion.div>

        <div className="flex items-center gap-2">
          {/* Comic Neo-brutalist Language Selector Switch (Both Mobile & PC) */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.16, type: 'spring', stiffness: 360 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClapSound();
              toggleLanguage();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-black text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer font-mono text-xs font-black select-none"
            title={t.langToggleTitle}
          >
            <Globe className="w-3.5 h-3.5 text-black" />
            <span className={lang === 'pt' ? 'text-red-600 font-black' : 'text-neutral-400 font-bold'}>PT</span>
            <span className="text-neutral-300">/</span>
            <span className={lang === 'en' ? 'text-blue-600 font-black' : 'text-neutral-400 font-bold'}>EN</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.18, type: 'spring', stiffness: 380 }}
            whileHover={{ scale: 1.12, rotate: 4 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenShare}
            className="p-1.5 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-black text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            title={t.shareTooltip}
          >
            <Share2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.header>

      {/* RESPONSIVE LAYOUT WRAPPER (Centered single-column on mobile, 12-col Bento Grid on desktop) */}
      <div className="w-full max-w-md lg:max-w-6xl xl:max-w-7xl lg:grid lg:grid-cols-12 lg:gap-8 lg:items-stretch z-10">

        {/* LEFT COLUMN: HERO PROFILE & SHOWREEL CARD (Aligned vertically with right column on desktop) */}
        <div className="w-full lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-stretch lg:h-full space-y-3 sm:space-y-4 mb-5 lg:mb-0">
          {/* SNOOPY DIRECTOR HERO (ORCHESTRATED SPRING ENTRANCE) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full flex flex-col items-center text-center shrink-0 mb-1 lg:mb-0"
          >
            {/* Snoopy Avatar Container */}
            <div
              className="relative mb-3 group cursor-pointer"
              onClick={triggerRedWhiteConfetti}
              title={t.snoopyTap}
            >
              {/* Animated Comic Frame with Dynamic Bounce Entrance & Gentle Floating */}
              <motion.div
                initial={{ scale: 0.15, opacity: 0, rotate: -15, y: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.12 }}
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.94, rotate: 2 }}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-white border-[3.5px] border-black shadow-[6px_6px_0px_#000000] relative animate-floatGentle group-hover:animate-none"
              >
                <img
                  src="/Dog_holding_laptop_wearing_glasses_2K_20261011105022.jpg"
                  alt="Ícone Principal - arthur.mp4"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Shimmer light sweep across avatar on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none rounded-2xl" />
              </motion.div>
            </div>

            {/* Identity Pill with spring entrance */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white border-[3px] border-black px-4 py-1 rounded-full shadow-[3px_3px_0px_#000000] mb-2 cursor-default select-none transition-shadow"
            >
              <span className="font-mono text-sm font-black text-red-600 tracking-wider">
                @arthur.mp4
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="text-[11px] font-black uppercase text-black tracking-tight">
                {t.role}
              </span>
            </motion.div>

            {/* Clean Simple Bio with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26 }}
              className="text-sm font-normal text-white max-w-xs leading-relaxed mb-3 font-sans text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                {t.bioLine1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="inline-flex items-center justify-center min-h-[22px]"
              >
                <span>{typedText}</span>
                <span className="w-1.5 h-3.5 bg-white ml-0.5 animate-pulse inline-block" />
              </motion.p>
            </motion.div>

            {/* Floating "Disponível para Projetos" Badge with Pulse & Shimmer */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.34, type: 'spring', stiffness: 320, damping: 18 }}
              onClick={() => {
                playClapSound();
                setShowBudgetModal(true);
              }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-white border-[2.5px] border-black px-3.5 py-1.5 rounded-full shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] text-black transition-all cursor-pointer mb-1 group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black" />
              </span>
              <span className="tracking-tight text-[11px] font-black uppercase">
                {t.available}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent pointer-events-none" />
            </motion.button>
          </motion.div>

          {/* VISUAL SHOWREEL HERO CARD (SPRING SLIDE-UP ENTRANCE) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.38, type: 'spring', damping: 20, stiffness: 240 }}
            className="w-full mb-1 lg:mb-0 lg:flex-1 lg:flex lg:flex-col min-h-0"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98, y: 1 }}
              onHoverStart={() => setIsHoveringVideo(true)}
              onHoverEnd={() => setIsHoveringVideo(false)}
              onClick={() => {
                setShowShowreelModal(true);
              }}
              className="relative w-full rounded-3xl overflow-hidden bg-black border-[3.5px] border-black shadow-[6px_6px_0px_#000000] hover:shadow-[8px_8px_0px_#000000] cursor-pointer group transition-shadow duration-200 lg:flex-1 lg:flex lg:flex-col min-h-0"
            >
              {/* Video Preview Image */}
              <div className="relative h-44 sm:h-48 lg:h-full lg:min-h-[220px] lg:flex-1 overflow-hidden bg-neutral-900">
                <img
                  src="https://img.youtube.com/vi/2bIxSvgY3_U/maxresdefault.jpg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://img.youtube.com/vi/2bIxSvgY3_U/hqdefault.jpg';
                  }}
                  alt="PILOTO — Arthur.MP4 | Video Editor"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Shimmer sweep effect across video preview */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                {/* Bottom Info bar */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54 }}
                  className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-black drop-shadow-md">
                      PILOTO — Arthur.MP4 | Video Editor
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-red-400 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15 group-hover:border-red-400 transition-colors">
                    <span>{t.watch}</span>
                    <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LINKTREE CARDS (Bento Grid on desktop) */}
        <div className="w-full lg:col-span-7 xl:col-span-7 flex flex-col lg:h-full">
          {/* TACTILE COMIC LINKTREE BUTTONS (SCROLL REVEAL BENTO GRID) */}
          <main
            className="w-full space-y-3.5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:gap-3.5 mb-8 lg:mb-0 lg:h-full"
          >
            {/* Card Padrão: Pasta de Projetos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-2 lg:row-span-1 lg:h-full flex flex-col"
            >
              <div
                onClick={() => {
                  playClapSound();
                  setShowProjectsFolder(true);
                }}
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3.5 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all cursor-pointer group lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Capa do Card Projetos */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-amber-50"
                  >
                    <img
                      src="/Dog_holding_file_folder_2K_20261007153424.jpg"
                      alt="Capa Pasta de Projetos"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>

                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        {t.projectsFolderTitle}
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-black text-white border border-black shrink-0 transition-transform group-hover:scale-105">
                        {PORTFOLIO_PROJECTS.length} {t.projectsBadge}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 block leading-snug mt-0.5">
                      {t.projectsSubtitle}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  variants={linkArrowVariants}
                  className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white border-2 border-black flex items-center justify-center text-black shrink-0 transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </motion.div>
              </div>
            </motion.div>

            {/* Link 1: Pedir Orçamento */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-1 lg:row-span-1 lg:h-full flex flex-col"
            >
              <button
                type="button"
                onClick={() => {
                  playClapSound();
                  setShowBudgetModal(true);
                }}
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all cursor-pointer group text-left lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Photo on Pedir Orçamento */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-white"
                  >
                    <img
                      src="/orcamento_icon.png"
                      alt="Pedir Orçamento"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        {t.budgetTitle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-black border border-black shrink-0 transition-transform group-hover:scale-105">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        {t.budgetOnline}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-neutral-600 block leading-snug mt-0.5">
                      {t.budgetSubtitle}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  variants={linkArrowVariants}
                  className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white border-2 border-black flex items-center justify-center text-black shrink-0 transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </motion.div>
              </button>
            </motion.div>

            {/* Link 2: Server do Discord */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-1 lg:row-span-1 lg:h-full flex flex-col"
            >
              <a
                href="https://discord.gg/zr4twCaK9b"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClapSound}
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all cursor-pointer group lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Capa do Card Server do Discord */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-white"
                  >
                    <img
                      src="/imagem discord.png"
                      alt="Capa Server do Discord"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        {t.discordTitle}
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#5865F2] text-white border border-black shrink-0 transition-transform group-hover:scale-105">
                        {t.discordBadge}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 block leading-snug mt-0.5">
                      {t.discordSubtitle}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  variants={linkArrowVariants}
                  className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm group-hover:bg-[#5865F2] group-hover:text-white border-2 border-black flex items-center justify-center text-black shrink-0 transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </motion.div>
              </a>
            </motion.div>

            {/* Link 3: Instagram */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-1 lg:row-span-1 lg:h-full flex flex-col"
            >
              <a
                href="https://www.instagram.com/arthurrr.mp4/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClapSound}
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all cursor-pointer group lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Capa do Card Instagram */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl overflow-hidden border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-white"
                  >
                    <img
                      src="/Dog_holding_Instagram_logo_2K_20261007212927.jpg"
                      alt="Capa Instagram"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        Instagram (@arthurrr.mp4)
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 block leading-snug mt-0.5">
                      {t.instagramSubtitle}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  variants={linkArrowVariants}
                  className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white border-2 border-black flex items-center justify-center text-black shrink-0 transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </motion.div>
              </a>
            </motion.div>

            {/* Link 4: YouTube */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-1 lg:row-span-1 lg:h-full flex flex-col"
            >
              <a
                href="https://www.youtube.com/@arthurr.mp4"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClapSound}
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all cursor-pointer group lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Capa do Card YouTube */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-white"
                  >
                    <img
                      src="/Change_the_background_color._2K_20261007232246.jpg"
                      alt="Capa YouTube"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        Canal no YouTube (@arthurr.mp4)
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 block leading-snug mt-0.5">
                      {t.youtubeSubtitle}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  variants={linkArrowVariants}
                  className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white border-2 border-black flex items-center justify-center text-black shrink-0 transition-all duration-200"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </motion.div>
              </a>
            </motion.div>

            {/* Link 5: E-mail Comercial com Botão de Copiar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={linkItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="lg:col-span-2 lg:row-span-1 lg:h-full flex flex-col"
            >
              <div
                className="relative overflow-hidden w-full p-4 rounded-2xl flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-[3px] border-black shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:bg-white transition-all group lg:h-full lg:flex-1"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <a
                  href="mailto:arthurrmp4@gmail.com"
                  onClick={playClapSound}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                >
                  {/* Capa do Card E-mail */}
                  <motion.div
                    variants={linkThumbVariants}
                    className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] bg-white"
                  >
                    <img
                      src="/Dog_holding_email_icon_2K_20261007234648.jpg"
                      alt="Capa E-mail Comercial"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                  <motion.div variants={linkTextVariants} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm sm:text-base text-black leading-snug">
                        {t.emailTitle}
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-black border border-black shrink-0 transition-transform group-hover:scale-105">
                        {t.emailBadge}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 block leading-snug mt-0.5">
                      arthurrmp4@gmail.com
                    </span>
                  </motion.div>
                </a>

                <div className="flex items-center gap-1.5 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCopyEmail}
                    title={lang === 'en' ? 'Copy business email' : 'Copiar e-mail comercial'}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-300 hover:bg-amber-400 text-black border-2 border-black font-black text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline sm:inline">{t.copy}</span>
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:arthurrmp4@gmail.com"
                    onClick={playClapSound}
                    title={lang === 'en' ? 'Open in email app' : 'Abrir no cliente de e-mail'}
                    className="w-8 h-8 rounded-lg bg-neutral-100/80 backdrop-blur-sm hover:bg-red-600 hover:text-white border-2 border-black flex items-center justify-center text-black transition-all cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* OFFICIAL FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.95, type: 'spring', stiffness: 280, damping: 20 }}
        className="w-full max-w-md lg:max-w-6xl xl:max-w-7xl flex flex-col sm:flex-row items-center justify-between py-6 z-10 text-center border-t border-black/20 mt-4 lg:mt-8 gap-2"
      >
        <p className="text-xs font-bold text-white/95 font-sans">
          © 2026 arthurmp4. {t.footerRights}
        </p>
        <p className="text-xs font-semibold text-white/80 font-sans hidden sm:block">
          {t.footerTagline}
        </p>
      </motion.footer>

      {/* MODAL: SHOWREEL & FORMATOS DE EDIÇÃO */}
      <AnimatePresence>
        {showShowreelModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              data-lenis-prevent
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md lg:max-w-5xl xl:max-w-6xl lg:w-[92vw] bg-white border-[4px] border-black rounded-3xl p-6 lg:p-8 relative max-h-[85vh] lg:max-h-[92vh] overflow-y-auto space-y-4 shadow-[8px_8px_0px_#000000]"
            >
              <motion.div variants={modalItemVariants} className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <Flame className="w-5 h-5 fill-white animate-flameWiggle" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-black">
                      {t.showreelTitle}
                    </h3>
                  </div>
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playClapSound();
                    setShowShowreelModal(false);
                  }}
                  className="p-1.5 rounded-xl border-2 border-black text-black hover:bg-neutral-100 cursor-pointer shadow-[2px_2px_0px_#000000] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Showreel YouTube Embedded Video Player */}
              <motion.div variants={modalItemVariants} className="rounded-2xl border-[3px] border-black overflow-hidden bg-black shadow-[4px_4px_0px_#000000]">
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/2bIxSvgY3_U?autoplay=1"
                    title={t.showreelTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Sub-bar below video */}
                <div className="p-3 bg-white border-t-2 border-black flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600 text-white font-black border border-black">
                      1080p 60FPS
                    </span>
                    <span className="text-xs font-black text-black">
                      {t.showreelTag}
                    </span>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.youtube.com/watch?v=2bIxSvgY3_U"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClapSound}
                    className="text-[11px] font-black text-red-600 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                    <span>{t.showreelWatchYt}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Action Buttons with Spring Response */}
              <motion.div variants={modalItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => {
                    playClapSound();
                    setShowBudgetModal(true);
                  }}
                  className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.showreelRequestBudget}</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://www.youtube.com/watch?v=2bIxSvgY3_U"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClapSound}
                  className="py-3 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#ef4444] hover:shadow-[4px_4px_0px_#ef4444] transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{t.showreelOpenYt}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-neutral-400" />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: SHARE & QR CODE */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm bg-white border-[4px] border-black rounded-3xl p-6 relative space-y-4 shadow-[8px_8px_0px_#000000]"
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playClapSound();
                  setShowShareModal(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-black text-black hover:bg-neutral-100 cursor-pointer shadow-[2px_2px_0px_#000000] transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>

              <motion.div variants={modalItemVariants} className="text-center">
                <h3 className="text-lg font-black text-black">
                  {t.shareModalTitle}
                </h3>
                <p className="text-xs text-neutral-600 font-bold mt-0.5">
                  {t.shareModalDesc}
                </p>
              </motion.div>

              {qrCodeUrl && (
                <motion.div
                  variants={modalItemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="flex justify-center p-3 bg-white rounded-2xl border-2 border-black w-fit mx-auto shadow-[4px_4px_0px_#000000]"
                >
                  <img src={qrCodeUrl} alt="QR Code" className="w-44 h-44 rounded-xl" />
                </motion.div>
              )}

              <motion.div variants={modalItemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyLink}
                  className="w-full py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{t.shareCopyUrl}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: PASTA DE PROJETOS (CLEAN & PROFESSIONAL MINI MOTION) */}
      <AnimatePresence>
        {showProjectsFolder && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-8 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              data-lenis-prevent
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md lg:max-w-6xl xl:max-w-7xl lg:w-[94vw] bg-white border-[3.5px] border-black rounded-3xl p-4 sm:p-5 lg:p-7 relative max-h-[90vh] lg:max-h-[92vh] overflow-y-auto space-y-4 shadow-[8px_8px_0px_#000000]"
            >
              {/* Folder Header Bar with Folder Tab */}
              <motion.div variants={modalItemVariants} className="flex items-center justify-between border-b-2 border-black pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] bg-amber-50 shrink-0">
                    <img
                      src="/Dog_holding_file_folder_2K_20261007153424.jpg"
                      alt="Capa Pasta de Projetos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-black leading-tight">
                      {t.modalProjectsTitle}
                    </h3>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-black text-white border border-black">
                      {folderFilteredProjects.length}{' '}
                      {folderFilteredProjects.length === 1 ? t.modalProjectsFilesSingular : t.modalProjectsFilesPlural}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playClapSound();
                    setShowProjectsFolder(false);
                    setPlayingProjectId(null);
                    setSearchQuery('');
                  }}
                  className="p-1.5 rounded-xl border-2 border-black text-black hover:bg-neutral-100 cursor-pointer shadow-[2px_2px_0px_#000000] transition-colors"
                  title={lang === 'en' ? 'Close folder' : 'Fechar Pasta'}
                >
                  <X className="w-4.5 h-4.5" />
                </motion.button>
              </motion.div>

              {/* Nichamento / Category Filter Tabs */}
              <motion.div variants={modalItemVariants} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                    {t.modalProjectsNiche}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-neutral-400">
                    {PORTFOLIO_PROJECTS.length} {t.modalProjectsTotal}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeFolderCategory === tab.id;
                    const count = tab.id === 'todos'
                      ? PORTFOLIO_PROJECTS.length
                      : PORTFOLIO_PROJECTS.filter((p) => projectMatchesCategory(p, tab.id)).length;
                    const label = tab[lang === 'en' ? 'labelEn' : 'labelPt'];

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          playClapSound();
                          setActiveFolderCategory(tab.id);
                          setPlayingProjectId(null);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border-2 border-black ${
                          isActive
                            ? 'bg-red-600 text-white shadow-[2px_2px_0px_#000000] -translate-y-0.5'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 shadow-[1px_1px_0px_#000000]'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span>{label}</span>
                        <span
                          className={`text-[9px] px-1 py-0.2 rounded-md ${
                            isActive ? 'bg-black text-white' : 'bg-white text-black border border-black/30'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Barra de Busca Rápida por Título */}
              <motion.div variants={modalItemVariants} className="relative">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPlayingProjectId(null);
                    }}
                    placeholder={t.modalProjectsSearchPlaceholder}
                    className="w-full pl-9 pr-9 py-2 text-xs font-bold bg-neutral-50 focus:bg-white text-black placeholder:text-neutral-400 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[3px_3px_0px_#ef4444] focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setPlayingProjectId(null);
                      }}
                      className="absolute right-2.5 p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                      title={t.modalProjectsClearSearch}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Projects List */}
              <motion.div variants={modalItemVariants} className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-5">
                {folderFilteredProjects.map((project) => {
                  const isPlaying = playingProjectId === project.id;
                  const isSolo = folderFilteredProjects.length === 1;
                  const projectTitle = getProjectTitle(project);
                  const projectDesc = getProjectDesc(project);
                  const projectBadge = getProjectBadge(project);

                  return (
                    <div
                      key={project.id}
                      className={`rounded-2xl border-[3px] border-black overflow-hidden bg-black shadow-[4px_4px_0px_#000000] flex flex-col justify-between transition-all duration-300 ${
                        isPlaying || isSolo ? 'lg:col-span-2' : 'lg:col-span-1'
                      }`}
                    >
                      {/* Video Container (16:9) */}
                      <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                        {isPlaying ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1`}
                            title={projectTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <div
                            className="relative w-full h-full cursor-pointer group"
                            onClick={() => {
                              playClapSound();
                              setPlayingProjectId(project.id);
                            }}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                              onError={(e) => {
                                e.currentTarget.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                              }}
                              alt={projectTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                            {/* Top Badges */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000000]">
                              <Youtube className="w-3 h-3 fill-white" />
                              <span>{projectBadge}</span>
                            </div>

                            <div className="absolute top-2.5 right-2.5 bg-black/80 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-white/20">
                              1080p FULL HD
                            </div>

                            {/* Play Button Trigger with Radar Ping */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative flex items-center justify-center">
                                <div className="absolute -inset-2 rounded-full bg-red-500/50 animate-radarPing pointer-events-none" />
                                <div className="w-12 h-12 rounded-full bg-white border-[2.5px] border-black flex items-center justify-center text-red-600 shadow-[3px_3px_0px_#000000] group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all z-10">
                                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                                </div>
                              </div>
                            </div>

                            {/* Bottom Banner on Image */}
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                              <span className="text-[11px] font-black drop-shadow-md">
                                {t.modalProjectsClickToPlay}
                              </span>
                              <span className="text-[9px] bg-red-600 px-1.5 py-0.5 rounded font-bold border border-black">
                                {t.modalProjectsWatchBadge}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project Metadata */}
                      <div className="p-3.5 bg-white border-t-2 border-black space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-black leading-snug">
                              {projectTitle}
                            </h4>
                            <p className="text-xs text-neutral-600 font-medium leading-relaxed mt-0.5">
                              {projectDesc}
                            </p>
                          </div>
                          {isPlaying && (
                            <button
                              onClick={() => setPlayingProjectId(null)}
                              className="text-[10px] font-bold bg-neutral-100 hover:bg-neutral-200 border border-black px-2 py-0.5 rounded shrink-0 cursor-pointer"
                            >
                              {t.modalProjectsClosePlayer}
                            </button>
                          )}
                        </div>

                        {/* Testimonial if present */}
                        {project.testimonial && (
                          <motion.div
                            whileHover={{ scale: 1.015, y: -1 }}
                            className="bg-amber-50/90 rounded-xl border-2 border-black p-2.5 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] flex items-center gap-3 transition-shadow"
                          >
                            <div className="relative shrink-0">
                              <img
                                src={project.testimonial.avatar}
                                alt={project.testimonial.author}
                                className="w-10 h-10 rounded-full border-2 border-black object-cover shadow-[1px_1px_0px_#000000]"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-red-600 rounded-full p-0.5 border border-black shadow-[1px_1px_0px_#000000]">
                                <Youtube className="w-2.5 h-2.5 text-white fill-white" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-black text-black">
                                  {project.testimonial.author}
                                </span>
                                {(project.testimonial.rolePt || project.testimonial.roleEn) && (
                                  <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded border border-red-300">
                                    {project.testimonial[lang === 'en' ? 'roleEn' : 'rolePt']}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-black text-neutral-900 italic mt-0.5 flex items-center gap-1">
                                <Quote className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30 shrink-0" />
                                <span>“{project.testimonial[lang === 'en' ? 'quoteEn' : 'quotePt']}”</span>
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <motion.a
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={project.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playClapSound}
                            className="py-2 px-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_#ef4444] hover:shadow-[3px_3px_0px_#ef4444] transition-all cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 text-red-500" />
                            <span>{t.showreelOpenYt}</span>
                            <ExternalLink className="w-3.5 h-3.5 ml-auto text-neutral-400" />
                          </motion.a>

                          <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => {
                              playClapSound();
                              setShowBudgetModal(true);
                            }}
                            className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t.showreelRequestBudget}</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Empty State when no projects match category or search query */}
                {folderFilteredProjects.length === 0 && (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-black/40 bg-neutral-50 text-center space-y-3 lg:col-span-2">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-white border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_#000000]">
                      {searchQuery ? '🔍' : CATEGORY_TABS.find((t) => t.id === activeFolderCategory)?.icon || '📁'}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-black">
                        {searchQuery ? t.modalProjectsNoResultsTitle : t.modalProjectsSoonTitle}
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto">
                        {searchQuery ? (
                          <>
                            {t.modalProjectsNoResultsDescTerm} <span className="font-bold text-red-600">"{searchQuery}"</span> {t.modalProjectsNoResultsDescFolder}
                          </>
                        ) : (
                          t.modalProjectsSoonDesc
                        )}
                      </p>
                    </div>
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs border border-black shadow-[2px_2px_0px_#ef4444] transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>{t.modalProjectsClearSearch}</span>
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => {
                          playClapSound();
                          setShowBudgetModal(true);
                        }}
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-red-600 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000000] cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.modalProjectsRequestFormat}</span>
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Folder Footer Note */}
              <motion.div variants={modalItemVariants} className="text-center pt-0.5 pb-0.5">
                <p className="text-xs font-semibold text-neutral-700 font-sans">
                  {t.modalProjectsFooterNote}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: PEDIR ORÇAMENTO (DISCORD OU WHATSAPP) */}
      <AnimatePresence>
        {showBudgetModal && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              data-lenis-prevent
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md bg-white border-[4px] border-black rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto space-y-4 shadow-[8px_8px_0px_#000000]"
            >
              <motion.div variants={modalItemVariants} className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-black">
                      {t.budgetModalTitle}
                    </h3>
                    <p className="text-[11px] font-bold text-neutral-500">
                      {t.budgetModalSubtitle}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playClapSound();
                    setShowBudgetModal(false);
                  }}
                  className="p-1.5 rounded-xl border-2 border-black text-black hover:bg-neutral-100 cursor-pointer shadow-[2px_2px_0px_#000000] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Opção 1: Discord */}
              <motion.div
                variants={modalItemVariants}
                className="p-4 rounded-2xl border-[3px] border-black bg-white shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#5865F2] text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                      <DiscordIcon className="w-7 h-7 fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base text-black">{t.discordCardTitle}</h4>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#5865F2] text-white border border-black">
                          {t.discordCardBadge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-600 mt-0.5">
                        {t.discordCardDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://discord.com/users/1243930539946278932"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClapSound}
                  className="w-full py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer"
                >
                  <DiscordIcon className="w-4 h-4 fill-white" />
                  <span>{t.discordCardButton}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </motion.a>
              </motion.div>

              {/* Opção 2: WhatsApp */}
              <motion.div
                variants={modalItemVariants}
                className="p-4 rounded-2xl border-[3px] border-black bg-white shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                      <WhatsAppIcon className="w-7 h-7 fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base text-black">{t.whatsappCardTitle}</h4>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#25D366] text-black border border-black">
                          16 99898-0590
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-600 mt-0.5">
                        {t.whatsappCardDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={
                      lang === 'en'
                        ? 'https://wa.me/5516998980590?text=Hey%20Arthur%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20a%20quote%20for%20video%20editing!'
                        : 'https://wa.me/5516998980590?text=Ol%C3%A1%20Arthur%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20edi%C3%A7%C3%A3o%20de%20v%C3%ADdeo!'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClapSound}
                    className="sm:col-span-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebc57] text-black font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-black" />
                    <span>{t.whatsappCardButton}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-black/70" />
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCopyWhatsApp}
                    title={lang === 'en' ? 'Copy phone number' : 'Copiar número de telefone'}
                    className="py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_#000000] transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.whatsappCardCopy}</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Informative Footer note */}
              <motion.div variants={modalItemVariants} className="text-center pt-1">
                <p className="text-[11px] font-semibold text-neutral-600">
                  {t.budgetModalFooter}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST CONFIRMATION */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="fixed bottom-6 z-50 px-4 py-2.5 rounded-2xl bg-white border-[3px] border-black text-black font-black text-xs flex items-center gap-2 shadow-[5px_5px_0px_#000000]"
          >
            <Check className="w-4 h-4 text-red-600" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
