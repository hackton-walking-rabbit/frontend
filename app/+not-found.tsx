import { ViewText } from '@/components/Text';
import { ViewBox } from '@/components/View';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ViewBox style={styles.container}>
        <ViewText type="title">This screen does not exist.</ViewText>
        <Link href="/" style={styles.link}>
          <ViewText type="link">Go to home screen!</ViewText>
        </Link>
      </ViewBox>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
