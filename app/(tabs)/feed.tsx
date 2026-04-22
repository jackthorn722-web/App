import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
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
  const refreshing = useNewsStore((s) => s.refreshing);
  const error = useNewsStore((s) => s.error);
  const fetchNews = useNewsStore((s) => s.fetchNews);
  const refreshNews = useNewsStore((s) => s.refreshNews);
  const loadMore = useNewsStore((s) => s.loadMore);

  const selectedLabels = TOPICS.filter((t) => selectedTopics.includes(t.id)).map(
    (t) => t.label
  );

  useEffect(() => {
    fetchNews();
  }, [selectedTopics]);

  const handleRefresh = useCallback(() => {
    refreshNews();
  }, []);

  const handleOpenArticle = useCallback((url: string) => {
    WebBrowser.openBrowserAsync(url);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard article={item} onPress={() => handleOpenArticle(item.url)} />
        )}
        contentContainerStyle={articles.length === 0 ? styles.emptyList : styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.accent}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
        ListFooterComponent={
          loading && articles.length > 0 ? (
            <ActivityIndicator
              style={styles.footer}
              color={theme.accent}
              size="small"
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color={theme.accent} />
                <Text style={[styles.emptyText, { color: theme.textSecondary, marginTop: 16 }]}>
                  Fetching your personalized news feed...
                </Text>
              </>
            ) : error ? (
              <>
                <Text style={[styles.emptyTitle, { color: theme.error }]}>
                  Something went wrong
                </Text>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  {error}
                </Text>
                <Pressable
                  onPress={fetchNews}
                  style={[styles.retryButton, { backgroundColor: theme.accent }]}
                >
                  <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={[styles.emptyTitle, { color: theme.text }]}>
                  No articles found
                </Text>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  Pull down to refresh, or check your topic selections in Settings.
                </Text>
              </>
            )}
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
  emptyList: {
    flexGrow: 1,
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
  footer: {
    paddingVertical: 20,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
