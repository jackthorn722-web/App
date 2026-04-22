import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useTopicStore } from '@/store/useTopicStore';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  const selectedTopics = useTopicStore((s) => s.selectedTopics);
  const resetOnboarding = useTopicStore((s) => s.resetOnboarding);

  const handleReset = () => {
    Alert.alert(
      'Reset Topics',
      'This will clear your selected topics and return to the onboarding screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetOnboarding();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.row}>
          <FontAwesome name="tags" size={16} color={theme.accent} />
          <Text style={[styles.label, { color: theme.text }]}>Selected Topics</Text>
          <Text style={[styles.value, { color: theme.textSecondary }]}>
            {selectedTopics.length}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleReset}
        style={[styles.resetButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
      >
        <FontAwesome name="refresh" size={16} color={theme.error} />
        <Text style={[styles.resetText, { color: theme.error }]}>
          Reset Topic Selection
        </Text>
      </Pressable>

      <Text style={[styles.version, { color: theme.textSecondary }]}>
        Signal v1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 32,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
  },
});
