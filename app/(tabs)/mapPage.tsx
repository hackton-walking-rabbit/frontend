import Constants from 'expo-constants';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapPage() {
    const KAKAO_MAP_KEY = Constants.expoConfig?.extra?.kakaoMapKey;

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
                center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울
                level: 3
                };
                var map = new kakao.maps.Map(mapContainer, options);
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
