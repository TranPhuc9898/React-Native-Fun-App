import 'react-native-gesture-handler';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import AppNavigation from './navigtion';
import {TabItem} from './navigtion/TabNavigator';

declare const global: {HermesInternal: null | {}};

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({navigation}: {navigation: StackNavigationProp}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
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

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
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

const UnauthorizedStack = createStackNavigator();

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

const UnauthorizedNavigator = () => (
  <UnauthorizedStack.Navigator>
    <UnauthorizedStack.Screen name="Login" component={LoginScreen} />
    <UnauthorizedStack.Screen name="SignUp" component={SignUpScreen} />
  </UnauthorizedStack.Navigator>
);

const App = () => {
  const isSignIn = true;

  return (
    <AppNavigation
      isAuthorized={isSignIn}
      tabs={tabs}
      unauthorizedNavigator={UnauthorizedNavigator}
      tabScreenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

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

export default App;
