export type ThemeId = 'noir' | 'atelier' | 'aurora' | 'brutalist' | 'monolith';

export type LayoutMode = 'bento' | 'stream' | 'phone';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  category: 'social' | 'work' | 'contact' | 'content' | 'project';
  icon: string;
  isPinned?: boolean;
  clicks: number;
  badge?: string;
  customColor?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  repoUrl?: string;
  tags: string[];
  metric: string;
  category: string;
}

export interface SkillItem {
  name: string;
  category: string;
  level: number;
  iconName?: string;
}

export interface DirectMessage {
  id: string;
  senderName: string;
  senderContact: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  availability: {
    status: 'available' | 'busy' | 'selective';
    text: string;
    scheduleUrl: string;
  };
  stats: {
    views: number;
    connections: string;
    experience: string;
  };
  theme: ThemeId;
  soundEnabled: boolean;
}
