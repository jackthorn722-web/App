import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Article } from '@/types';

interface NewsCardProps {
  article: Article;
  onPress?: () => void;
}

export function NewsCard({ article, onPress }: NewsCardProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  const timeAgo = getTimeAgo(article.publishedAt);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      {article.imageUrl && (
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.meta}>
          <Text style={[styles.source, { color: theme.accent }]}>
            {article.source}
          </Text>
          <Text style={[styles.time, { color: theme.textSecondary }]}>
            {timeAgo}
          </Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={3}>
          {article.title}
        </Text>
        {article.description ? (
          <Text
            style={[styles.description, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {article.description}
          </Text>
        ) : null}
        {article.summary && (
          <View style={[styles.summaryBox, { backgroundColor: theme.accentLight }]}>
            <Text style={[styles.summaryLabel, { color: theme.accent }]}>
              AI Summary
            </Text>
            <Text style={[styles.summary, { color: theme.text }]}>
              {article.summary}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function getTimeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(dateString).toLocaleDateString();
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 14,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  source: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  time: {
    fontSize: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 4,
  },
  summaryBox: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
  },
});
