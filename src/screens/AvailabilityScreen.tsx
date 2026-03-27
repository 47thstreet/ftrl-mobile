import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, DateData } from 'react-native-calendars';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockAvailability } from '../utils/mockData';
import { AvailabilityDate } from '../types';

export const AvailabilityScreen: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityDate[]>(mockAvailability);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    availability.forEach((a) => {
      marks[a.date] = {
        selected: true,
        selectedColor: a.available ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
        selectedTextColor: a.available ? colors.success : colors.error,
        marked: true,
        dotColor: a.available ? colors.success : colors.error,
      };
    });
    return marks;
  }, [availability]);

  const toggleDate = (day: DateData) => {
    const existing = availability.find((a) => a.date === day.dateString);
    if (existing) {
      setAvailability(
        availability.map((a) =>
          a.date === day.dateString ? { ...a, available: !a.available } : a
        )
      );
    } else {
      setAvailability([...availability, { date: day.dateString, available: true }]);
    }
  };

  const availableCount = availability.filter((a) => a.available).length;
  const bookedCount = availability.filter((a) => !a.available).length;

  const handleClearAll = () => {
    Alert.alert('Clear All Dates', 'Remove all availability markings?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => setAvailability([]) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Availability</Text>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Available ({availableCount})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
            <Text style={styles.legendText}>Booked ({bookedCount})</Text>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={toggleDate}
            markedDates={markedDates}
            theme={{
              calendarBackground: colors.surface,
              textSectionTitleColor: colors.textMuted,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.text,
              todayTextColor: colors.primary,
              dayTextColor: colors.text,
              textDisabledColor: colors.textMuted,
              monthTextColor: colors.text,
              arrowColor: colors.primary,
              textMonthFontWeight: '700',
              textDayFontWeight: '500',
              textDayHeaderFontWeight: '600',
              textMonthFontSize: fontSize.lg,
            }}
          />
        </View>

        <Text style={styles.hint}>Tap a date to toggle availability. Green = available, Red = booked.</Text>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Next Available Dates</Text>
          {availability
            .filter((a) => a.available && new Date(a.date + 'T00:00:00') >= new Date())
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, 5)
            .map((a) => {
              const d = new Date(a.date + 'T00:00:00');
              return (
                <View key={a.date} style={styles.dateRow}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.dateText}>
                    {d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </Text>
                  <TouchableOpacity onPress={() => toggleDate({ dateString: a.date } as DateData)}>
                    <Ionicons name="close-circle-outline" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  screenTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  clearButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearText: { fontSize: fontSize.sm, color: colors.error, fontWeight: '600' },
  legendRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: fontSize.sm, color: colors.textSecondary },
  calendarContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  hint: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  upcomingSection: { marginTop: spacing.lg },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateText: { flex: 1, fontSize: fontSize.sm, color: colors.text, fontWeight: '500' },
});
