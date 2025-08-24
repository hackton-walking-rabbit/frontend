import { Header } from '@/components/ui/Header';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapPage() {
    const KAKAO_MAP_KEY = Constants.expoConfig?.extra?.kakaoMapKey;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [showBubble, setShowBubble] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            // 위치 권한 요청
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('위치 권한이 필요합니다!');
                return;
            }
        
            // 현재 위치 가져오기
            let location = await Location.getCurrentPositionAsync({});
            setCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);
    
    // 위치 못 받으면 동대문구 중심
    const lat = coords?.latitude ?? 37.5744;
    const lng = coords?.longitude ?? 127.0395;

    // 폰트 로드
    useEffect(() => {
        Font.loadAsync({
            'DungGeunMo': require('../../assets/fonts/DungGeunMo.ttf'),
        }).then(() => setFontsLoaded(true));
    }, []);

    // 폰트 로드되지 않았으면 빈 화면
    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: 'white' }} />;
    }

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style>
                html, body, #map {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                }
            </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}"></script>
            </head>
            <body>
            <div id="map"></div>
            <script>
                var mapContainer = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(${lat}, ${lng}),
                    level: 3
                };
                var map = new kakao.maps.Map(mapContainer, options);

                // 현재 위치 마커 표시
                var markerPosition  = new kakao.maps.LatLng(${lat}, ${lng});
                var marker = new kakao.maps.Marker({ position: markerPosition });
                marker.setMap(map);
            </script>
            </body>
        </html>
    `;

    return (
        <View style={styles.container}>
            {/* 상단 헤더 */}
            <Header title="Walking Rabbit" />

            {/* 지도 */}
            <WebView 
                originWhitelist={['*']}
                source={{ html }}
                style={styles.webview}
            />

            {/* 미션 버튼 */}
            <TouchableOpacity
                style={styles.missionButton}
                onPress={() => setShowBubble(!showBubble)}
            >
                <Image 
                    source={require('../../assets/images/carrot.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {showBubble && (
                <>
                    {/* 말풍선 꼬리 */}
                    <View style={styles.bubbleTailContainer}>
                        <View style={styles.bubbleTailBorder} />
                        <View style={styles.bubbleTailInner} />
                    </View>

                    {/* 말풍선 */}
                    <View style={styles.bubble}>
                        <Text style={[styles.bubbleText, { fontFamily: 'DungGeunMo' }]}>오늘의 미션!</Text>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    missionButton: {
        position: 'absolute',
        top: 165, 
        left: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#338D29',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble: {
        position: 'absolute',
        height: 130,
        width: '60%',
        top: 145,
        left: 90,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#338D29', 
        backgroundColor: 'white',
        zIndex: 1,
        alignItems: 'center',
    },
    bubbleText: {
        color: '#338D29',
        fontWeight: 'bold',
        fontSize: 25,
    },
    bubbleTailContainer: {
        position: 'absolute',
        top: 165, 
        left: 75,
    },
    bubbleTailBorder: {
        borderLeftWidth: 17, 
        borderRightWidth: 17,
        borderBottomWidth: 27,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#338D29', 
        position: 'absolute',
        top: -2,
        left: 4,
    },
    bubbleTailInner: {
        borderLeftWidth: 10, 
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white', 
        position: 'absolute',
        top: 2,
        left: 10,
        zIndex: 1000,
    },
});