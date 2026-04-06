import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <Text style={[styles.source, { color: theme.accent }]}>
        {article.source}
      </Text>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {article.title}
      </Text>
      {article.summary && (
        <Text style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={3}>
          {article.summary}
        </Text>
      )}
      <Text style={[styles.time, { color: theme.textSecondary }]}>
        {new Date(article.publishedAt).toLocaleDateString()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
  },
});
