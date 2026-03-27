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
import { mockTracks } from '../utils/mockData';
import { Track } from '../types';
import { WaveformPlayer } from '../components/WaveformPlayer';

const formatDuration = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export const TracksScreen: React.FC = () => {
  const [tracks] = useState<Track[]>(mockTracks);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const handleUpload = () => {
    Alert.alert('Upload Track', 'Audio file picker would open here.');
  };

  const renderTrack = ({ item, index }: { item: Track; index: number }) => (
    <View style={styles.trackCard}>
      <TouchableOpacity style={styles.playButton} onPress={() => togglePlay(item.id)}>
        <Ionicons
          name={playingId === item.id ? 'pause' : 'play'}
          size={22}
          color={colors.text}
        />
      </TouchableOpacity>

      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.trackMeta}>
          <Text style={styles.metaText}>{item.genre}</Text>
          <Text style={styles.metaDot}>--</Text>
          <Text style={styles.metaText}>{item.bpm} BPM</Text>
          <Text style={styles.metaDot}>--</Text>
          <Text style={styles.metaText}>{formatDuration(item.duration)}</Text>
        </View>
      </View>

      <View style={styles.trackStats}>
        <Ionicons name="play-circle-outline" size={14} color={colors.textMuted} />
        <Text style={styles.playsText}>{item.plays.toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      {playingId === item.id && (
        <View style={styles.waveformBar}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.waveformLine,
                { height: 4 + Math.random() * 16, backgroundColor: i < 12 ? colors.primary : colors.surfaceHighlight },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Tracks</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Ionicons name="cloud-upload-outline" size={20} color={colors.text} />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tracks.length}</Text>
          <Text style={styles.statLabel}>Tracks</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tracks.reduce((sum, t) => sum + t.plays, 0).toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Plays</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.round(tracks.reduce((sum, t) => sum + t.bpm, 0) / tracks.length)}</Text>
          <Text style={styles.statLabel}>Avg BPM</Text>
        </View>
      </View>

      <FlatList
        data={tracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {playingId && (() => {
        const track = tracks.find((t) => t.id === playingId);
        if (!track) return null;
        return (
          <View style={styles.nowPlaying}>
            <WaveformPlayer
              title={track.title}
              artist={`${track.genre} -- ${track.bpm} BPM`}
              duration={track.duration}
              barCount={50}
            />
          </View>
        );
      })()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  screenTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  uploadText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: colors.border },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  trackInfo: { flex: 1 },
  trackTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  trackMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  metaText: { fontSize: fontSize.xs, color: colors.textMuted },
  metaDot: { fontSize: fontSize.xs, color: colors.border },
  trackStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: spacing.sm,
  },
  playsText: { fontSize: fontSize.xs, color: colors.textMuted },
  moreButton: { padding: spacing.xs },
  waveformBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    paddingHorizontal: spacing.sm,
  },
  waveformLine: {
    flex: 1,
    borderRadius: 1,
  },
  nowPlaying: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
