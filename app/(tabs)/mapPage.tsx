import { StyleSheet, Text, View } from 'react-native';

export default function MapPage() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>지도 페이지</Text>
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
