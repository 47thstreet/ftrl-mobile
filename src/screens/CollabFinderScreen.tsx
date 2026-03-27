import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface CollabDJ {
  id: string;
  name: string;
  genres: string[];
  location: string;
  followers: number;
  matchScore: number;
  available: boolean;
  bio: string;
}

const mockCollabs: CollabDJ[] = [
  { id: '1', name: 'AXIOM', genres: ['Techno', 'Minimal'], location: 'Miami, FL', followers: 8200, matchScore: 94, available: true, bio: 'Dark techno producer and live performer. Open to B2B sets and studio collabs.' },
  { id: '2', name: 'Kora Beats', genres: ['Afro House', 'Deep House'], location: 'Miami, FL', followers: 12400, matchScore: 88, available: true, bio: 'Afrocentric house music producer blending traditional rhythms with modern production.' },
  { id: '3', name: 'Luna Wave', genres: ['House', 'Melodic Techno'], location: 'Fort Lauderdale, FL', followers: 5600, matchScore: 82, available: false, bio: 'Emotional dance music with ethereal vocals. Looking for remix partners.' },
  { id: '4', name: 'Pulse Theory', genres: ['Techno', 'House'], location: 'Miami, FL', followers: 15800, matchScore: 79, available: true, bio: 'Peak-time techno with driving basslines. Resident at multiple Miami venues.' },
  { id: '5', name: 'Deep Signal', genres: ['Deep House', 'Progressive'], location: 'Orlando, FL', followers: 3400, matchScore: 75, available: true, bio: 'Progressive journeys and deep grooves. Interested in festival B2B opportunities.' },
  { id: '6', name: 'Hex Machine', genres: ['Techno', 'Industrial'], location: 'Miami, FL', followers: 7100, matchScore: 71, available: false, bio: 'Hard-hitting industrial techno. Seeking collab on dark warehouse-style tracks.' },
];

export const CollabFinderScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const genres = ['Techno', 'House', 'Deep House', 'Afro House', 'Melodic Techno', 'Minimal'];

  const filtered = mockCollabs.filter((dj) => {
    if (search && !dj.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterGenre && !dj.genres.includes(filterGenre)) return false;
    if (showAvailableOnly && !dj.available) return false;
    return true;
  });

  const handleConnect = (dj: CollabDJ) => {
    Alert.alert('Connect', `Send a collaboration request to ${dj.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send Request', onPress: () => Alert.alert('Sent', `Request sent to ${dj.name}.`) },
    ]);
  };

  const renderDJ = ({ item }: { item: CollabDJ }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.djName}>{item.name}</Text>
            {item.available && (
              <View style={styles.availBadge}>
                <View style={styles.availDot} />
                <Text style={styles.availText}>Available</Text>
              </View>
            )}
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color={colors.textMuted} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchScore}>{item.matchScore}%</Text>
          <Text style={styles.matchLabel}>match</Text>
        </View>
      </View>

      <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>

      <View style={styles.genreRow}>
        {item.genres.map((g) => (
          <View key={g} style={styles.genreChip}>
            <Text style={styles.genreText}>{g}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.followersRow}>
          <Ionicons name="people-outline" size={14} color={colors.textMuted} />
          <Text style={styles.followersText}>{item.followers.toLocaleString()} followers</Text>
        </View>
        <TouchableOpacity style={styles.connectButton} onPress={() => handleConnect(item)}>
          <Ionicons name="link-outline" size={16} color={colors.text} />
          <Text style={styles.connectText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.screenTitle}>Collab Finder</Text>
      <Text style={styles.subtitle}>Find DJs to collaborate with</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search DJs..."
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <TouchableOpacity
          style={[styles.filterToggle, showAvailableOnly && styles.filterToggleActive]}
          onPress={() => setShowAvailableOnly(!showAvailableOnly)}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color={showAvailableOnly ? colors.text : colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.genreFilter}>
        <TouchableOpacity
          style={[styles.filterChip, !filterGenre && styles.filterChipActive]}
          onPress={() => setFilterGenre(null)}
        >
          <Text style={[styles.filterChipText, !filterGenre && styles.filterChipTextActive]}>All</Text>
        </TouchableOpacity>
        {genres.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.filterChip, filterGenre === g && styles.filterChipActive]}
            onPress={() => setFilterGenre(filterGenre === g ? null : g)}
          >
            <Text style={[styles.filterChipText, filterGenre === g && styles.filterChipTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderDJ}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No DJs match your filters</Text>
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
  },
  subtitle: { fontSize: fontSize.sm, color: colors.textMuted, paddingHorizontal: spacing.md, marginTop: 2, marginBottom: spacing.md },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fontSize.md, color: colors.text, paddingVertical: spacing.sm },
  filterToggle: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterToggleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  genreFilter: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: colors.text },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  avatarText: { fontSize: fontSize.lg, fontWeight: '800', color: colors.primary },
  headerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  djName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  availBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  availDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  availText: { fontSize: 10, color: colors.success, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  locationText: { fontSize: fontSize.xs, color: colors.textMuted },
  matchBadge: { alignItems: 'center' },
  matchScore: { fontSize: fontSize.lg, fontWeight: '800', color: colors.accent },
  matchLabel: { fontSize: 10, color: colors.textMuted },
  bio: { fontSize: fontSize.sm, color: colors.textSecondary, lineHeight: 20, marginTop: spacing.sm },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  genreChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
  },
  genreText: { fontSize: fontSize.xs, color: colors.primaryLight, fontWeight: '600' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  followersRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  followersText: { fontSize: fontSize.xs, color: colors.textMuted },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  connectText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.md },
  emptyText: { fontSize: fontSize.md, color: colors.textMuted },
});
