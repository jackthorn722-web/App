import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TopicState {
  selectedTopics: string[];
  onboardingComplete: boolean;
  toggleTopic: (id: string) => void;
  setTopics: (ids: string[]) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useTopicStore = create<TopicState>()(
  persist(
    (set) => ({
      selectedTopics: [],
      onboardingComplete: false,

      toggleTopic: (id) =>
        set((state) => ({
          selectedTopics: state.selectedTopics.includes(id)
            ? state.selectedTopics.filter((t) => t !== id)
            : [...state.selectedTopics, id],
        })),

      setTopics: (ids) => set({ selectedTopics: ids }),

      completeOnboarding: () => set({ onboardingComplete: true }),

      resetOnboarding: () =>
        set({ selectedTopics: [], onboardingComplete: false }),
    }),
    {
      name: 'topic-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
