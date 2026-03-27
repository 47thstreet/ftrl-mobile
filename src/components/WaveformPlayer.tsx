import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface WaveformPlayerProps {
  title: string;
  artist?: string;
  duration: number;
  barCount?: number;
  waveformData?: number[];
  onPlay?: () => void;
  onPause?: () => void;
}

const generateWaveform = (count: number): number[] => {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    const position = i / count;
    const base = 0.3 + Math.sin(position * Math.PI) * 0.4;
    const noise = (Math.random() - 0.5) * 0.4;
    data.push(Math.max(0.1, Math.min(1, base + noise)));
  }
  return data;
};

const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  title,
  artist,
  duration,
  barCount = 60,
  waveformData,
  onPlay,
  onPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveform = useRef(waveformData || generateWaveform(barCount)).current;
  const containerWidth = Dimensions.get('window').width - spacing.md * 2 - 2;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      onPause?.();
    } else {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1 / duration;
          setCurrentTime(next * duration);
          return next;
        });
      }, 1000);
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleSeek = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const x = gestureState.moveX - spacing.md;
      const newProgress = Math.max(0, Math.min(1, x / containerWidth));
      setProgress(newProgress);
      setCurrentTime(newProgress * duration);
    },
    [containerWidth, duration]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        const newProgress = Math.max(0, Math.min(1, x / containerWidth));
        setProgress(newProgress);
        setCurrentTime(newProgress * duration);
      },
      onPanResponderMove: handleSeek,
    })
  ).current;

  const playedBars = Math.floor(progress * barCount);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.titleArea}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {artist && <Text style={styles.artist}>{artist}</Text>}
        </View>
        <Text style={styles.duration}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
      </View>

      <View style={styles.waveformContainer} {...panResponder.panHandlers}>
        <View style={styles.waveform}>
          {waveform.map((amplitude, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: amplitude * 40,
                  backgroundColor: i < playedBars ? colors.primary : colors.surfaceHighlight,
                },
              ]}
            />
          ))}
        </View>
        <View style={[styles.playhead, { left: `${progress * 100}%` }]} />
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: { flex: 1 },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  artist: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  duration: { fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '600' },
  waveformContainer: {
    height: 48,
    justifyContent: 'center',
    position: 'relative',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    gap: 1,
  },
  bar: {
    flex: 1,
    borderRadius: 1,
    minHeight: 4,
  },
  playhead: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: colors.text,
    borderRadius: 1,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 1.5,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 1.5,
  },
});
