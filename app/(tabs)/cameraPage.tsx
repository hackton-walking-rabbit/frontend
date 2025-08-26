import { Camera, CameraView } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

// expo install expo-camera

export default function CameraPage() {
    const [permission, setPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
            })();
    }, []);
    
    if (permission === null) {
        return <View style={{ flex: 1, backgroundColor: 'black' }} />;
    }
    
    if (permission === false) {
        return (
            <View style={styles.centered}>
                <Button title="권한 다시 요청" onPress={async () => {
                    const { status } = await Camera.requestCameraPermissionsAsync();
                    setPermission(status === 'granted');
                }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
        {/* 카메라 프리뷰 */}
            <CameraView
                style={styles.camera}
                facing="back"
                ref={cameraRef}
                onCameraReady={() => setIsReady(true)}
            />

            {/* 사진 찍기 버튼 */}
            <View style={styles.buttonContainer}>
                <Button
                title="사진 찍기"
                color="#338D29"
                disabled={!isReady}
                onPress={async () => {
                    if (cameraRef.current) {
                    const photo = await cameraRef.current.takePictureAsync();
                    console.log("사진 저장 경로:", photo.uri);
                    }
                }}
                />
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

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#338D29',
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
});
