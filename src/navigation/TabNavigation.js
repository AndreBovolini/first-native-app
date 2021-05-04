import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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
import { StackRouter } from 'react-navigation';

import { Provider } from 'react-redux';
import store from '../store/index';

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
    return (
            
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
                    inactiveTintColor: '#000',
                    labelStyle: { fontSize: 15},
                    showLabel: true,
                    keyboardHidesTabBar: true,
                    style: {
                        backgroundColor: '#272727',
                        borderTopEndRadius: 19,
                        borderTopStartRadius: 19,
                        height:55,
                        borderTopWidth: 0,
                        position: 'absolute'
                    }
                }} initialRouteName="Home"
            >
                
                
                <Tab.Screen name="Performance" component={Performance} options={{ tabBarVisible: landscapeShow}}/>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Carteira" component={Carteira} />
                <Tab.Screen name="Perfil" component={Profile} />

            </Tab.Navigator>
    

)
}

const AuthNavigator = () => {
    return (
        <Provider store={store}>
            <Stack.Navigator screenOptions={{ headerShown: false }}> 
                <Stack.Screen name="AuthOrApp" component={AuthorApp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="AfterLogin" component={AfterLogin} /> 
                <Stack.Screen name="Home" component={TabNavigation} />
                <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            </Stack.Navigator>
        </Provider>
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};
export default Navigator