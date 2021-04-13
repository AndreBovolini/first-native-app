import React from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react';

const AuthOrApp = (props) => {

    useEffect(async() => {
        const userToken = await AsyncStorage.getItem('userToken');
        let token = parseInt(userToken);
        let date = new Date();

        if (token > date) {
            props.navigation.navigate('Login')
        } else {
            props.navigation.navigate('Home')
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