import React from 'react';
import {
  Github,
  Linkedin,
  MessageCircle,
  Calendar,
  Youtube,
  Twitter,
  Mail,
  FileText,
  Globe,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
  Instagram,
  Music,
  Share2,
  FolderGit2,
  Layers,
  Send,
  Coffee,
  Check,
  Bookmark,
  Radio,
  Sliders,
  Smartphone,
  Eye,
  BarChart3,
  QrCode,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Download,
  Plus,
  Trash2,
  Edit3,
  ArrowUpRight,
  MoveUp,
  MoveDown,
  Clock,
  MapPin,
  Sparkle,
  Search
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const IconResolver: React.FC<IconProps> = ({ name, className = 'w-5 h-5' }) => {
  const normalized = name.toLowerCase().trim();

  switch (normalized) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'whatsapp':
    case 'message-circle':
      return <MessageCircle className={className} />;
    case 'calendar':
    case 'schedule':
      return <Calendar className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'twitter':
    case 'x':
      return <Twitter className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'file-text':
    case 'cv':
    case 'curriculo':
      return <FileText className={className} />;
    case 'code':
    case 'code2':
      return <Code2 className={className} />;
    case 'terminal':
      return <Terminal className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'music':
      return <Music className={className} />;
    case 'coffee':
      return <Coffee className={className} />;
    case 'folder':
    case 'project':
      return <FolderGit2 className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'globe':
    case 'website':
      return <Globe className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
};

export {
  Github,
  Linkedin,
  MessageCircle,
  Calendar,
  Youtube,
  Twitter,
  Mail,
  FileText,
  Globe,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
  Instagram,
  Music,
  Share2,
  FolderGit2,
  Layers,
  Send,
  Coffee,
  Check,
  Bookmark,
  Radio,
  Sliders,
  Smartphone,
  Eye,
  BarChart3,
  QrCode,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Download,
  Plus,
  Trash2,
  Edit3,
  ArrowUpRight,
  MoveUp,
  MoveDown,
  Clock,
  MapPin,
  Sparkle,
  Search
};
