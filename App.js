import React, { useMemo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';

export const MyContext = React.createContext();

const AppNavigator = createSharedElementStackNavigator(
  {
    SignIn: SignInScreen,
    Home: HomeScreen,
    Card: CardScreen
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        });
        return { cardStyle: { opacity } };
      },
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: "transparent",
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  
  const myContext = useMemo(() => ({
  }), []);

  return (
    <MyContext.Provider value={myContext}>
      <AppContainer />
    </MyContext.Provider>
  );
}
