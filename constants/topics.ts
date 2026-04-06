import { Topic } from '@/types';

export const TOPICS: Topic[] = [
  // Broad categories
  {
    id: 'world-news',
    label: 'World News',
    category: 'broad',
    icon: 'globe',
    queryTerms: ['world news', 'international news', 'global affairs'],
  },
  {
    id: 'politics',
    label: 'Politics',
    category: 'broad',
    icon: 'institution',
    queryTerms: ['politics', 'government', 'policy'],
  },
  {
    id: 'technology',
    label: 'Technology',
    category: 'broad',
    icon: 'laptop',
    queryTerms: ['technology', 'tech industry', 'software'],
  },
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    category: 'broad',
    icon: 'microchip',
    queryTerms: ['artificial intelligence', 'machine learning', 'AI industry'],
  },
  {
    id: 'business',
    label: 'Business & Finance',
    category: 'broad',
    icon: 'briefcase',
    queryTerms: ['business', 'finance', 'economy', 'markets'],
  },
  {
    id: 'science',
    label: 'Science',
    category: 'broad',
    icon: 'flask',
    queryTerms: ['science', 'research', 'scientific discovery'],
  },
  {
    id: 'health',
    label: 'Health & Medicine',
    category: 'broad',
    icon: 'heartbeat',
    queryTerms: ['health', 'medicine', 'healthcare'],
  },
  {
    id: 'sports',
    label: 'Sports',
    category: 'broad',
    icon: 'futbol-o',
    queryTerms: ['sports', 'athletics', 'championships'],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    category: 'broad',
    icon: 'film',
    queryTerms: ['entertainment', 'movies', 'music', 'celebrities'],
  },

  // Niche categories
  {
    id: 'day-trading',
    label: 'Day Trading & Macro',
    category: 'niche',
    icon: 'line-chart',
    queryTerms: ['day trading', 'macroeconomics', 'stock market', 'Federal Reserve'],
  },
  {
    id: 'houston-texans',
    label: 'Houston Texans',
    category: 'niche',
    icon: 'shield',
    queryTerms: ['Houston Texans', 'NFL Texans', 'Texans roster'],
  },
  {
    id: 'jdm-cars',
    label: 'JDM Cars & Builds',
    category: 'niche',
    icon: 'car',
    queryTerms: ['JDM cars', 'Japanese car imports', 'JDM builds', 'Japanese domestic market'],
  },
  {
    id: 'crypto',
    label: 'Cryptocurrency',
    category: 'niche',
    icon: 'bitcoin',
    queryTerms: ['cryptocurrency', 'Bitcoin', 'Ethereum', 'blockchain'],
  },
  {
    id: 'space',
    label: 'Space Exploration',
    category: 'niche',
    icon: 'rocket',
    queryTerms: ['space exploration', 'NASA', 'SpaceX', 'astronomy'],
  },
  {
    id: 'indie-gaming',
    label: 'Indie Gaming',
    category: 'niche',
    icon: 'gamepad',
    queryTerms: ['indie games', 'indie gaming', 'independent game development'],
  },
  {
    id: 'climate-tech',
    label: 'Climate & Clean Tech',
    category: 'niche',
    icon: 'leaf',
    queryTerms: ['climate tech', 'clean energy', 'renewable energy', 'climate change'],
  },
  {
    id: 'startups',
    label: 'Startups & VC',
    category: 'niche',
    icon: 'lightbulb-o',
    queryTerms: ['startups', 'venture capital', 'seed funding', 'Y Combinator'],
  },
];

export const BROAD_TOPICS = TOPICS.filter((t) => t.category === 'broad');
export const NICHE_TOPICS = TOPICS.filter((t) => t.category === 'niche');
