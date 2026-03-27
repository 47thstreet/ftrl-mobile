import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockAnalytics } from '../utils/mockData';
import { StatCard } from '../components/StatCard';
import { SectionHeader } from '../components/SectionHeader';

export const AnalyticsScreen: React.FC = () => {
  const data = mockAnalytics;
  const maxPlays = Math.max(...data.weeklyPlays);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Analytics</Text>
        <Text style={styles.subtitle}>Last 30 days</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard label="Profile Views" value={data.profileViews} trend={data.profileViewsTrend} icon="eye-outline" />
            <View style={{ width: spacing.sm }} />
            <StatCard label="Track Plays" value={data.trackPlays} trend={data.trackPlaysTrend} icon="musical-notes-outline" />
          </View>
          <View style={styles.statsRow}>
            <StatCard label="Booking Requests" value={data.bookingRequests} trend={data.bookingRequestsTrend} icon="calendar-outline" />
            <View style={{ width: spacing.sm }} />
            <StatCard label="EPK Views" value={data.epkViews} trend={data.epkViewsTrend} icon="document-outline" />
          </View>
        </View>

        <SectionHeader title="Weekly Plays" />
        <View style={styles.chartContainer}>
          <View style={styles.barChart}>
            {data.weeklyPlays.map((plays, i) => (
              <View key={i} style={styles.barColumn}>
                <Text style={styles.barValue}>{(plays / 1000).toFixed(1)}k</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (plays / maxPlays) * 120,
                      backgroundColor: i === data.weeklyPlays.length - 1 ? colors.primary : colors.surfaceHighlight,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{days[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="Top Tracks" />
        {data.topTracks.map((track, i) => (
          <View key={track.name} style={styles.trackRow}>
            <Text style={styles.trackRank}>#{i + 1}</Text>
            <View style={styles.trackInfo}>
              <Text style={styles.trackName}>{track.name}</Text>
              <View style={styles.trackBarBg}>
                <View
                  style={[
                    styles.trackBarFill,
                    { width: `${(track.plays / data.topTracks[0].plays) * 100}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.trackPlays}>{track.plays.toLocaleString()}</Text>
          </View>
        ))}

        <SectionHeader title="Genre Breakdown" />
        <View style={styles.genreList}>
          {data.genreBreakdown.map((g) => (
            <View key={g.genre} style={styles.genreRow}>
              <View style={styles.genreDot} />
              <Text style={styles.genreName}>{g.genre}</Text>
              <View style={styles.genreBarBg}>
                <View style={[styles.genreBarFill, { width: `${g.percentage}%` }]} />
              </View>
              <Text style={styles.genrePercent}>{g.percentage}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  screenTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2, marginBottom: spacing.md },
  statsGrid: { gap: spacing.sm },
  statsRow: { flexDirection: 'row' },
  chartContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  barChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 170 },
  barColumn: { alignItems: 'center', flex: 1 },
  barValue: { fontSize: 10, color: colors.textMuted, marginBottom: 4 },
  bar: { width: 28, borderRadius: borderRadius.sm, minHeight: 8 },
  barLabel: { fontSize: 10, color: colors.textMuted, marginTop: 6 },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  trackRank: { fontSize: fontSize.md, fontWeight: '800', color: colors.primary, width: 28 },
  trackInfo: { flex: 1 },
  trackName: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: 6 },
  trackBarBg: {
    height: 4,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackBarFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 },
  trackPlays: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textSecondary },
  genreList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  genreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  genreDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  genreName: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600', width: 90 },
  genreBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  genreBarFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
  genrePercent: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textSecondary, width: 36, textAlign: 'right' },
});
