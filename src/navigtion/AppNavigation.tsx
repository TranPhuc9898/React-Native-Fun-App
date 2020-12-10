import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import TabNavigator, {TabNavigatorProps} from './TabNavigator';

export type Screen = {
  screenName: string;
  screenComponent:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>;
  screenOption?: StackNavigationOptions;
};

type AppNavigationProps = {
  isAuthorized: boolean;
  theme?: Theme;
  authorizedScreens?: Screen[];
  unauthorizedScreens?: Screen[];
  modalScreens?: Screen[];
} & TabNavigatorProps;

const RootStack = createStackNavigator();
const AppStack = createStackNavigator();
const UnauthorizedStack = createStackNavigator();

const AppNavigation = ({
  isAuthorized,
  theme,
  tabs,
  authorizedScreens,
  unauthorizedScreens,
  modalScreens,
  tabScreenOptions,
}: AppNavigationProps) => {
  const AppTabs = () => (
    <TabNavigator screenOptions={tabScreenOptions} tabs={tabs} />
  );

  const AppStackScreen = () => (
    <AppStack.Navigator>
      {tabs.length ? (
        <AppStack.Screen
          name="Home"
          component={AppTabs}
          options={{headerShown: false}}
        />
      ) : null}
      {authorizedScreens?.map((screen) => (
        <AppStack.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.screenComponent}
          options={screen.screenOption}
        />
      ))}
    </AppStack.Navigator>
  );

  const UnauthorizedStackScreen = () => (
    <UnauthorizedStack.Navigator>
      {unauthorizedScreens?.map((screen) => (
        <UnauthorizedStack.Screen
          key={screen.screenName}
          name={screen.screenName}
          component={screen.screenComponent}
          options={screen.screenOption}
        />
      ))}
    </UnauthorizedStack.Navigator>
  );

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator mode="modal">
        {isAuthorized ? (
          <RootStack.Screen
            name="Main"
            component={AppStackScreen}
            options={{headerShown: false}}
          />
        ) : null}
        {!isAuthorized ? (
          <RootStack.Screen
            name="Login"
            component={UnauthorizedStackScreen}
            options={{headerShown: false}}
          />
        ) : null}
        {modalScreens?.map((screen) => (
          <RootStack.Screen
            key={screen.screenName}
            name={screen.screenName}
            component={screen.screenComponent}
            options={screen.screenOption}
          />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
