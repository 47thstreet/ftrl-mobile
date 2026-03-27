import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { SectionHeader } from '../components/SectionHeader';

interface MixFormData {
  title: string;
  description: string;
  genre: string;
  bpm: string;
  tags: string[];
  tracklist: string;
}

export const MixUploadScreen: React.FC = () => {
  const [form, setForm] = useState<MixFormData>({
    title: '',
    description: '',
    genre: '',
    bpm: '',
    tags: [],
    tracklist: '',
  });
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tagInput, setTagInput] = useState('');

  const pickAudio = () => {
    setAudioFile('mix_recording_2026.wav');
    Alert.alert('Selected', 'Audio file selected: mix_recording_2026.wav');
  };

  const pickCover = () => {
    setCoverImage('cover_art.jpg');
    Alert.alert('Selected', 'Cover image selected.');
  };

  const addTag = () => {
    if (tagInput.trim() && form.tags.length < 10) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleUpload = () => {
    if (!form.title.trim()) {
      Alert.alert('Required', 'Please enter a mix title.');
      return;
    }
    if (!audioFile) {
      Alert.alert('Required', 'Please select an audio file.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          Alert.alert('Uploaded', `"${form.title}" has been uploaded successfully.`);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const genres = ['House', 'Techno', 'Deep House', 'Afro House', 'Melodic Techno', 'Minimal', 'Progressive', 'Trance'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Upload Mix</Text>
        <Text style={styles.subtitle}>Share your latest set with the world</Text>

        <TouchableOpacity style={styles.audioDropzone} onPress={pickAudio}>
          {audioFile ? (
            <View style={styles.fileSelected}>
              <Ionicons name="musical-note" size={32} color={colors.primary} />
              <Text style={styles.fileName}>{audioFile}</Text>
              <Text style={styles.fileHint}>Tap to change</Text>
            </View>
          ) : (
            <View style={styles.dropzoneContent}>
              <Ionicons name="cloud-upload-outline" size={48} color={colors.textMuted} />
              <Text style={styles.dropzoneTitle}>Select Audio File</Text>
              <Text style={styles.dropzoneHint}>WAV, MP3, FLAC, AAC -- Max 500MB</Text>
            </View>
          )}
        </TouchableOpacity>

        {uploading && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{uploadProgress}% uploading...</Text>
          </View>
        )}

        <TouchableOpacity style={styles.coverPicker} onPress={pickCover}>
          {coverImage ? (
            <View style={styles.coverSelected}>
              <Ionicons name="image" size={24} color={colors.primary} />
              <Text style={styles.coverText}>Cover art selected</Text>
            </View>
          ) : (
            <View style={styles.coverContent}>
              <Ionicons name="image-outline" size={24} color={colors.textMuted} />
              <Text style={styles.coverLabel}>Add Cover Art</Text>
            </View>
          )}
        </TouchableOpacity>

        <SectionHeader title="Mix Details" />

        <Text style={styles.inputLabel}>Title *</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder="e.g. Midnight Circuit Live @ Club Space"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          placeholder="Describe the vibe, venue, or story behind this mix..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.inputLabel}>Genre</Text>
        <View style={styles.genreGrid}>
          {genres.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.genreChip, form.genre === g && styles.genreChipActive]}
              onPress={() => setForm({ ...form, genre: g })}
            >
              <Text style={[styles.genreText, form.genre === g && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>BPM</Text>
        <TextInput
          style={[styles.input, { width: 120 }]}
          value={form.bpm}
          onChangeText={(text) => setForm({ ...form, bpm: text.replace(/[^0-9]/g, '') })}
          placeholder="128"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          maxLength={3}
        />

        <Text style={styles.inputLabel}>Tags</Text>
        <View style={styles.tagInputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            value={tagInput}
            onChangeText={setTagInput}
            placeholder="Add tag..."
            placeholderTextColor={colors.textMuted}
            onSubmitEditing={addTag}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
            <Ionicons name="add" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
        {form.tags.length > 0 && (
          <View style={styles.tagRow}>
            {form.tags.map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag} onPress={() => removeTag(tag)}>
                <Text style={styles.tagText}>{tag}</Text>
                <Ionicons name="close" size={14} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.inputLabel}>Tracklist</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.tracklist}
          onChangeText={(text) => setForm({ ...form, tracklist: text })}
          placeholder={"1. Artist - Track Name\n2. Artist - Track Name\n3. Artist - Track Name"}
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <>
              <Ionicons name="cloud-upload" size={20} color={colors.text} />
              <Text style={styles.uploadText}>Upload Mix</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  screenTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2, marginBottom: spacing.lg },
  audioDropzone: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dropzoneContent: { alignItems: 'center', gap: spacing.sm },
  dropzoneTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  dropzoneHint: { fontSize: fontSize.xs, color: colors.textMuted },
  fileSelected: { alignItems: 'center', gap: spacing.sm },
  fileName: { fontSize: fontSize.md, fontWeight: '600', color: colors.primary },
  fileHint: { fontSize: fontSize.xs, color: colors.textMuted },
  progressContainer: { marginBottom: spacing.md },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4, textAlign: 'center' },
  coverPicker: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  coverContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  coverLabel: { fontSize: fontSize.sm, color: colors.textMuted },
  coverSelected: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  coverText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  textArea: { textAlignVertical: 'top', minHeight: 100 },
  genreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  genreChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  genreText: { fontSize: fontSize.sm, color: colors.textSecondary, fontWeight: '600' },
  genreTextActive: { color: colors.text },
  tagInputRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginBottom: spacing.sm },
  addTagButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: { fontSize: fontSize.xs, color: colors.textSecondary },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  uploadButtonDisabled: { opacity: 0.6 },
  uploadText: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
});
