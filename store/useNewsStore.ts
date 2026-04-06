import { create } from 'zustand';
import { Article } from '@/types';

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
  clearNews: () => void;
}

export const useNewsStore = create<NewsState>()((set) => ({
  articles: [],
  loading: false,
  error: null,

  // Stub — will be implemented in Phase 2
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Phase 2 — call backend /api/news
      set({ articles: [], loading: false });
    } catch (e) {
      set({ error: 'Failed to fetch news', loading: false });
    }
  },

  clearNews: () => set({ articles: [], error: null }),
}));
