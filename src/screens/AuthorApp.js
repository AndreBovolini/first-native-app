import React from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react';

const AuthOrApp = (props) => {

    useEffect(async() => {
        const userToken = await AsyncStorage.getItem('token');
        let token = parseInt(userToken);
        let date = new Date().getTime();
        console.warn(token, date)

        if (token) {
        if (token < date) {
            props.navigation.navigate('Login')
        } else {
            props.navigation.navigate('Home')
        }
        } else {
            props.navigation.navigate('Login')
        }
    },[]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#FFF'/>
        </View>
    )
}

export default AuthOrApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})