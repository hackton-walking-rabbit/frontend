import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MagnifierIcon from '../../assets/images/magnifier.svg';

// expo install expo-camera
// expo install react-native-svg
// yarn add react-native-svg-transformer

export default function CameraPage() {
    const [permission, setPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

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
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={async () => {
                        const { status } = await Camera.requestCameraPermissionsAsync();   
                        setPermission(status === 'granted');
                    }}
                >
                    <MagnifierIcon width={24} height={24} fill="#338D29" />
                </TouchableOpacity>
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
                <TouchableOpacity
                    style={styles.captureButton}
                    disabled={!isReady}
                    onPress={async () => {
                        router.push('../chatPage');
                    }}
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
});