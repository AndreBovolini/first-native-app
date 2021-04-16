import React from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain';
import { useEffect } from 'react';
import globalStyles from '../styles/globalStyles';

const AuthOrApp = (props) => {

    useEffect(async() => {
        const userToken = await AsyncStorage.getItem('token');
        let token = parseInt(userToken);
        let date = new Date().getTime();

        if (token) {
        if (token < date) {
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
                props.navigation.navigate('Login', {
                    credentials: true
                })
            } else {
                props.navigation.navigate('Login', {
                    credentials: false
                })
            }
        } else {
            props.navigation.navigate('Home')
        }
        } else {
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
                props.navigation.navigate('Login', {
                    credentials: true
                })
            } else {
                props.navigation.navigate('Login', {
                    credentials: false
                })
            }
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
        backgroundColor: globalStyles.colors.backGround
    }
})