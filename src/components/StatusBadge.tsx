import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

const statusConfig = {
  pending: { bg: 'rgba(245, 158, 11, 0.15)', color: colors.warning, label: 'Pending' },
  accepted: { bg: 'rgba(16, 185, 129, 0.15)', color: colors.success, label: 'Accepted' },
  declined: { bg: 'rgba(239, 68, 68, 0.15)', color: colors.error, label: 'Declined' },
  completed: { bg: 'rgba(139, 92, 246, 0.15)', color: colors.primary, label: 'Completed' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
