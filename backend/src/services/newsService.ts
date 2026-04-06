import axios from 'axios';

const NEWS_API_BASE = 'https://newsapi.org/v2';

// Reputable source domains for filtering
const REPUTABLE_SOURCES = [
  'reuters.com',
  'apnews.com',
  'bbc.com',
  'bbc.co.uk',
  'nytimes.com',
  'washingtonpost.com',
  'theguardian.com',
  'bloomberg.com',
  'cnbc.com',
  'techcrunch.com',
  'arstechnica.com',
  'wired.com',
  'nature.com',
  'espn.com',
  'theverge.com',
];

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
  author: string | null;
  content: string | null;
}

// Phase 2: Implement actual API calls
export async function fetchByTopics(
  queryTerms: string[],
  page: number = 1,
  pageSize: number = 20
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  // Will use: GET ${NEWS_API_BASE}/everything?q=${query}&page=${page}&pageSize=${pageSize}
  // With header: X-Api-Key: ${process.env.NEWS_API_KEY}
  // Filter results through REPUTABLE_SOURCES

  return { articles: [], totalResults: 0 };
}

export { REPUTABLE_SOURCES };
