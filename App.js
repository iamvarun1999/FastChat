import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}

