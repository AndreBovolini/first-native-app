import React from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { alteraViewMode } from '../store/actions/actions'

const AuthOrApp = (props) => {

    useEffect(async() => {
        const userToken = await AsyncStorage.getItem('token');
        const mode = await AsyncStorage.getItem('mode');
        const expiration = await AsyncStorage.getItem('expiration');
        let date = (new Date()).getTime()
        let token = userToken
        let credentials = await Keychain.getGenericPassword();
        //console.warn(token)
        if (token) {
        if (expiration < date) {
            //console.warn('eita')
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
            
            props.navigation.navigate('AfterLogin')
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

        if (mode === 'light') {
            props.alteraViewMode('light')
        } else {
            props.alteraViewMode('dark')
        }
    },[]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='red'/>
        </View>
    )
}
const mapStateToProps = state => ({
    stateCarteira: state.dates,
  });
  
  const mapDispatchToProps = ( dispatch )=> ({
    alteraViewMode: (mode) => dispatch(alteraViewMode(mode))
  }) 
    
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})