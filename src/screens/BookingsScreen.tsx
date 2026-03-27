import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockBookings } from '../utils/mockData';
import { Booking } from '../types';
import { StatusBadge } from '../components/StatusBadge';

type FilterType = 'all' | 'pending' | 'accepted' | 'completed';

export const BookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const handleAccept = (id: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'accepted' as const } : b)));
    Alert.alert('Accepted', 'Booking confirmed.');
  };

  const handleDecline = (id: string) => {
    Alert.alert('Decline Booking', 'Are you sure you want to decline?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'declined' as const } : b))),
      },
    ]);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.dateBox}>
          <Text style={styles.dateDay}>{new Date(item.date + 'T00:00:00').getDate()}</Text>
          <Text style={styles.dateMonth}>
            {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.venueName}>{item.venueName}</Text>
          <Text style={styles.venueAddress}>{item.venueAddress}</Text>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color={colors.textMuted} />
            <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.feeContainer}>
          <Text style={styles.feeLabel}>Fee</Text>
          <Text style={styles.feeValue}>${item.fee.toLocaleString()}</Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Contact</Text>
          <Text style={styles.contactValue}>{item.contactName}</Text>
        </View>
      </View>

      {item.notes ? (
        <View style={styles.notesContainer}>
          <Ionicons name="document-text-outline" size={14} color={colors.textMuted} />
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      ) : null}

      {item.status === 'pending' && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.declineButton]}
            onPress={() => handleDecline(item.id)}
          >
            <Ionicons name="close" size={18} color={colors.error} />
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleAccept(item.id)}
          >
            <Ionicons name="checkmark" size={18} color={colors.text} />
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'accepted', label: 'Upcoming' },
    { key: 'completed', label: 'Past' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.screenTitle}>Bookings</Text>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No bookings in this category</Text>
          </View>
        }
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
  filterTextActive: { color: colors.text },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  dateBox: {
    width: 50,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDay: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  dateMonth: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  cardInfo: { flex: 1 },
  venueName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  venueAddress: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  timeText: { fontSize: fontSize.xs, color: colors.textSecondary },
  detailsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.lg,
  },
  feeContainer: {},
  feeLabel: { fontSize: fontSize.xs, color: colors.textMuted },
  feeValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.accent },
  contactContainer: {},
  contactLabel: { fontSize: fontSize.xs, color: colors.textMuted },
  contactValue: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginTop: 2 },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.md,
    backgroundColor: colors.surfaceLight,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  notesText: { fontSize: fontSize.xs, color: colors.textSecondary, flex: 1 },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  declineButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  acceptButton: { backgroundColor: colors.primary },
  declineText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.error },
  acceptText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyText: { fontSize: fontSize.md, color: colors.textMuted },
});
