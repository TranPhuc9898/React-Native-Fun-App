import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import TrashIcon from 'react-native-eva-icons/icons/Trash_2';

import commonStyles from '../../theme/commonStyles';
import {Spinner} from '@ui-kitten/components';

type PreviewImageProps = FastImageProps & {
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  loading?: boolean;
  hideRemoveIcon?: boolean;
  onRemoveIconPress?: (event: GestureResponderEvent) => void;
};

const PreviewImage: React.FC<PreviewImageProps> = ({
  source,
  containerStyle,
  imageStyle,
  loading,
  hideRemoveIcon,
  onRemoveIconPress,
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  return (
    <View
      style={StyleSheet.flatten([
        commonStyles.p2,
        commonStyles.justifyContentCenter,
        commonStyles.alignItemsCenter,
        containerStyle,
      ])}>
      <FastImage
        style={StyleSheet.flatten([styles.defaultImageStyle, imageStyle])}
        source={source}
        onLoadStart={() => setLoadingImage(true)}
        onLoadEnd={() => setLoadingImage(false)}
      />
      {!hideRemoveIcon ? (
        <TrashIcon
          style={styles.removeIcon}
          width={24}
          height={24}
          fill={'#ED5D68'}
          onPress={onRemoveIconPress}
        />
      ) : null}

      {(loadingImage || loading) && (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  defaultImageStyle: {
    width: 90,
    height: 90,
  },
  spinnerContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreviewImage;
