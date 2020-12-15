import React from 'react';
import {GestureResponderEvent, ImageProps, StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components/ui';
import {RenderProp} from '@ui-kitten/components/devsupport';

type FloatingButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  icon?: RenderProp<Partial<ImageProps>>;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({onPress, icon}) => {
  return (
    <Button style={styles.button} accessoryLeft={icon} onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default FloatingButton;
