import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Modal from 'react-native-modal';

import globalStyles from '../../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { pegarDadosCarteiras } from '../../store/actions/actions-dados-usuario'
import { alteraCarteira } from '../../store/actions/actions'
import CustomInput from '../CustomInput';
import { ThemeContext } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalEscolheCarteira = (props) => {
  const [carteiras, setCarteiras] = useState([])
  const [todasCarteiras, setTodasCarteiras] = useState([])
  const [modalHeight, setModalHeight] = useState(400)
  const [inputCarteira, setInputCarteira] = useState('')

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

  async function onSelectCarteira(carteira) {
    await AsyncStorage.setItem('Carteira', carteira);
    props.alteraCarteira(carteira)
  }

  function handleChangeText(carteira) {
    setInputCarteira(carteira);ee
    if (carteira !== '') {
      let cartFiltro = [...todasCarteiras];
      let filtradas = cartFiltro.filter(
        carteiras => carteiras.substring(0, carteira.length).toLowerCase() === carteira.toLowerCase()
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
          <Text style={styles.titleText}>Escolha uma carteira padrão:</Text>
          <CustomInput
              placeholder={'Carteira'}
              value={inputCarteira}
              onChangeText={carteira => handleChangeText(carteira)}
              label={'Carteira:'}
              style={{width: globalStyles.dimensions.width * 0.67, height: 40, color: StyledTheme.colors.background}}
              keyboardType={'email-address'}
              placeholderTextColor={'#aaa'}
              type={'carteiradddd'}
            />
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
       marginHorizontal: 20, 
       marginVertical: 20, 
       fontSize: 25, 
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
