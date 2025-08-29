import { apiFetch } from '@/api/apiClient';
import { Camera, CameraView } from 'expo-camera';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import MagnifierIcon from '../../assets/images/magnifier.svg';
// expo install expo-camera
// expo install react-native-svg
// yarn add react-native-svg-transformer

export default function CameraPage() {
    const { missionId } = useLocalSearchParams<{ missionId: string }>();
    const [permission, setPermission] = useState<{ granted: boolean } | null>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    const requestPermission = async () => {
        const { status, granted } = await Camera.requestCameraPermissionsAsync();
        if (!granted) {
            Alert.alert('권한 거부됨', '카메라 권한이 필요합니다.');
        }
        setPermission({ granted });
    };

    useEffect(() => {
        (async () => {
            try {
                // 권한 요청
                if (!permission?.granted) {
                    await requestPermission();
                }

                // 위치 가져오기
                const location = await Location.getCurrentPositionAsync({});
                setCoords({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (err) {
                console.error(err);
                alert('위치 또는 카메라 권한을 가져오는 중 오류가 발생했습니다.');
            }
        })();
    }, []);

    const uploadPhoto = async () => {
        if (!cameraRef.current) {
            Alert.alert('카메라가 준비되지 않았습니다.');
            return;
        }
        
        try {
            setIsReady(false);
            const photo = await cameraRef.current.takePictureAsync({ base64: false });
        
            const formData = new FormData();
            formData.append('file', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            } as any);
            formData.append('meta', JSON.stringify({
                missionId: missionId ? Number(missionId) : null,
                latitude: coords?.latitude ?? 0,
                longitude: coords?.longitude ?? 0,
            }));
        
            const response = await apiFetch('/api/messages/photo', {
                method: 'POST',
                body: formData,
            });
        
            const data = await response.json();
        
            Alert.alert('서버 응답', JSON.stringify(data));
        
            if (response.ok) {
                router.push('../chatPage');
            }

        } catch (err: any) {
            console.error(err);
            Alert.alert('오류', err.message || '사진 업로드 중 오류가 발생했습니다.');
        } finally {
            setIsReady(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* 카메라 프리뷰 */}
            <CameraView
                style={styles.camera}
                facing="back"   
                ref={cameraRef}
                onCameraReady={() => setIsReady(true)}
            />

            {/* 십자 표시 */}
            <View style={styles.crosshair}>
                <View style={styles.horizontalLine} />
                <View style={styles.verticalLine} />
            </View>

            {/* 돋보기 버튼 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.captureButton}
                    disabled={!isReady}
                    onPress={uploadPhoto}
                >
                    <MagnifierIcon
                        width={50}
                        height={50}
                        fill="transparent"
                        style={{ marginTop: 5 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // 카메라 미리보기 배경
    },

    camera: {
        flex: 1,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
    },

    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#338D29',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },

    retryButton: {
        padding: 16,
        backgroundColor: '#338D29',
        borderRadius: 30,
    },

    crosshair: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalLine: {
        position: 'absolute',
        width: 40,
        height: 2,
        backgroundColor: 'limegreen',
    },
    verticalLine: {
        position: 'absolute',
        height: 40,
        width: 2,
        backgroundColor: 'limegreen',
    },
});
