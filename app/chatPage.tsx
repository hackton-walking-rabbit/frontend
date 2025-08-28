import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArrowIcon from '../assets/images/arrow.svg';
import PhotoIcon from '../assets/images/photo.svg';
import SaveIcon from '../assets/images/save.svg';

// npx expo install expo-linear-gradient
// npx expo install expo-font
// expo install react-native-svg

export default function ChatPage() {
    const [fontsLoaded] = useFonts({
        Mynerve: require('../assets/fonts/Mynerve-Regular.ttf'),
    });

    // 폰트 로드 전 빈 화면
    if (!fontsLoaded) {
        return null; 
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>

            <Text style={styles.title}>walking rabbit</Text>

                <View style={styles.chatBox}>
                    {/* Top shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        style={[styles.shadowEdge, { top: 0, left: 0, right: 0, height: 15 }]}
                        start={{ x: 0, y: -1 }}
                        end={{ x: 0, y: 1 }}
                    />
                    {/* Bottom shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        style={[styles.shadowEdge, { bottom: 0, left: 0, right: 0, height: 15 }]}
                        start={{ x: 0, y: 2 }}
                        end={{ x: 0, y: 0 }}
                    />
                    {/* Left shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        start={{ x: -1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.shadowEdge, { top: 0, bottom: 0, left: 0, width: 15 }]}
                    />
                    {/* Right shadow */}
                    <LinearGradient
                        colors={['#074500', 'transparent']}
                        start={{ x: 2, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={[styles.shadowEdge, { top: 0, bottom: 0, right: 0, width: 15 }]}
                    />

                    {/* user 프로필 + 말풍선 */}
                    <View style={styles.userSpeechWrapper}>
                        {/* 말풍선 */}
                        <View style={styles.userSpeechBubble}>
                            <PhotoIcon width={30} height={30} />
                            <View style={styles.userSpeechTailBorder} />
                            <View style={styles.userSpeechTail} />
                        </View>

                        {/* user 프로필 */}
                        <View style={styles.userProfileBox} />
                    </View>

                    {/* admin 프로필 + 말풍선 */}
                    <View style={styles.adminSpeechWrapper}>
                        {/* 프로필 네모 */}
                        <View style={styles.adminProfileBox} />

                        {/* 말풍선 */}
                        <View style={styles.adminSpeechBubble}>
                            <Text style={styles.adminSpeechText}>동동동대문을 걸어라 파이팅 ❤️</Text>
                            <View style={styles.adminSpeechTailBorder} />
                            <View style={styles.adminSpeechTail} />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.bottomButton}>
                        <View style={styles.iconWrapper}>
                            <ArrowIcon width={30} height={30} fill="transparent" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton}>
                        <View style={styles.iconWrapper}>
                            <SaveIcon width={40} height={40} fill="transparent" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 스피커 */}
                <View style={styles.barsContainer}>
                    <View style={[styles.bar, { width: '65%' }]} />
                    <View style={[styles.bar, { width: '80%', marginTop: 10 }]} />
                    <View style={[styles.bar, { width: '80%', marginTop: 10 }]} />
                    <View style={[styles.bar, { width: '65%', marginTop: 10 }]} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242C23',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
    },
    title: {
        fontFamily: 'Mynerve',
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
    },





    chatBox: {
        width: '90%',
        height: '70%',
        backgroundColor: '#095600',
        borderWidth: 7,
        borderColor: '#000000',
        borderRadius: 10,
        overflow: 'hidden',
    },
    shadowEdge: {
        position: 'absolute',
    },
    chatText: {
        color: 'white',
        fontWeight: 'bold',
    },





    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // 버튼 사이 간격
        width: '90%', 
        marginTop: 20,
    },
    bottomButton: {
        backgroundColor: '#FFC0CB', 
        paddingVertical: 10,
        paddingHorizontal: '17%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        height: 25,  
        justifyContent: 'center',
        alignItems: 'center',
    },





    barsContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    bar: {
        height: 11,
        backgroundColor: '#000',
        borderRadius: 10,
    },





    userSpeechWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center', 
        marginTop: 10,
        marginRight: 10,
    },
    userSpeechBubble: {
        height: 50,
        maxWidth: "50%",
        backgroundColor: '#FFC0CB',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginRight: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.8)',
    },
    userSpeechText: {
        color: '#000',
        fontSize: 18,
    },
    userSpeechTailBorder: {
        position: 'absolute',
        right: -15, 
        top: 8,
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(0,0,0,0.8)',
        zIndex: -2,
    },
    userSpeechTail: {
        position: 'absolute',
        right: -10,
        top: 10,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFC0CB', 
        zIndex: -1,
    },
    userProfileBox: {
        width: 55,
        height: 55,
        backgroundColor: '#FFFFFF', 
        borderRadius: 5, 
        marginTop: 20,
        marginRight: 20,

        borderWidth: 3,
        borderColor: '#FFC0CB',
    },





    adminSpeechWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginLeft: 10,
    },
    adminSpeechBubble: {
        minHeight: 50,
        maxWidth: "50%",
        backgroundColor: '#77BC6F',  
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.8)',
    },
    adminSpeechText: {
        color: '#000',
        fontSize: 18,
    },
    adminSpeechTailBorder: {
        position: 'absolute',
        left: -15, 
        top: 8,
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(0,0,0,0.8)',
        zIndex: -2,
    },
    adminSpeechTail: {
        position: 'absolute',
        left: -10,
        top: 10,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#77BC6F',
        zIndex: -1,
    },
    adminProfileBox: {
        width: 55,
        height: 55,
        backgroundColor: '#FFFFFF', 
        borderRadius: 5, 
        marginTop: 20,
        marginLeft: 20,
    
        borderWidth: 3,
        borderColor: '#77BC6F',
    },
});