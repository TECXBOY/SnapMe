/**
 * SnapMe Mobile App
 * Main application entry point
 */

import React from 'react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {store} from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import {paperTheme} from './src/theme/paperTheme';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <RootNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
