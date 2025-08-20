import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: 'Book',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,

        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cameraPage"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => 
            <View style={{width: 80, height: 80, borderRadius: 60, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: -20}}>
              <IconSymbol size={28} name="house.fill" color={color} />
            </View>
        }}
      />
      <Tabs.Screen
        name="mapPage"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: 'MyPage',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
