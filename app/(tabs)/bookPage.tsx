import { ViewBox } from '@/components/View';
import { StyleSheet, Text } from 'react-native';

export default function Encyclopedia() {
    return (
        <ViewBox style={styles.titleContainer}>
            <Text style={styles.title}>도감 페이지</Text>
        </ViewBox>

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
