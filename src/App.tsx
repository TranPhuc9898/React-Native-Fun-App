import 'react-native-gesture-handler';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const scaleFactor = screenWidth / 414;

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <View style={styles.screen}>
          <Image
            style={styles.backgroundImage}
            source={require('./assets/images/homeBackground.png')}
          />
          <View style={styles.homeContainer}>
            <View style={styles.homeMenuContainer}>
              {/* Menu 1 */}
              <View style={[styles.menuItemContainer, styles.menu1Container]}>
                <TouchableOpacity>
                  <Text style={[styles.menuTitle, styles.menuTitle1]}>
                    {`CẤU TRÚC ĐỀ \n TỰ TẠO`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu1Touch}>
                  <Image
                    style={styles.menu1Image}
                    source={require('./assets/images/Artwork1.png')}
                  />
                </TouchableOpacity>
              </View>
              {/* Menu 2  */}
              <View style={[styles.menuItemContainer, styles.menu2Container]}>
                <TouchableOpacity>
                  <Text style={[styles.menuTitle, styles.menuTitle2]}>
                    {'SOẠN ĐỀ LUYỆN THI'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu2ImageTouch}>
                  <Image
                    style={styles.menu2Image}
                    source={require('./assets/images/Artwork2.png')}
                  />
                </TouchableOpacity>
              </View>
              {/* Menu 3  */}
              <View style={[styles.menuItemContainer, styles.menu1Container]}>
                <TouchableOpacity>
                  <Text style={[styles.menuTitle, styles.menuTitle1]}>
                    {`TÌM BÀI TẬP`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu1Touch}>
                  <Image
                    style={styles.menu1Image}
                    source={require('./assets/images/Artwork5.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImageContainer: {
    paddingHorizontal: 16,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    aspectRatio: 17 / 25,
    width: screenWidth,
    height: undefined,
    resizeMode: 'contain',
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  homeMenuContainer: {
    flexDirection: 'column',
    aspectRatio: 57 / 80,
    width: screenWidth,
    height: undefined,
    // backgroundColor: 'pink',
    // opacity: 0.6,
  },
  menuItemContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 25 * scaleFactor,
    color: 'white',
    fontWeight: 'bold',
  },
  // MENU 1 Style
  menu1Container: {},
  menuTitle1: {
    marginTop: 32 * scaleFactor,
    marginLeft: 38 * scaleFactor,
  },
  menu1Touch: {
    position: 'absolute',
    right: -10 * scaleFactor,
    top: -10 * scaleFactor,
  },
  menu1Image: {
    aspectRatio: 0.74,
    width: 179 * scaleFactor,
    height: undefined,
  },
  // MENU 2 Style
  menu2Container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuTitle2: {
    color: 'black',
    marginTop: 84 * scaleFactor,
    marginRight: 17 * scaleFactor,
  },
  menu2ImageTouch: {
    position: 'absolute',
    left: -30 * scaleFactor,
    top: -65 * scaleFactor,
  },
  menu2Image: {
    aspectRatio: 1.077,
    width: 250 * scaleFactor,
    height: undefined,
  },
  // MENU 3 Style
});

export default App;
