import { ViewBox } from '@/components/View';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import CarrotIcon from '../../assets/images/carrot.svg';


export default function MapPage() {
    const KAKAO_MAP_KEY = Constants.expoConfig?.extra?.kakaoMapKey;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [showBubble, setShowBubble] = useState(false);

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
        <ViewBox style={styles.container}>
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
                <CarrotIcon
                    width={40}
                    height={40}
                    style={{ transform: [{ rotate: '30deg' }] }}
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
                    <ViewBox style={styles.bubble}>
                        <Text style={[styles.bubbleText, { fontFamily: 'DungGeunMo' }]}>오늘의 미션!</Text>
                        {/* 이미지 + 미션 */}
                        <ViewBox style={styles.bubbleContent}>
                            <Image 
                                source={require('../../assets/images/rabbit-admin-2.png')}
                                style={styles.bubbleImage}
                                resizeMode="contain"
                            />
                            <Text style={[styles.bubbleText, { fontFamily: 'DungGeunMo', fontSize: 16 },]}>
                                분홍색 꽃을 찾아보자 🌸
                            </Text>
                        </ViewBox>
                    </ViewBox>
                </>
            )}
        </ViewBox>
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
        top: 55, 
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
        height: 140,
        width: '70%',
        top: 40,
        left: 90,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#338D29', 
        backgroundColor: '#F7FFE8',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubbleText: {
        color: '#338D29',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bubbleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 5,
        backgroundColor: '#F7FFE8',
    },
    bubbleImage: {
        width: 60,  
        height: 90,
    },
    bubbleTailContainer: {
        position: 'absolute',
        top: 60, 
        left: 75,
        zIndex: 1,
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
        left: 0,
    },
    bubbleTailInner: {
        borderLeftWidth: 13, 
        borderRightWidth: 13,
        borderBottomWidth: 23,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#F7FFE8', 
        position: 'absolute',
        top: 0,
        left: 5,
    },
});