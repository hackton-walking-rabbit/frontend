import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function CameraPage() {
    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title}>카메라 페이지</ThemedText>
        </ThemedView>

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
