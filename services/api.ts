import axios from 'axios';
import { Article } from '@/types';
import Constants from 'expo-constants';

// Use the Expo dev server's host to build the backend URL.
// In development on a physical device, localhost won't work — we need the LAN IP.
const devHost = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const API_BASE_URL = __DEV__
  ? `http://${devHost}:3000`
  : 'http://localhost:3000'; // Replace with production URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getNews(
  topics: string[],
  page = 1
): Promise<{ articles: Article[]; totalPages: number }> {
  const response = await apiClient.get('/api/news', {
    params: { topics: topics.join(','), page },
  });
  return {
    articles: response.data.articles,
    totalPages: response.data.pagination.totalPages,
  };
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
