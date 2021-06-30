import React from 'react';
import {
    View, ActivityIndicator , StyleSheet, StatusBar
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { alteraViewMode } from '../store/actions/actions'

import LogoBranco from '../assets/logoBranco.svg';

import LogoInteiroBranco from '../assets/logoInteiroBranco';



import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated'

const AuthOrApp = (props) => {

    useEffect(async() => {
        const userToken = await AsyncStorage.getItem('token');
        const mode = await AsyncStorage.getItem('mode');
        const expiration = await AsyncStorage.getItem('expiration');
        let date = (new Date()).getTime()
        let token = userToken
        let credentials = await Keychain.getGenericPassword();
        //console.warn(token)
        if (token && !isNaN(expiration)) {
        if (expiration < date) {
            //console.warn('eita')
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
                splashAnimation.value = withTiming(
                    50,
                    { duration: 2000 },
                    () => {
                        'worklet';
                        runOnJS(navigateLoginParams)();
                    }
                )
            } else {
                splashAnimation.value = withTiming(
                    50,
                    { duration: 2000 },
                    () => {
                        'worklet';
                        runOnJS(navigateLogin)();
                    }
                )
            }
        } else {
            splashAnimation.value = withTiming(
                50,
                { duration: 2000 },
                () => {
                    'worklet';
                    runOnJS(navigateAfterLogin)();
                }
            )
        }
        } else {
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
                splashAnimation.value = withTiming(
                    50,
                    { duration: 2000 },
                    () => {
                        'worklet';
                        runOnJS(navigateLoginParams)();
                    }
                )
            } else {
                splashAnimation.value = withTiming(
                    50,
                    { duration: 2000 },
                    () => {
                        'worklet';
                        runOnJS(navigateLogin)();
                    }
                )
            }
        }
d
        if (mode === 'light') {
            props.alteraViewMode('light')
        } else {
            props.alteraViewMode('dark')
        }
    },[]);

    const splashAnimation = useSharedValue(0);


    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0] ),
            transform: [
                {
                    translateY: interpolate(splashAnimation.value,
                        [0, 50], [0, -50], Extrapolate.CLAMP)
                }
            ]
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, 
                [0, 25, 50],
                [0, 0.3, 1],
            ),
            transform: [
                {
                    translateY: interpolate(splashAnimation.value,
                        [0, 50], [-50, 0], Extrapolate.CLAMP)
                }
            ]
        }
    });

    function navigateLoginParams() {
        props.navigation.navigate('Login', {
            credentials: true
        })
    }

    function navigateLogin() {
        props.navigation.navigate('Login', {
            credentials: false
        })
    }

    function navigateAfterLogin() {
        props.navigation.navigate('AfterLogin')
    }


    return (
        <View style={styles.container}>
            {/* <StatusBar  barStyle="light-content"
         translucent
         backgroundColor="transparent"/> */}
            <Animated.View style={[brandStyle, {position: "absolute"}]}>
                <LogoBranco width={200} height={200} />
            </Animated.View>
            <Animated.View style={[logoStyle, { position: "absolute"}]}>
            <LogoInteiroBranco width={240} height={128}/>
            </Animated.View>
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
        backgroundColor: '#1f1f1b'
    }
})