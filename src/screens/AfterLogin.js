import React, { useState, useEffect } from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalEscolheCarteira from '../components/Login/ModalEscolheCarteira';

import { connect } from 'react-redux';
import { pegarDadosCarteiras, pegarInfosCarteiras } from '../store/actions/actions-dados-usuario'
import { pegarDadosHomePage } from '../store/actions/action-dados-home';
import { alteraCarteira, alteraDataMaisAntiga, alteraDataMaisRecente, newDataFinal, newDataInicial } from '../store/actions/actions'


const AfterLogin = (props) => {
    const [showModal, setShowModal] = useState(false)


    useEffect(async () => {
        let token = await AsyncStorage.getItem('token')
        props.pegarCarteirasUsuario(token)
        props.pegarInfosCarteiras(token)
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
    },[props.isLoadingCarteirasUsuario]);

    useEffect(() => {
        if (props.stateCarteira.carteira !== '' && props.responseInfosCarteiras !== []) {
            let dataAntiga = '';
            let dataRecente = '';
            console.log('á')
            props.responseInfosCarteiras.forEach(carteira => {
                console.log('b', carteira["Nome da Carteira"])
                if (carteira["Nome da Carteira"] === props.stateCarteira.carteira) {
                    console.log('c', carteira["Nome da Carteira"])
                    dataAntiga = carteira["Data da Primeira Operação"]
                    props.alteraDataMaisAntiga(dataAntiga)
                    dataRecente = carteira["Data da Cota mais Recente"]
                    props.alteraDataMaisRecente(dataRecente)
                }                
            });
            console.log(dataAntiga, dataRecente)
        }
    }, [props.responseInfosCarteiras, props.stateCarteira.carteira])

    useEffect(async () => {
        if (props.stateCarteira.carteira !== '' && props.stateCarteira.dataMaisAntiga !== '') {
            setShowModal(false)
            let token = await AsyncStorage.getItem('token')
            props.navigation.navigate('Home');
            props.pegarDadosHomePage(token)
        }
    }, [props.stateCarteira.carteira, props.stateCarteira.dataMaisAntiga])


    useEffect(() => {
        //console.log(ResponseInfosCarteiras)
    }, [props.responseInfosCarteiras])
 
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
    responseInfosCarteiras: state.infosCarteiras.data,
    isLoadingInfosCarteiras: state.infosCarteiras.loading,
  });
  
const mapDispatchToProps = ( dispatch )=> ({
    newDataInicial: (data) => dispatch(newDataInicial(data)),
    newDataFinal: (data) => dispatch(newDataFinal(data)),
    alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
    alteraDataMaisAntiga: (dataMaisAntiga) => dispatch(alteraDataMaisAntiga(dataMaisAntiga)),
    alteraDataMaisRecente: (dataMaisRecente) => dispatch(alteraDataMaisRecente(dataMaisRecente)),
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