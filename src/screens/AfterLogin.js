import React, { useState, useEffect } from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalEscolheCarteira from '../components/Login/ModalEscolheCarteira';

import { connect } from 'react-redux';
import * as Actions from '../store/actions/actions';
import { bindActionCreators } from 'redux'


const AfterLogin = ({navigation, alteraCarteira}) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(async() => {
        const carteiraDefault = await AsyncStorage.getItem('Carteira');
        if (carteiraDefault) {
            alteraCarteira(carteiraDefault);
            navigation.navigate('Home');
        } else {
            setShowModal(true)
        }
    },[]);

    async function onSelectCarteira(carteira) {
        if (carteira) {
          await AsyncStorage.setItem('Carteira', carteira)
          alteraCarteira(carteira)
          navigation.navigate('Home');
        }

    }

    return (
        <View style={styles.container}>
            <ModalEscolheCarteira  visible={showModal} onSelectCarteira={onSelectCarteira}/>
            <ActivityIndicator size='large' color='#FFF'/>
        </View>
    )
}

const mapStateToProps = state => ({
    stateCarteira: state.dates
  });
  
const mapDispatchToProps = dispatch => 
    bindActionCreators(Actions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})