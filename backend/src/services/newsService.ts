import axios from 'axios';

const NEWS_API_BASE = 'https://newsapi.org/v2';

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

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Map topic IDs to search query terms
const TOPIC_QUERIES: Record<string, string[]> = {
  'world-news': ['world news', 'international news', 'global affairs'],
  'politics': ['politics', 'government', 'policy'],
  'technology': ['technology', 'tech industry', 'software'],
  'ai': ['artificial intelligence', 'machine learning', 'AI industry'],
  'business': ['business', 'finance', 'economy', 'markets'],
  'science': ['science', 'research', 'scientific discovery'],
  'health': ['health', 'medicine', 'healthcare'],
  'sports': ['sports', 'athletics', 'championships'],
  'entertainment': ['entertainment', 'movies', 'music', 'celebrities'],
  'day-trading': ['day trading', 'macroeconomics', 'stock market', 'Federal Reserve'],
  'houston-texans': ['Houston Texans', 'NFL Texans', 'Texans roster'],
  'jdm-cars': ['JDM cars', 'Japanese car imports', 'JDM builds'],
  'crypto': ['cryptocurrency', 'Bitcoin', 'Ethereum', 'blockchain'],
  'space': ['space exploration', 'NASA', 'SpaceX', 'astronomy'],
  'indie-gaming': ['indie games', 'indie gaming', 'independent game development'],
  'climate-tech': ['climate tech', 'clean energy', 'renewable energy'],
  'startups': ['startups', 'venture capital', 'seed funding', 'Y Combinator'],
};

function buildQuery(topicIds: string[]): string {
  const terms: string[] = [];
  for (const id of topicIds) {
    const topicTerms = TOPIC_QUERIES[id];
    if (topicTerms) {
      // Use the first (most specific) term from each topic
      terms.push(`"${topicTerms[0]}"`);
    } else {
      // If it's an unknown topic ID, use it directly as a search term
      terms.push(id);
    }
  }
  // Join with OR so we get articles matching any selected topic
  return terms.join(' OR ');
}

function isReputableSource(url: string): boolean {
  return REPUTABLE_SOURCES.some((domain) => url.includes(domain));
}

export async function fetchByTopics(
  topicIds: string[],
  page: number = 1,
  pageSize: number = 20
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('NEWS_API_KEY is not configured');
  }

  if (topicIds.length === 0) {
    return { articles: [], totalResults: 0 };
  }

  const query = buildQuery(topicIds);

  const response = await axios.get<NewsAPIResponse>(`${NEWS_API_BASE}/everything`, {
    params: {
      q: query,
      page,
      pageSize: pageSize * 2, // Fetch extra to account for filtering
      sortBy: 'publishedAt',
      language: 'en',
    },
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  if (response.data.status !== 'ok') {
    throw new Error('NewsAPI returned an error');
  }

  // Filter to reputable sources only
  const filtered = response.data.articles
    .filter((a) => a.url && isReputableSource(a.url))
    .filter((a) => a.title && a.title !== '[Removed]')
    .slice(0, pageSize);

  return {
    articles: filtered,
    totalResults: response.data.totalResults,
  };
}

export { REPUTABLE_SOURCES, TOPIC_QUERIES };
