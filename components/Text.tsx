import { StyleSheet, View, type ViewProps } from 'react-native';

export type ViewTextProps = ViewProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ViewText({
  style,
  type = 'default',
  ...rest
}: ViewTextProps) {
  return (
    <View
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 8,
  },
  defaultSemiBold: {
    padding: 8,
  },
  title: {
    padding: 16,
  },
  subtitle: {
    padding: 12,
  },
  link: {
    padding: 8,
  },
});