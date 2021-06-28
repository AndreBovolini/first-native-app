import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Login from '../screens/Login'
import AuthorApp from '../screens/AuthorApp'
import AfterLogin from '../screens/AfterLogin'
import Home from '../screens/home';
import Carteira from '../screens/carteira';
import Performance from '../screens/performance'
import Profile from '../screens/Profile'
import ResetPassword from  '../screens/ResetPassword';
import globalStyles from '../styles/globalStyles';
import { NavigationActions, StackRouter } from 'react-navigation';

import { connect, Provider } from 'react-redux';
import store from '../store/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getDeviceId } from 'react-native-device-info';
import { ThemeProvider } from 'styled-components';
import darkTheme from '../styles/themes/darkTheme';
import lightTheme from '../styles/themes/lightTheme';
import { navigationRef } from './RootNavigation';
import RNExitApp from 'react-native-exit-app';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const TabNavigation = () => {
    const [landscapeShow, setLandscapeShow] = useState(true)
    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height}}) => {
          if (width < height) {
            setLandscapeShow(true)
          } else {
            setLandscapeShow(false)
          }
        })
    }, [])
    let deviceId = getDeviceId().split("").filter(n => (Number(n) || n == 0 || n == ',')).join("")
    deviceId = parseFloat((deviceId).replace(",", "."),2);
    console.log(deviceId)
    return (
        
        <Provider store={store}>
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    switch (route.name) {
                        case 'Home':
                            iconName = focused 
                                ? 'home' 
                                : 'home';
                            break;
                        case 'Carteira':
                            iconName = focused 
                                ? 'wallet' 
                                : 'wallet';
                            break;
                        case 'Performance':
                            iconName = focused 
                                ? 'trending-up' 
                                : 'trending-up';
                            break;
                        case 'Perfil':
                            iconName = focused
                                ? 'person'
                                : 'person';
                            break;
                    
                    }
        
        
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                
    

                
                tabBarOptions={{
                    activeTintColor: globalStyles.colors.fontColor,
                    safeAreaInset: { bottom: 0, top: 0 },
                    inactiveTintColor: '#000',
                    labelStyle: { fontSize: 15},
                    showLabel: true,
                    keyboardHidesTabBar: true,
                    style: {
                        backgroundColor: '#272727',
                        borderTopEndRadius: 19,
                        borderTopStartRadius: 19,
                        height: Platform.OS === 'ios' ? 
                            (deviceId < 10.6 ?
                                55 : 85) 
                            : 55,
                        borderTopWidth: 0,
                        position: 'absolute',
                    }
                }} initialRouteName="Home"
            >
                
                <Tab.Screen name="Performance" component={Performance} options={{ tabBarVisible: landscapeShow}}/>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Carteira" component={Carteira} />
                <Tab.Screen name="Perfil" component={Profile} />
            </Tab.Navigator>
            </Provider>

)
}

const AuthNavigator = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}> 
                <Stack.Screen name="AuthOrApp" component={AuthorApp} />
                <Stack.Screen name="Login" component={Login} 
                listeners={{
                    beforeRemove: e => {

                    },
                  }}
                />
                <Stack.Screen name="AfterLogin" component={AfterLogin} /> 
                <Stack.Screen name="Home" component={TabNavigation}  options={{
                    gestureEnabled: false
                }}
                    // listeners={({ navigation, route }) => ({
                    //     beforeRemove: e => {
                    //         if (e.data.action.payload.name === 'Login' ) {
                    //             navigation.push('Login')

                    //         } else if (e.data.action.payload.name === 'AfterLogin') {
                    //             console.log('teste'+e.data.action)
                    //             navigation.push('AfterLogin')
                    //         } else {
                    //           e.preventDefault();
                        
                    //           // Prompt the user before leaving the screen
                    //           Alert.alert(
                    //             'Você deseja sair do app?',
                    //             'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    //             [
                    //               { text: "Manter", style: 'cancel', onPress: () => {} },
                    //               { text: "Logout", style: 'cancel', onPress: () => {
                    //                 AsyncStorage.removeItem('token');
                    //                 navigation.dispatch(
                    //                   CommonActions.navigate({
                    //                     name: 'Login',
                    //                     params: {
                    //                       credentials: false,
                    //                     },
                    //                   })
                    //                 );
                    //             } },
                    //               {
                    //                 text: 'Sair',
                    //                 style: 'destructive',
                    //                 // If the user confirmed, then we dispatch the action we blocked earlier
                    //                 // This will continue the action that had triggered the removal of the screen
                    //                 onPress: () => RNExitApp.exitApp(),
                    //               },
                    //             ]
                    //           )
                    //           }
                    //     },
                    // })}
                
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

const Navigator = ({stateCarteira}) => {
    return (
        <ThemeProvider theme={stateCarteira.mode === 'dark' ? darkTheme : lightTheme}>
            <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle={stateCarteira.mode === 'dark' ? "light-content" : 'dark-content' }/>
                <AuthNavigator />

            </NavigationContainer>
        </ThemeProvider>
    );
};

const mapStateToProps = state => ({
    stateCarteira: state.dates,
  });

export default connect(mapStateToProps)(Navigator);

