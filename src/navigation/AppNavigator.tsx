import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize } from '../theme';
import {
  ProfileScreen,
  TracksScreen,
  BookingsScreen,
  EventsScreen,
  AnalyticsScreen,
  EPKScreen,
  AvailabilityScreen,
  MoreScreen,
} from '../screens';
import { MixUploadScreen } from '../screens/MixUploadScreen';
import { CollabFinderScreen } from '../screens/CollabFinderScreen';

const Tab = createBottomTabNavigator();
const MoreStack = createStackNavigator();

const MoreStackNavigator: React.FC = () => (
  <MoreStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.background },
    }}
  >
    <MoreStack.Screen name="MoreMenu" component={MoreScreen} />
    <MoreStack.Screen name="Analytics" component={AnalyticsScreen} />
    <MoreStack.Screen name="EPK" component={EPKScreen} />
    <MoreStack.Screen name="Availability" component={AvailabilityScreen} />
    <MoreStack.Screen name="MixUpload" component={MixUploadScreen} />
    <MoreStack.Screen name="CollabFinder" component={CollabFinderScreen} />
  </MoreStack.Navigator>
);

const tabIcons: Record<string, { focused: string; default: string }> = {
  Profile: { focused: 'person', default: 'person-outline' },
  Tracks: { focused: 'musical-notes', default: 'musical-notes-outline' },
  Bookings: { focused: 'calendar', default: 'calendar-outline' },
  Events: { focused: 'megaphone', default: 'megaphone-outline' },
  More: { focused: 'grid', default: 'grid-outline' },
};

export const AppNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        height: 85,
        paddingTop: 8,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: {
        fontSize: fontSize.xs,
        fontWeight: '600',
      },
      tabBarIcon: ({ focused, color, size }) => {
        const icons = tabIcons[route.name];
        const iconName = focused ? icons.focused : icons.default;
        return <Ionicons name={iconName as any} size={22} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Tracks" component={TracksScreen} />
    <Tab.Screen name="Bookings" component={BookingsScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="More" component={MoreStackNavigator} />
  </Tab.Navigator>
);
