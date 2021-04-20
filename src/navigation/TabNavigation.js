import React from 'react';
import { StyleSheet, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Login from '../screens/Login'
import AuthorApp from '../screens/AuthorApp'
import Home from '../screens/home';
import Carteira from '../screens/carteira';
import Performance from '../screens/performance'
import ResetPassword from  '../screens/ResetPassword';
import globalStyles from '../styles/globalStyles';
import { StackRouter } from 'react-navigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const TabNavigation = () => {
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
                        backgroundColor: globalStyles.colors.firstLayer,
                        borderTopEndRadius: 19,
                        borderTopStartRadius: 19,
                        height:55,
                        borderTopWidth: 0,
                        position: 'absolute'
                    }
                }} initialRouteName="Home"
            >
                
                
                <Tab.Screen name="Performance" component={Performance} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Carteira" component={Carteira} />

            </Tab.Navigator>
    

)
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>   
            <Stack.Screen name="AuthOrApp" component={AuthorApp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        </Stack.Navigator>
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