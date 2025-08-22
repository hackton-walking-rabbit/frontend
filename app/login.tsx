import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.subTitle}>Walking Rabbit</Text>
                <Text style={styles.title}>워킹토끼</Text>
            </View>
            <View style={styles.loginContainer}>
                <Image source={require('../assets/images/login_rabbit.png')} style={styles.rabbit} resizeMode='contain' />

                {/*일단 누르면 메인페이지로 이동하도록 해둠*/}
                <Pressable style={styles.loginBox} onPress={() => router.replace('/(tabs)/mapPage')}>
                    <Image source={require('../assets/images/kakaoIcon.webp')} style={styles.kakaoIcon} resizeMode='contain'/>
                    <Text style={styles.loginText}>카카오 계정으로 계속하기</Text> 
                </Pressable>
            </View>
        </View>

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
    },
    subTitle: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Mynerve',
        textAlign: 'center',
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
