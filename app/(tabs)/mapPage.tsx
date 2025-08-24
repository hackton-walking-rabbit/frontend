import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapPage() {
    const KAKAO_MAP_KEY = Constants.expoConfig?.extra?.kakaoMapKey;
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

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
        <View style={{ flex: 1 }}>
            <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />
        </View>
    );
}