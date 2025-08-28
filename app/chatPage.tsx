import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArrowIcon from '../assets/images/arrow.svg';
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
                    <Text style={styles.chatText}>/* 채팅창 */</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
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
});