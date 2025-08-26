import { View, type ViewProps } from 'react-native';

export type ViewBoxProps = ViewProps & {
  backgroundColor?: string; // 원하면 배경색 지정 가능
};

export function ViewBox({ style, backgroundColor = '#fff', ...otherProps }: ViewBoxProps) {
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}