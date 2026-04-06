import axios from 'axios';
import { Article } from '@/types';

const API_BASE_URL = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Stub API functions — will be implemented in Phase 2

export async function getNews(
  topics: string[],
  page = 1
): Promise<{ articles: Article[]; totalPages: number }> {
  const response = await apiClient.get('/api/news', {
    params: { topics: topics.join(','), page },
  });
  return response.data;
}

export async function getSummary(
  articleUrl: string,
  articleText: string
): Promise<{ summary: string }> {
  const response = await apiClient.post('/api/summary', {
    articleUrl,
    articleText,
  });
  return response.data;
}
