import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';

interface TopicChipProps {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export function TopicChip({ label, icon, selected, onPress }: TopicChipProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.accentLight : theme.surface,
          borderColor: selected ? theme.accent : theme.border,
        },
      ]}
    >
      <FontAwesome
        name={icon as any}
        size={14}
        color={selected ? theme.accent : theme.textSecondary}
        style={styles.icon}
      />
      <Text
        style={[
          styles.label,
          { color: selected ? theme.accent : theme.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    margin: 4,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
