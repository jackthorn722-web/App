import { create } from 'zustand';
import { Article } from '@/types';
import { getNews } from '@/services/api';
import { useTopicStore } from './useTopicStore';

interface NewsState {
  articles: Article[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  fetchNews: () => Promise<void>;
  refreshNews: () => Promise<void>;
  loadMore: () => Promise<void>;
  clearNews: () => void;
}

export const useNewsStore = create<NewsState>()((set, get) => ({
  articles: [],
  loading: false,
  refreshing: false,
  error: null,
  page: 1,
  totalPages: 0,

  fetchNews: async () => {
    const topics = useTopicStore.getState().selectedTopics;
    if (topics.length === 0) return;

    set({ loading: true, error: null });
    try {
      const data = await getNews(topics, 1);
      set({
        articles: data.articles,
        loading: false,
        page: 1,
        totalPages: data.totalPages,
      });
    } catch (e: any) {
      set({
        error: e.message || 'Failed to fetch news',
        loading: false,
      });
    }
  },

  refreshNews: async () => {
    const topics = useTopicStore.getState().selectedTopics;
    if (topics.length === 0) return;

    set({ refreshing: true, error: null });
    try {
      const data = await getNews(topics, 1);
      set({
        articles: data.articles,
        refreshing: false,
        page: 1,
        totalPages: data.totalPages,
      });
    } catch (e: any) {
      set({
        error: e.message || 'Failed to refresh news',
        refreshing: false,
      });
    }
  },

  loadMore: async () => {
    const { page, totalPages, loading } = get();
    if (loading || page >= totalPages) return;

    const topics = useTopicStore.getState().selectedTopics;
    const nextPage = page + 1;

    set({ loading: true });
    try {
      const data = await getNews(topics, nextPage);
      set((state) => ({
        articles: [...state.articles, ...data.articles],
        loading: false,
        page: nextPage,
        totalPages: data.totalPages,
      }));
    } catch (e: any) {
      set({ error: e.message || 'Failed to load more', loading: false });
    }
  },

  clearNews: () => set({ articles: [], error: null, page: 1, totalPages: 0 }),
}));
