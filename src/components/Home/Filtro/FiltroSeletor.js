import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

import Modal from 'react-native-modal';
import CustomInput from '../../CustomInput'
import globalStyles from '../../../styles/globalStyles';
import { ThemeContext } from 'styled-components/native';	
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container, ModalCustom, TitleText, ButtonView, Button, ButtonText } from './styles';

import { connect } from 'react-redux';
import { pegarDadosCarteiras } from '../../../store/actions/actions-dados-usuario'
import { alteraCarteira } from '../../../store/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FiltroSeletor = props => {
    const [carteiras, setCarteiras] = useState([])
    const [isPadrao, setIsPadrao] = useState(false)
    const [selectedCart, setSelectedCart] = useState()
    const [inputCarteira, setInputCarteira] = useState('')
    const [todasCarteiras, setTodasCarteiras] = useState([])

    const StyledTheme = useContext(ThemeContext)

    useEffect(() => {
        if (!props.isLoadingCarteirasUsuario && props.ResponseCarteirasUsuario !== []) {
          setCarteiras(props.ResponseCarteirasUsuario);
          setTodasCarteiras(props.ResponseCarteirasUsuario)
        }
    }, [props.isLoadingCarteirasUsuario, props.ResponseCarteirasUsuario])

    const handleSalvarPadrao = () => {
        setIsPadrao(!isPadrao)
    }

    const handleSelectCarteira = (carteira) => {
        setSelectedCart(carteira)
        setInputCarteira(carteira);
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
        <Container>
            <Modal isVisible={props.visible} 
            hasbackdrop={true} 
            backdropOpacity={0.8}
            onBackButtonPress={props.buttonAction}
            onBackdropPress={props.buttonAction}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            onSwipeComplete={props.buttonAction}
            swipeDirection={['right']}
            style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 15
            }}
            useNativeDriverForBackdrop>
                <ModalCustom
                    style={{height: props.height, width: props.width, marginTop: Platform.OS === 'ios' ? 30 : 0}}>
                    <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 15, marginLeft: globalStyles.dimensions.width*-0.2}}>
                        <TouchableOpacity onPress={props.buttonAction}>
                            <Ionicons name="arrow-undo" size={25} color={StyledTheme.colors.fontColor}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 18, marginLeft: globalStyles.dimensions.width*0.15, marginBottom: -5}}>
                        <TouchableOpacity onPress={handleSalvarPadrao}>
                            {isPadrao? 
                            <Ionicons name="checkbox" size={25} color={StyledTheme.colors.fontColor}/>
                            :
                            <Ionicons name="square-outline" size={25} color={StyledTheme.colors.fontColor}/>
                            }
                        </TouchableOpacity>
                        <TitleText>Salvar como padrão</TitleText>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <CustomInput
                        placeholder={'Selecione uma Carteira'}
                        value={inputCarteira}
                        onChangeText={carteira => handleChangeText(carteira)}
                        label={''}
                        style={{width: globalStyles.dimensions.width * 0.65, height: 40, color: StyledTheme.colors.background}}
                        placeholderTextColor={'#808080'}
                        type={'usuário'}
                        />
                    </View>
                    <ScrollView>
                        {carteiras[0] ?
                        carteiras.map((el, i) => {
                            return (
                            <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => handleSelectCarteira(el)}>
                                {selectedCart === el ? 
                                    <ButtonView style={{backgroundColor: '#FFF'}}>
                                    <Text style={{color: '#2A0DB8', fontSize: 18, fontWeight: 'bold', marginRight: 20,}}>{el}</Text>
                                    <Ionicons name={'wallet'} size={18} color={'#2A0DB8'} />
                                </ButtonView>
                                :
                                <ButtonView>
                                    <Text style={{color: globalStyles.colors.fontColor, fontSize: 18, marginRight: 20,}}>{el}</Text>
                                    <Ionicons name={'wallet'} size={18} color={globalStyles.colors.fontColor} />
                                </ButtonView>
                                }
                            </TouchableOpacity>
                            )
                        })
                        : null}
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.7}>
                          <Button>
                            <Text style={{color: '#FFF', fontSize: 20,}}>Salvar</Text>
                          </Button>
                    </TouchableOpacity>
                </ModalCustom>
            </Modal>        
        </Container>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(FiltroSeletor);