import { ViewBox } from '@/components/View';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from 'react';
import { Button, StyleSheet, Text } from 'react-native';

export default function Encyclopedia() {
    const bottomSheetRef = useRef<BottomSheet>(null);
 
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
 
  // renders
  return (
    <ViewBox style={styles.container}>
      <Button title="expand" onPress={() => bottomSheetRef.current?.expand()} />
      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button
            title="close"
            onPress={() => bottomSheetRef.current?.close()}
          />
        </BottomSheetView>
      </BottomSheet>
    </ViewBox>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F7FFE8'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
    },
});
