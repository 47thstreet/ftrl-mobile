import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockProfile, mockTracks, mockAnalytics } from '../utils/mockData';
import { SectionHeader } from '../components/SectionHeader';

export const EPKScreen: React.FC = () => {
  const profile = mockProfile;
  const topTracks = mockTracks.slice(0, 3);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${profile.name}'s Electronic Press Kit on FTRL\n\n${profile.bio}\n\nGenres: ${profile.genres.join(', ')}`,
        title: `${profile.name} - EPK`,
      });
    } catch {
      Alert.alert('Error', 'Could not share EPK.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>EPK</Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color={colors.text} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroAvatar}>
            <Ionicons name="person" size={56} color={colors.textMuted} />
          </View>
          <Text style={styles.heroName}>{profile.name}</Text>
          <Text style={styles.heroLocation}>{profile.location}</Text>
          <View style={styles.genreRow}>
            {profile.genres.map((genre) => (
              <View key={genre} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="About" />
        <View style={styles.section}>
          <Text style={styles.bioText}>{profile.bio}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{profile.yearsActive}</Text>
              <Text style={styles.metaLabel}>Years Active</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{mockTracks.length}</Text>
              <Text style={styles.metaLabel}>Tracks</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{(mockAnalytics.trackPlays / 1000).toFixed(0)}k</Text>
              <Text style={styles.metaLabel}>Plays</Text>
            </View>
          </View>
        </View>

        <SectionHeader title="Featured Tracks" />
        {topTracks.map((track) => (
          <View key={track.id} style={styles.trackCard}>
            <View style={styles.trackIcon}>
              <Ionicons name="musical-note" size={20} color={colors.primary} />
            </View>
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackMeta}>
                {track.genre} -- {track.bpm} BPM -- {track.plays.toLocaleString()} plays
              </Text>
            </View>
          </View>
        ))}

        <SectionHeader title="Connect" />
        <View style={styles.section}>
          {profile.socialLinks.map((link) => (
            <View key={link.platform} style={styles.socialRow}>
              <Ionicons name={link.icon as any} size={22} color={colors.primary} />
              <Text style={styles.socialPlatform}>{link.platform}</Text>
              <Ionicons name="open-outline" size={16} color={colors.textMuted} />
            </View>
          ))}
        </View>

        <SectionHeader title="Technical Rider" />
        <View style={styles.section}>
          {[
            { icon: 'headset-outline', text: '2x CDJ-3000 or XDJ-XZ' },
            { icon: 'options-outline', text: 'DJM-900NXS2 Mixer' },
            { icon: 'volume-high-outline', text: 'Monitor speaker (booth)' },
            { icon: 'flash-outline', text: 'Minimum 2x moving head lights' },
          ].map((item) => (
            <View key={item.text} style={styles.riderRow}>
              <Ionicons name={item.icon as any} size={18} color={colors.accent} />
              <Text style={styles.riderText}>{item.text}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  screenTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  shareText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  heroName: { fontSize: fontSize.hero, fontWeight: '800', color: colors.text, letterSpacing: 2 },
  heroLocation: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 4 },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md, justifyContent: 'center' },
  genreChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  genreText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primaryLight },
  section: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bioText: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24 },
  metaRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaItem: { flex: 1, alignItems: 'center' },
  metaValue: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  metaLabel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  metaDivider: { width: 1, backgroundColor: colors.border },
  trackCard: {
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
  trackIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: { flex: 1 },
  trackTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  trackMeta: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  socialPlatform: { flex: 1, fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  riderText: { fontSize: fontSize.sm, color: colors.textSecondary },
});
