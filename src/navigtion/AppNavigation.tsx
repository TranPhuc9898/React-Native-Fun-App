import React from 'react';
import {NavigationContainer, Route, Theme} from '@react-navigation/native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import TabNavigator, {TabItem} from './TabNavigator';

type AppNavigationProps = {
  isAuthorized: boolean;
  theme?: Theme;
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
  theme,
  tabs,
  unauthorizedNavigator,
  tabScreenOptions,
}: AppNavigationProps) => {
  return (
    <NavigationContainer theme={theme}>
      {isAuthorized ? (
        <TabNavigator screenOptions={tabScreenOptions} tabs={tabs} />
      ) : (
        unauthorizedNavigator && unauthorizedNavigator()
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
