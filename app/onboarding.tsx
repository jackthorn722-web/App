import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopicChip } from '@/components/TopicChip';
import { BROAD_TOPICS, NICHE_TOPICS } from '@/constants/topics';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useTopicStore } from '@/store/useTopicStore';

const MIN_TOPICS = 3;

export default function OnboardingScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  const selectedTopics = useTopicStore((s) => s.selectedTopics);
  const toggleTopic = useTopicStore((s) => s.toggleTopic);
  const completeOnboarding = useTopicStore((s) => s.completeOnboarding);

  const canContinue = selectedTopics.length >= MIN_TOPICS;

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/(tabs)/feed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            What interests you?
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Pick at least {MIN_TOPICS} topics to personalize your feed. Only the signal, zero noise.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            BROAD CATEGORIES
          </Text>
          <View style={styles.chipGrid}>
            {BROAD_TOPICS.map((topic) => (
              <TopicChip
                key={topic.id}
                label={topic.label}
                icon={topic.icon}
                selected={selectedTopics.includes(topic.id)}
                onPress={() => toggleTopic(topic.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            NICHE INTERESTS
          </Text>
          <View style={styles.chipGrid}>
            {NICHE_TOPICS.map((topic) => (
              <TopicChip
                key={topic.id}
                label={topic.label}
                icon={topic.icon}
                selected={selectedTopics.includes(topic.id)}
                onPress={() => toggleTopic(topic.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Text style={[styles.count, { color: theme.textSecondary }]}>
          {selectedTopics.length} selected
        </Text>
        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          style={[
            styles.continueButton,
            {
              backgroundColor: canContinue ? theme.accent : theme.surface,
              opacity: canContinue ? 1 : 0.5,
            },
          ]}
        >
          <Text
            style={[
              styles.continueText,
              { color: canContinue ? '#FFFFFF' : theme.textSecondary },
            ]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
