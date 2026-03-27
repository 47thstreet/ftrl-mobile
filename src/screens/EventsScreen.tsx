import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockEvents } from '../utils/mockData';
import { Event } from '../types';

export const EventsScreen: React.FC = () => {
  const openTicketLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const eventDate = new Date(item.date + 'T00:00:00');
    const isUpcoming = eventDate >= new Date();

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.dateColumn}>
            <Text style={styles.dateMonth}>
              {eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
            </Text>
            <Text style={styles.dateDay}>{eventDate.getDate()}</Text>
            <Text style={styles.dateWeekday}>
              {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
          </View>

          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{item.name}</Text>
            <View style={styles.venueRow}>
              <Ionicons name="location-outline" size={14} color={colors.primary} />
              <Text style={styles.venueText}>{item.venue}</Text>
            </View>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
            </View>
          </View>

          {isUpcoming && (
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>UPCOMING</Text>
            </View>
          )}
        </View>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.lineupContainer}>
          <Text style={styles.lineupLabel}>LINEUP</Text>
          <View style={styles.lineupRow}>
            {item.lineup.map((artist, i) => (
              <View
                key={artist}
                style={[
                  styles.lineupChip,
                  artist === 'DJ NOVA' && styles.lineupChipHighlight,
                ]}
              >
                <Text
                  style={[
                    styles.lineupName,
                    artist === 'DJ NOVA' && styles.lineupNameHighlight,
                  ]}
                >
                  {artist}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.ticketButton}
          onPress={() => openTicketLink(item.ticketLink)}
        >
          <Ionicons name="ticket-outline" size={18} color={colors.text} />
          <Text style={styles.ticketText}>View Tickets</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.screenTitle}>Events</Text>
      <FlatList
        data={mockEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  screenTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  dateColumn: {
    width: 56,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
  },
  dateMonth: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary, letterSpacing: 1 },
  dateDay: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  dateWeekday: { fontSize: fontSize.xs, color: colors.textMuted },
  eventInfo: { flex: 1 },
  eventName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  venueRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  venueText: { fontSize: fontSize.sm, color: colors.primaryLight },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  timeText: { fontSize: fontSize.xs, color: colors.textMuted },
  liveBadge: {
    backgroundColor: 'rgba(6, 214, 160, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  liveBadgeText: { fontSize: 10, fontWeight: '800', color: colors.accent, letterSpacing: 1 },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  lineupContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lineupLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  lineupRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  lineupChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lineupChipHighlight: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  lineupName: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
  lineupNameHighlight: { color: colors.primaryLight },
  ticketButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceHighlight,
  },
  ticketText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
});
