import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { ViewBox } from '@/components/View';
import { Header } from '@/components/ui/Header';
import { HapticTab } from '@/components/ui/NavigationTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Book_selected from '../../assets/images/book-selected.svg';
import Book from '../../assets/images/book.svg';
import Camera from '../../assets/images/camera.svg';
import Map_selected from '../../assets/images/map-selected.svg';
import Map from '../../assets/images/map-white.svg';
import Trophy_selected from '../../assets/images/trophy-selected.svg';
import Trophy from '../../assets/images/trophy.svg';

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
          tabBarIcon: ({ focused, color }) => (
            focused ? <Book_selected/>
                    : <Book/>
          ),
        }}
      />
      <Tabs.Screen
        name="rankingPage"
        options={{
          title: '랭킹',
          tabBarIcon: ({ focused, color }) => (
            focused ? <Trophy_selected width={40} height={40}/>
                    : <Trophy width={40} height={40}/>
          ),
        }}
      />
      <Tabs.Screen
        name="cameraPage"
        options={{
          title: '카메라',
          tabBarStyle: { display: 'none' }, // 카메라 페이지에서 숨기기
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
              <Camera/>
            </ViewBox>
          ),
        }}
      />
      <Tabs.Screen
        name="mapPage"
        options={{
          title: '지도',
          tabBarIcon: ({ focused, color }) => (
            focused ? <Map_selected/>
                    : <Map/>
            
          ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ focused, color }) => (
            <ViewBox
              style={{
                width: 50,
                height: 50,
                borderRadius: 35,
                borderWidth: 3,
                borderColor: focused ? '#FFE066' : 'white',
                overflow: 'hidden', // 이미지 자르기
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/rabbit-user-profile.png')}
                style={{
                  width: 80,
                  height: 100,
                  top: 15,
                  left: 2,
                }}
              />
            </ViewBox>
          ),
        }}
      />
    </Tabs>
  );
}