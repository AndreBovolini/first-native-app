import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Modal from 'react-native-modal';
import CustomInput from '../CustomInput'
import globalStyles from '../../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
import { pegarDadosCarteiras } from '../../store/actions/actions-dados-usuario'
import { alteraCarteira } from '../../store/actions/actions'

import { ThemeContext } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalEscolheCarteira = (props) => {
  const [carteiras, setCarteiras] = useState([])
  const [todasCarteiras, setTodasCarteiras] = useState([])
  const [modalHeight, setModalHeight] = useState(400)
  const [inputCarteira, setInputCarteira] = useState('')
  const [isPadrao, setIsPadrao] = useState(false)

  const StyledTheme = useContext(ThemeContext)

  let inicio = []

  // useEffect(() => {
  //   let height = 200 + (carteiras.length * 40);
  //   setModalHeight(height);
  // }, [])

  useEffect(() => {
    if (!props.isLoadingCarteirasUsuario && props.ResponseCarteirasUsuario !== []) {
      setCarteiras(props.ResponseCarteirasUsuario);
      setTodasCarteiras(props.ResponseCarteirasUsuario)
    }
  }, [props.isLoadingCarteirasUsuario, props.ResponseCarteirasUsuario])

  function onSelectCarteira(carteira) {
    setInputCarteira(carteira)
  }
  const handleSalvarPadrao = () => {
    setIsPadrao(!isPadrao)
  }
  
  async function handleSendInfo(carteira) {
    if (isPadrao) {
      await AsyncStorage.setItem('Carteira', carteira);
    }
    props.alteraCarteira(carteira)
  }

  function handleChangeText(carteira) {
    setInputCarteira(carteira);
    if (carteira !== '') {
      let cartFiltro = [...todasCarteiras];
      let filtradas = cartFiltro.filter(
        carteiras => carteiras.includes(carteira.toLowerCase())
      )
      setCarteiras(filtradas)
    } else {
      filtradas = [...todasCarteiras]
      setCarteiras(filtradas)
    }
  }
  
  return (
    <View style={styles.container}>
      <Modal isVisible={props.visible}>
        <View
          style={[styles.modal, { height: modalHeight}]}>
            <View style={{flexDirection: 'row'}}>
            <CustomInput
              placeholder={'Selecione uma Carteira'}
              value={inputCarteira}
              onChangeText={carteira => handleChangeText(carteira)}
              label={''}
              style={{width: globalStyles.dimensions.width * 0.65, height: 40, color: StyledTheme.colors.backgroundColor}}
              // keyboardType={'email-address'}
              placeholderTextColor={'#808080'}
              type={'usuário'}
            />
            <TouchableOpacity onPress={() => handleSendInfo(inputCarteira)} style={{backgroundColor: '#2A0DB8', height: 40, width: 40, borderRadius: 10, marginTop: 19, marginLeft: 10}}>
              <Text style={{fontSize: 18, color: '#FFF', fontWeight: 'bold', alignSelf:'center', justifyContent: 'center', marginTop: 7}}>
                OK
              </Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: -10, marginLeft: -40}}>
              <TouchableOpacity onPress={handleSalvarPadrao}>
                {isPadrao? 
                <Ionicons name="checkbox" size={25} color={'#FFF'}/>
                :
                <Ionicons name="square-outline" size={25} color={'#FFF'}/>
                }
              </TouchableOpacity>
              <Text style={styles.titleText}>Salvar como padrão</Text>
            </View>
            <ScrollView>
            {
              carteiras.map((el, i) => {
                return (
                  <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => onSelectCarteira(el)}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{el}</Text>
                        <Ionicons name={'wallet'} size={18} color={globalStyles.colors.fontColor} />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            </ScrollView>
        </View>
      </Modal>
    </View>
  );
};


const mapStateToProps = state => ({
  stateCarteira: state.dates,
  isLoadingCarteirasUsuario: state.dadosCarteiras.loading,
  ResponseCarteirasUsuario: state.dadosCarteiras.data,
});

const mapDispatchToProps = ( dispatch )=> ({
  alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
  pegarCarteirasUsuario: (token) => dispatch(pegarDadosCarteiras(token))
}) 
  

export default connect(mapStateToProps, mapDispatchToProps)(ModalEscolheCarteira);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalStyles.colors.firstLayer, 
        width: globalStyles.dimensions.width *0.9, 
        borderRadius: 20,
    },
    titleText: {
       marginHorizontal: 10, 
       marginVertical: 5, 
       marginTop: 0,
       fontSize: 18, 
       color: globalStyles.colors.fontColor, 
       textAlign: 'center'
    },
    buttonView: {
        height: 40,
        width: 170,
        backgroundColor: '#2A0DB8',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
      },
      buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 18,
        marginRight: 20,
  
      }
});
