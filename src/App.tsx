import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
// UI Kitten
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import AppNavigation from './navigtion';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigation />
      </ApplicationProvider>
    </>
  );
};

export default App;
