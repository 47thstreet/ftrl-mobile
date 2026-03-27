import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: keyof typeof Ionicons.glyphMap;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
  const trendColor = trend && trend > 0 ? colors.accent : trend && trend < 0 ? colors.error : colors.textMuted;
  const trendIcon = trend && trend > 0 ? 'trending-up' : 'trending-down';

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.value}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend !== undefined && (
        <View style={styles.trendRow}>
          <Ionicons name={trendIcon} size={14} color={trendColor} />
          <Text style={[styles.trendText, { color: trendColor }]}>
            {trend > 0 ? '+' : ''}{trend}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  trendText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
});
