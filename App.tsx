import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import AppLoading from 'expo-app-loading';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ExploreView from './ExploreView';
import ImageView from './ImageView';

// const SharedElementStack = createSharedElementStackNavigator({}, {}, {});
const Stack = createStackNavigator();

const App = () => {
    const scheme = useColorScheme();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const backgroundColor = useMemo(() => (scheme === 'dark' ? 'black' : 'white'), [scheme]);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <AppearanceProvider>
            <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator
                    screenOptions={{
                        gestureEnabled: true,
                        cardOverlayEnabled: true,
                        cardStyle: { backgroundColor: 'transparent' },
                        headerStyle: { backgroundColor, shadowRadius: 0, shadowOffset: { height: 0 } },
                    }}
                    mode="modal"
                    initialRouteName="ExploreView"
                >
                    <Stack.Screen name="ExploreView" component={ExploreView} />
                    <Stack.Screen name="ImageView" component={ImageView} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
};

export default App;
