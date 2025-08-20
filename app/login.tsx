import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>로그인 페이지</Text>
            <Button onPress={() => router.replace('/(tabs)/mapPage')}>메인 화면으로 이동하기</Button>
        </View>

    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
