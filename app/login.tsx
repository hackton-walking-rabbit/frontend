import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>로그인 페이지</Text>
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
