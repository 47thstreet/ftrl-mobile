import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface MoreScreenProps {
  navigation: any;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const items = [
    { label: 'Analytics', icon: 'bar-chart-outline', screen: 'Analytics' },
    { label: 'EPK', icon: 'document-text-outline', screen: 'EPK' },
    { label: 'Availability', icon: 'calendar-outline', screen: 'Availability' },
    { label: 'Mix Upload', icon: 'cloud-upload-outline', screen: 'MixUpload' },
    { label: 'Collab Finder', icon: 'people-outline', screen: 'CollabFinder' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.screenTitle}>More</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.row}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={22} color={colors.primary} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: spacing.lg,
  },
  list: { paddingHorizontal: spacing.md },
  row: {
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
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { flex: 1, fontSize: fontSize.md, fontWeight: '600', color: colors.text },
});
