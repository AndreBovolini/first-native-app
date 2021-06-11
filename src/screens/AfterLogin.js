import React, { useState, useEffect } from 'react';
import {
    View, ActivityIndicator , StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalEscolheCarteira from '../components/Login/ModalEscolheCarteira';

import { connect } from 'react-redux';
import { pegarDadosCarteiras, pegarDatasCarteiras, pegarInfosCarteiras } from '../store/actions/actions-dados-usuario'
import { pegarDadosHomePage } from '../store/actions/action-dados-home';
import { alteraCarteira, alteraDataMaisAntiga, alteraDataMaisRecente, newDataFinal, newDataInicial } from '../store/actions/actions'


const AfterLogin = (props) => {
    const [showModal, setShowModal] = useState(false)


    useEffect(async () => {
        props.pegarDadosHomePage('bananas')
        return props.navigation.navigate('Home')
        let token = await AsyncStorage.getItem('token')  
        props.pegarCarteirasUsuario(token)
        props.pegarInfosCarteiras(token)

        const carteiraDefault = await AsyncStorage.getItem('Carteira');
        if (carteiraDefault) {
            props.alteraCarteira(carteiraDefault)
        } else {
            setShowModal(true)
        }
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

    // useEffect(() => {
    //     if (props.stateCarteira.carteira !== '' && props.responseInfosCarteiras !== []) {
    //         let dataAntiga = '';
    //         let dataRecente = '';

    //         props.responseInfosCarteiras.forEach(carteira => {
    //             if (carteira["Nome da Carteira"] === props.stateCarteira.carteira) {
    //                 dataAntiga = carteira["Data da Primeira Operação"]
    //                 const diaA = dataAntiga.substr(0,2);
    //                 const mesA = dataAntiga.substr(3,2)
    //                 const anoA = dataAntiga.substr(6,4)
    //                 let timestamp = new Date(`${anoA}-${mesA}-${diaA}`).getTime()
    //                 props.alteraDataMaisAntiga(timestamp)
    //                 props.newDataInicial(timestamp)
    //                 dataRecente = carteira["Data da Cota mais Recente"]
    //                 const diaR = dataRecente.substr(0,2);
    //                 const mesR = dataRecente.substr(3,2)
    //                 const anoR = dataRecente.substr(6,4)
    //                 let timestampR = new Date(`${anoR}-${mesR}-${diaR}`).getTime()
    //                 props.alteraDataMaisRecente(timestampR)
    //                 props.newDataFinal(timestampR)
    //             }                
    //         });
    //         console.log(dataAntiga, dataRecente)
    //     }
    // }, [props.responseInfosCarteiras, props.stateCarteira.carteira])
    
    useEffect(async() => {
        if(props.stateCarteira.carteira !== ''){
            let token = await AsyncStorage.getItem('token')
            console.log('o token ' + token)
            console.log('o nome ' + props.stateCarteira.carteira)
            await props.pegarDatasCarteiras(token, props.stateCarteira.carteira)
        }
    },[props.stateCarteira.carteira])

    useEffect(() => {
        if (props.stateCarteira.carteira !== '' && props.responseDatasCarteiras !== []) {
            let dataAntiga = '';
            let dataRecente = '';
                dataAntiga = props.responseDatasCarteiras["data_mais_antiga"]
                if (dataAntiga) {
                    console.log('xxxxxxxxxxxxxxx' + dataAntiga)
                    const diaA = dataAntiga.substr(0,2);
                    const mesA = dataAntiga.substr(3,2)
                    const anoA = dataAntiga.substr(6,4)
                    console.log(diaA,mesA,anoA)
                    let timestamp = new Date(`${anoA}-${mesA}-${diaA}`).getTime()
                    console.log(timestamp)
                    props.alteraDataMaisAntiga(timestamp)
                    props.newDataInicial(timestamp)
                    dataRecente = props.responseDatasCarteiras["data_mais_recente"]
                    const diaR = dataRecente.substr(0,2);
                    const mesR = dataRecente.substr(3,2)
                    const anoR = dataRecente.substr(6,4)
                    console.log(diaR,mesR,anoR)
                    let timestampR = new Date(`${anoR}-${mesR}-${diaR}`).getTime()
                    props.alteraDataMaisRecente(timestampR)
                    props.newDataFinal(timestampR)
                }
                

        }
    }, [props.responseDatasCarteiras])


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
    responseDatasCarteiras: state.datasCarteiras.data,
    isLoadingDatasCarteiras: state.datasCarteiras.loading,
    datasCarteiras: state.datasCarteiras,
  });
  
const mapDispatchToProps = ( dispatch )=> ({
    newDataInicial: (data) => dispatch(newDataInicial(data)),
    newDataFinal: (data) => dispatch(newDataFinal(data)),
    alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
    alteraDataMaisAntiga: (dataMaisAntiga) => dispatch(alteraDataMaisAntiga(dataMaisAntiga)),
    alteraDataMaisRecente: (dataMaisRecente) => dispatch(alteraDataMaisRecente(dataMaisRecente)),
    pegarCarteirasUsuario: (token) => dispatch(pegarDadosCarteiras(token)),
    pegarInfosCarteiras: (token) => dispatch(pegarInfosCarteiras(token)),
    pegarDadosHomePage: (token) => dispatch(pegarDadosHomePage(token)),
    pegarDatasCarteiras: (token, nomeCarteira ) => dispatch(pegarDatasCarteiras(token, nomeCarteira))
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