import React, {ComponentClass, FunctionComponent} from 'react';
import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';

export type TabItem = {
  tabName: string;
  tabStack: ComponentClass<any, any> | FunctionComponent<any>;
};

export type TabNavigatorProps = {
  tabs: TabItem[];
  screenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: Route<string, object | undefined>;
        navigation: any;
      }) => BottomTabNavigationOptions)
    | undefined;
  tabBarOptions?: BottomTabBarOptions;
  tabScreenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: Route<string, object | undefined>;
        navigation: any;
      }) => BottomTabNavigationOptions)
    | undefined;
};

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<TabNavigatorProps> = ({
  tabs,
  screenOptions,
  tabBarOptions,
  tabScreenOptions,
}) => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      {tabs.map((item) => {
        return (
          <Tab.Screen
            key={item.tabName}
            name={item.tabName}
            options={tabScreenOptions}
            component={item.tabStack}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;
