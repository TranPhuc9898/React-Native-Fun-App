import React, {ComponentClass, FunctionComponent} from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';

export type TabItem = {
  tabName: string;
  tabStack: ComponentClass<any, any> | FunctionComponent<any>;
};

type TabNavigatorProps = {
  tabs: TabItem[];
  screenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: Route<string, object | undefined>;
        navigation: any;
      }) => BottomTabNavigationOptions)
    | undefined;
};

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<TabNavigatorProps> = ({tabs, screenOptions}) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((item) => {
        return (
          <Tab.Screen
            key={item.tabName}
            name={item.tabName}
            component={item.tabStack}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;
