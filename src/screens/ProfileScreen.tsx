import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { mockProfile } from '../utils/mockData';
import { SectionHeader } from '../components/SectionHeader';

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [editing, setEditing] = useState(false);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editName, setEditName] = useState(profile.name);
  const [editLocation, setEditLocation] = useState(profile.location);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setProfile({ ...profile, photoUri: result.assets[0].uri });
    }
  };

  const saveProfile = () => {
    setProfile({ ...profile, name: editName, bio: editBio, location: editLocation });
    setEditing(false);
    Alert.alert('Saved', 'Profile updated successfully.');
  };

  const removeGenre = (genre: string) => {
    setProfile({ ...profile, genres: profile.genres.filter((g) => g !== genre) });
  };

  const addGenre = () => {
    Alert.prompt?.('Add Genre', 'Enter a genre name', (text: string) => {
      if (text?.trim()) {
        setProfile({ ...profile, genres: [...profile.genres, text.trim()] });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => (editing ? saveProfile() : setEditing(true))}
          >
            <Ionicons name={editing ? 'checkmark' : 'create-outline'} size={20} color={colors.primary} />
            <Text style={styles.editButtonText}>{editing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {profile.photoUri ? (
            <Image source={{ uri: profile.photoUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={48} color={colors.textMuted} />
            </View>
          )}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color={colors.text} />
          </View>
        </TouchableOpacity>

        {editing ? (
          <TextInput
            style={styles.nameInput}
            value={editName}
            onChangeText={setEditName}
            placeholder="DJ Name"
            placeholderTextColor={colors.textMuted}
          />
        ) : (
          <Text style={styles.djName}>{profile.name}</Text>
        )}

        {editing ? (
          <TextInput
            style={styles.locationInput}
            value={editLocation}
            onChangeText={setEditLocation}
            placeholder="Location"
            placeholderTextColor={colors.textMuted}
          />
        ) : (
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.location}>{profile.location}</Text>
            <Text style={styles.yearsBadge}>{profile.yearsActive}yr</Text>
          </View>
        )}

        <SectionHeader title="Bio" />
        {editing ? (
          <TextInput
            style={styles.bioInput}
            value={editBio}
            onChangeText={setEditBio}
            multiline
            numberOfLines={4}
            placeholder="Tell the world about your sound..."
            placeholderTextColor={colors.textMuted}
          />
        ) : (
          <Text style={styles.bio}>{profile.bio}</Text>
        )}

        <SectionHeader title="Genres" action={editing ? '+ Add' : undefined} onAction={addGenre} />
        <View style={styles.genreRow}>
          {profile.genres.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={styles.genreChip}
              onPress={() => editing && removeGenre(genre)}
            >
              <Text style={styles.genreText}>{genre}</Text>
              {editing && <Ionicons name="close" size={14} color={colors.textSecondary} style={{ marginLeft: 4 }} />}
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title="Social Links" />
        {profile.socialLinks.map((link) => (
          <View key={link.platform} style={styles.socialRow}>
            <Ionicons name={link.icon as any} size={20} color={colors.primary} />
            <View style={styles.socialInfo}>
              <Text style={styles.socialPlatform}>{link.platform}</Text>
              <Text style={styles.socialUrl} numberOfLines={1}>{link.url}</Text>
            </View>
            <Ionicons name="open-outline" size={18} color={colors.textMuted} />
          </View>
        ))}
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  avatarContainer: { alignSelf: 'center', marginBottom: spacing.md },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  djName: {
    fontSize: fontSize.hero,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 1,
  },
  nameInput: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  location: { fontSize: fontSize.sm, color: colors.textSecondary },
  locationInput: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  yearsBadge: {
    fontSize: fontSize.xs,
    color: colors.accent,
    fontWeight: '700',
    backgroundColor: 'rgba(6, 214, 160, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  bio: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  bioInput: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  genreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreText: { fontSize: fontSize.sm, color: colors.primaryLight, fontWeight: '600' },
  socialRow: {
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
  socialInfo: { flex: 1 },
  socialPlatform: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  socialUrl: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
});
