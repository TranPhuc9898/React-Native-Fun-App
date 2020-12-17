import 'react-native-gesture-handler';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AppNavigation, {Screen} from './AppNavigation';
import {TabItem} from './TabNavigator';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import FormProductModal from '../modals/FormProductModal/FormProductModal';
import DetailsProductScreen from '../screens/DetailsProductScreen/DetailsProductScreen';

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({navigation}: {navigation: StackNavigationProp}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export type HomeStackParamList = {
  Home: undefined;
  DetailsProduct: {productId: string};
};

const HomeStack = createStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="DetailsProduct"
        component={DetailsProductScreen}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

function LoginScreen({navigation}: {navigation: StackNavigationProp}) {
  return (
    <View>
      <Text>{'Login Screen'}</Text>
      <Button title={'Sign Up'} onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

function SignUpScreen() {
  return (
    <View>
      <Text>{'Sign Up Screen'}</Text>
    </View>
  );
}

function ModalScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const tabs: TabItem[] = [
  {
    tabName: 'Home',
    tabStack: HomeStackScreen,
  },
  {
    tabName: 'Settings',
    tabStack: SettingsStackScreen,
  },
];

const unauthorizedScreens: Screen[] = [
  {
    screenName: 'Login',
    screenComponent: LoginScreen,
  },
  {
    screenName: 'SignUp',
    screenComponent: SignUpScreen,
  },
];

const modalScreens: Screen[] = [
  {
    screenName: 'MyModal',
    screenComponent: ModalScreen,
  },
  {
    screenName: 'FormProductModal',
    screenComponent: FormProductModal,
  },
];

export default () => {
  const isSignIn = true;

  return (
    <AppNavigation
      isAuthorized={isSignIn}
      tabs={tabs}
      unauthorizedScreens={unauthorizedScreens}
      modalScreens={modalScreens}
      tabScreenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cogs' : 'cogs';
          }

          // You can return any component that you like here!
          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
};
