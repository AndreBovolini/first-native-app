import React, { useState, useEffect } from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalEscolheCarteira from '../components/ModalEscolheCarteira';

import { connect } from 'react-redux';
import { pegarDadosCarteiras, pegarInfosCarteiras } from '../store/actions/actions-dados-usuario'
import { pegarDadosHomePage } from '../store/actions/action-dados-home';
import { alteraCarteira } from '../store/actions/actions'


const AfterLogin = ({pegarDadosHomePage, ResponseInfosCarteiras, isLoadingCarteirasUsuario, navigation, stateCarteira, alteraCarteira, pegarCarteirasUsuario, ResponseCarteirasUsuario, pegarInfosCarteiras}) => {
    const [showModal, setShowModal] = useState(false)


    useEffect(async () => {
        let token = await AsyncStorage.getItem('token')
        pegarCarteirasUsuario(token)
        pegarInfosCarteiras(token)
        setShowModal(true)
    },[])

    useEffect(async() => {
        // if (!isLoadingCarteirasUsuario && ResponseCarteirasUsuario !== []) {
        //     const carteiraDefault = await AsyncStorage.getItem('Carteira');
        //     console.log('aaaaa',ResponseCarteirasUsuario)
        //     if (carteiraDefault) {
        //         alteraCarteira(carteiraDefault);
        //         navigation.navigate('Home');
        //     } else {
        //         setShowModal(true)
        //     }
        // }
    },[isLoadingCarteirasUsuario]);

    useEffect(async () => {
        if (stateCarteira.carteira !== '') {
            setShowModal(false)
            let token = await AsyncStorage.getItem('token')
            navigation.navigate('Home');
            pegarDadosHomePage(token)
        }
    }, [stateCarteira.carteira])


    useEffect(() => {
        //console.log(ResponseInfosCarteiras)
    }, [ResponseInfosCarteiras])
 
    return (
        <View style={styles.container}>
            <ModalEscolheCarteira  visible={showModal}/>
            <ActivityIndicator size='large' color='#FFF'/>
        </View>
    )
}

const mapStateToProps = state => ({
    stateCarteira: state.dates,
    isLoadingCarteirasUsuario: state.dadosCarteiras.loading,
    ResponseCarteirasUsuario: state.dadosCarteiras.data,
    ResponseInfosCarteiras: state.infosCarteiras,
  });
  
const mapDispatchToProps = ( dispatch )=> ({
    alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
    pegarCarteirasUsuario: (token) => dispatch(pegarDadosCarteiras(token)),
    pegarInfosCarteiras: (token) => dispatch(pegarInfosCarteiras(token)),
    pegarDadosHomePage: (token) => dispatch(pegarDadosHomePage(token))
}) 
    
  
export default connect(mapStateToProps, mapDispatchToProps)(AfterLogin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})