import React from 'react';
import { StyleSheet, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from '../screens/home';
import Carteira from '../screens/carteira';
import Performance from '../screens/performance'
import globalStyles from '../styles/globalStyles';


const Tab = createBottomTabNavigator()
export default function NavigationTab() {
    return (
        <NavigationContainer>      
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
                
    

                initialRouteName="Home" 
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
                }}
            >
                <Tab.Screen name="Performance" component={Performance} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Carteira" component={Carteira} />

            </Tab.Navigator>
        </NavigationContainer>
    

)
}
