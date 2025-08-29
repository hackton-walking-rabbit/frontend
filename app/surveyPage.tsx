import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from '../components/ui/Header';

export default function SurveyPage() {
    const [fontsLoaded] = useFonts({
        BMJUA: require('../assets/fonts/BMJUA.ttf'),
    });

    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('위치 권한이 필요합니다!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    if (!fontsLoaded) return null;

    // 현재 위치 or 기본값
    const lat = coords?.latitude ?? 37.5665;
    const lng = coords?.longitude ?? 126.9780;

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
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${Constants.expoConfig?.extra?.kakaoMapKey}"></script>
            </head>
            <body>
            <div id="map"></div>
            <script>
                var container = document.getElementById('map');
                var options = {
                center: new kakao.maps.LatLng(${lat}, ${lng}),
                level: 3
                };
                var map = new kakao.maps.Map(container, options);

                // 현재 위치 마커
                var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(${lat}, ${lng})
                });
                marker.setMap(map);
            </script>
            </body>
        </html>
    `;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />  
            <Header title="Walking Rabbit" />  

            <View style={styles.container}>
                <Text style={styles.question}>
                    자주 <Text style={styles.highlight}>걷지 않는 지역</Text>은 어디인가요?
                </Text>

                <View style={styles.mapContainer}>
                    <WebView 
                        originWhitelist={['*']}
                        source={{ html }}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30, 
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#F7FFE8', 
    },





    question: {
        fontFamily: 'BMJUA',
        fontSize: 23,
        color: '#000',  
        textAlign: 'center',
    },
    highlight: {
        color: '#338D29',
        fontWeight: 'bold',
    },





    mapContainer: {
        marginTop: 30,
        height: '50%',
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },
});