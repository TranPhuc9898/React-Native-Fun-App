import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppNavigation from './navigtion';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigation />;
};

export default App;
