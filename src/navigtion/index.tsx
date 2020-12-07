import React from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import TabNavigator, {TabItem} from './TabNavigator';

type AppNavigationProps = {
  isAuthorized: boolean;
  tabs: TabItem[];
  unauthorizedNavigator?: () => JSX.Element;
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
  unauthorizedNavigator,
  tabScreenOptions,
}: AppNavigationProps) => {
  return (
    <NavigationContainer>
      {isAuthorized ? (
        <TabNavigator screenOptions={tabScreenOptions} tabs={tabs} />
      ) : (
        unauthorizedNavigator && unauthorizedNavigator()
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
