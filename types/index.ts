export interface Topic {
  id: string;
  label: string;
  category: 'broad' | 'niche';
  icon: string;
  queryTerms: string[];
}

export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  author: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  summary: string | null;
  topics: string[];
}

export interface UserProfile {
  id: string;
  selectedTopics: string[];
  onboardingComplete: boolean;
}
