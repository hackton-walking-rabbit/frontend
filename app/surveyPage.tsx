import { apiFetch } from '@/api/apiClient';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from '../components/ui/Header';

export default function SurveyPage() {
    const [fontsLoaded] = useFonts({
        BMJUA: require('../assets/fonts/BMJUA.ttf'),
    });

    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [otherText, setOtherText] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const router = useRouter();

    const toggleCheck = (index: number) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };
    const checkboxLabels = [
        '식물이 적음',
        '인도, 산책로 등 보행 공간이 부족함',
        '횡단보도, 신호등 등 보행 안전시설이 부족함',
        '방문할 동기가 부족함',
        '나무나 그늘 부족으로 햇볕이 강함',
        '기타',
    ];

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

    useEffect(() => {
        const showSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const hideSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );
        return () => {
            showSub.remove();
            hideSub.remove();
        };
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

    const handleSubmit = async () => {
        if (!coords) {
            Alert.alert("위치 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const selectedLabel = selectedIndex !== null ? checkboxLabels[selectedIndex] : null;
        const content = selectedLabel === '기타' ? otherText : selectedLabel;

        if (!content) {
            Alert.alert("설문 내용을 선택하거나 입력해주세요.");
            return;
        }

        try {
            const res = await apiFetch('/api/surveys', {
                method: 'POST',
                body: JSON.stringify({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    content,
                }),
            });
            console.log('fetching URL:', `${process.env.API_BASE_URL}/api/surveys`);

            const data = await res.json();
            if (res.ok) {
                console.log("설문 제출 성공", data);
                Alert.alert("참여해주셔서 감사합니다!");
                router.push('/(tabs)/mapPage');
            } else {
                console.error("설문 제출 실패", data);
                Alert.alert("제출 실패: " + (data.message || "알 수 없는 오류"));
            }
        } catch (err) {
            console.error("API 요청 중 오류 발생", err);
            Alert.alert("네트워크 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />  
            <Header title="Walking Rabbit" />  
            
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text style={styles.question}>
                    자주 <Text style={styles.highlight}>걷지 않는 지역</Text>은 어디인가요?
                </Text>

                {/* 키보드 올라오면 map 숨기기 */}
                {!keyboardVisible ? (
                    <View style={styles.mapContainer}>
                        <WebView 
                            originWhitelist={['*']}
                            source={{ html }}
                            style={{ flex: 1 }}
                        />
                    </View>
                ) : (
                    <View style={{ height: '5%' }} />
                )}

                <View style={styles.checkboxContainer}>
                    {checkboxLabels.map((label, i) => (
                        <Pressable key={i} style={styles.checkboxRow} onPress={() => toggleCheck(i)}>
                            <View style={[styles.checkbox, selectedIndex === i && styles.checkboxSelected]} />
                            <Text style={styles.checkboxLabel}>{label}</Text>
                        </Pressable>
                    ))}

                    {/* 기타 */}
                    {selectedIndex === checkboxLabels.length - 1 && (
                        <TextInput
                            style={styles.textInput}
                            placeholder="직접 입력해주세요"
                            value={otherText}
                            onChangeText={setOtherText}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
                {/* 제출 버튼 */}
                <Pressable
                    style={[styles.submitButton, { bottom: keyboardVisible ? '40%' : 50 }]}
                    // onPress={() => router.push('/(tabs)/mapPage')}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>제출</Text>
                </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
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
        height: '40%',
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },





    checkboxContainer: {
        marginTop: 20,
        width: '80%',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 1.5,
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#338D29',
    },
    checkboxLabel: {
        fontFamily: 'NotoSansKR',
        fontSize: 16,
        fontWeight: 500,
        color: '#000',
    },
    textInput: {
        marginTop: 3,
        marginLeft: 30,
        borderWidth: 1,
        borderColor: '#338D29',
        borderRadius: 5,
        padding: 5,
        width: '90%',
        fontSize: 16,
    },





    submitButton: {
        position: 'absolute',
        width: '80%',
        marginTop: 20,
        backgroundColor: '#338D29',
        paddingVertical: 12,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});