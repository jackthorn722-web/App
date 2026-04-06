import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useTopicStore } from '@/store/useTopicStore';
import { useNewsStore } from '@/store/useNewsStore';
import { NewsCard } from '@/components/NewsCard';
import { TOPICS } from '@/constants/topics';

export default function FeedScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  const selectedTopics = useTopicStore((s) => s.selectedTopics);
  const articles = useNewsStore((s) => s.articles);
  const loading = useNewsStore((s) => s.loading);

  const selectedLabels = TOPICS.filter((t) => selectedTopics.includes(t.id)).map(
    (t) => t.label
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard article={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.topicRow}>
              {selectedLabels.map((label) => (
                <View
                  key={label}
                  style={[styles.topicBadge, { backgroundColor: theme.accentLight }]}
                >
                  <Text style={[styles.topicBadgeText, { color: theme.accent }]}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyIcon, { color: theme.textSecondary }]}>
              {loading ? 'Loading...' : 'No articles yet'}
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {loading
                ? 'Fetching your personalized news feed'
                : 'Your personalized news feed will appear here.\nAPI integration coming in Phase 2.'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  topicRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  topicBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
