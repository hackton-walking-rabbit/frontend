import { ViewBox } from '@/components/View';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';

// expo install expo-secure-store

export default function Login() {
    const router = useRouter();

    // 앱 열릴 때 redirect URL 체크
    useEffect(() => {
    const subscription = Linking.addListener('url', (event) => {
        const url = event.url;
        // const token = url.split('accessToken=')[1];
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDE5OTUyMjAzIiwiaWF0IjoxNzU2NDY2NTYwLCJleHAiOjE3NTY1NTI5NjB9.JO-F4boeZaABGUTuExqZp-mT2tXB8XiTsadlgkpT1_s';
        if (token) {
        saveAccessToken(token);
        router.replace('/surveyPage');
        }
    });

    // 앱 처음 실행 시 URL 체크
    Linking.getInitialURL().then(url => {
        if (url) {
        const token = url.split('accessToken=')[1];
        if (token) {
            saveAccessToken(token);
            router.replace('/surveyPage');
        }
        }
    });

    return () => {
        subscription.remove(); 
    };
    }, []);

    const kakaoLogin = async () => {
        try {
            const response = await fetch("https://5f4a6f0192e9.ngrok-free.app/api/auth/request", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                const kakaoURL = data.data;
                Linking.openURL(kakaoURL);
            }
            else {
                console.error("URL 요청 실패",data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const saveAccessToken = async (token: string) => {
        await SecureStore.setItemAsync('accessToken', token);
    }

    return (
        <ViewBox style={styles.container}>
            <ViewBox style={styles.titleContainer}>
                <Text style={styles.subTitle}>Walking Rabbit</Text>
                <Text style={styles.title}>워킹토끼</Text>
            </ViewBox>
            <ViewBox style={styles.loginContainer}>
                <Image source={require('../assets/images/rabbit-login.png')} style={styles.rabbit} resizeMode='contain' />


                {/*일단 누르면 메인페이지로 이동하도록 해둠*/}
                {/* <Pressable style={styles.loginBox} onPress={kakaoLogin}> */}
                <Pressable style={styles.loginBox} onPress={() => router.replace('/surveyPage')}>
                        <Image source={require('../assets/images/kakaoIcon.webp')} style={styles.kakaoIcon} resizeMode='contain'/>
                        <Text style={styles.loginText}>카카오 계정으로 계속하기</Text> 
                </Pressable>
            </ViewBox>
        </ViewBox>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    

    titleContainer: {
        justifyContent: 'center',
        gap: 2,
        position: 'absolute',
        top: '27%',
    },

    title: {
        color: '#338D29',
        fontSize: 60,
        fontFamily: 'BMJUA',
        lineHeight: 60,
    },
    subTitle: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Mynerve',
        textAlign: 'center',
        lineHeight: 30,
    },



    loginContainer: {
        alignItems: 'center', 
        position: 'absolute',
        top: '40%'
    },

    rabbit: {
        width: 180,
        height: 180,
    },

    loginBox: {
        backgroundColor: '#EAFFC0',
        width: 327,
        height: 40,
        borderRadius: 10,
        marginTop: -24,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    kakaoIcon: {
        width: 21,
        height: 21,
    },
    loginText: {
        fontSize: 14,
    },
    
});