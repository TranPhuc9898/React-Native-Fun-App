import React from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import TabNavigator, {TabItem} from './TabNavigator';

const Stack = createStackNavigator();

type AppNavigationProps = {
  isAuthorized: boolean;
  tabs: TabItem[];
  unauthorizedScreens?: JSX.Element;
  tabScreenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: Route<string, object | undefined>;
        navigation: any;
      }) => BottomTabNavigationOptions)
    | undefined;
};

const AppNavigation = ({
  isAuthorized,
  tabs,
  unauthorizedScreens,
  tabScreenOptions,
}: AppNavigationProps) => {
  return (
    <NavigationContainer>
      {isAuthorized ? (
        <TabNavigator screenOptions={tabScreenOptions} tabs={tabs} />
      ) : (
        <Stack.Navigator>{unauthorizedScreens}</Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
