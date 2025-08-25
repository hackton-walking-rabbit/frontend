import { ViewBox } from '@/components/View';
import { useRouter } from 'expo-router';
import { Image, Linking, Pressable, StyleSheet, Text } from 'react-native';

export default function Login() {
    const router = useRouter();

    const kakaoLogin = async () => {
        try {
            const response = await fetch("http://backend.com/api/auth/request", {method: "GET"});
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
                <Pressable style={styles.loginBox} onPress={() => router.replace('/(tabs)/mapPage')}>
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
