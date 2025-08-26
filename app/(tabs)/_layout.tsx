import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { ViewBox } from '@/components/View';
import { Header } from '@/components/ui/Header';
import { HapticTab } from '@/components/ui/NavigationTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        header: () => <Header title="Walking Rabbit" />,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          default: {
            height: 100,
            paddingTop: 20,
            opacity: 1,
          },
        }),
        tabBarBackground: () => <ViewBox style={{ flex: 1, backgroundColor: '#338D29' }} />,
        tabBarShowLabel: false, // title 숨기기
      }}
    >
      <Tabs.Screen
        name="bookPage"
        options={{
          title: '도감',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('../../assets/images/book.png')}
            style={{ width: 40, height: 35 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rankingPage"
        options={{
          title: '랭킹',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/trophy.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cameraPage"
        options={{
          title: '카메라',
          tabBarIcon: ({ color }) => (
            <ViewBox
              style={{
                width: 80,
                height: 80,
                borderRadius: 60,
                backgroundColor: '#338D29',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -70
              }}
            >
              <Image 
                source={require('../../assets/images/camera.png')}
                style={{ width: 48, height: 35 }}
              />
            </ViewBox>
          ),
        }}
      />
      <Tabs.Screen
        name="mapPage"
        options={{
          title: '지도',
          tabBarIcon: ({ color }) => (
            <Image  
              source={require('../../assets/images/map-selected.png')}
              style={{ width: 48, height: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => (
            <ViewBox
              style={{
                width: 55,
                height: 55,
                borderRadius: 35,
                borderWidth: 3,
                borderColor: 'white',
                overflow: 'hidden', // 이미지 자르기
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <Image
                source={require('../../assets/images/rabbit-user-profile.png')}
                style={{
                  width: 80,
                  height: 70,
                  resizeMode: 'cover',
                  top: 10,
                }}
              />
            </ViewBox>
          ),
        }}
      />
    </Tabs>
  );
}