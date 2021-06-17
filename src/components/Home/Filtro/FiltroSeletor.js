import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import Modal from 'react-native-modal';
import CustomInput from '../../CustomInput'
import globalStyles from '../../../styles/globalStyles';
import { ThemeContext } from 'styled-components/native';	
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container, ModalCustom, TitleText, ButtonView, Button, ButtonText, ToggleView, Percent, PercentPress, Currency, CurrencyPress, RightCard,
SelectPeriodView, ToggleLabelText, FirstLastDateView,
DateButtonText, DateButtonView, DatesView
} from './styles';

import { connect } from 'react-redux';
import { pegarDadosCarteiras } from '../../../store/actions/actions-dados-usuario'
import { alteraCarteira } from '../../../store/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fetchComAppDatasCarteiras from '../../../dados/conta/datasCarteiras';

const FiltroSeletor = props => {
    const [carteiras, setCarteiras] = useState([])
    const [inputCarteira, setInputCarteira] = useState('')
    const [todasCarteiras, setTodasCarteiras] = useState([])

    const [selectedWallet, setSelectedWallet] = useState(props.stateCarteira.carteira);
    const [selectPeriod, setSelectPeriod] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    const [firstWalletDate, setFirstWalletDate] = useState('')
    const [lastWalletDate, setLastWalletDate] = useState('')
    const [firstSelectedDate, setFirstSelectedDate] = useState('')
    const [lastSelectedDate, setLastSelectedDate] = useState('')

    const StyledTheme = useContext(ThemeContext)


    useEffect(() => {
        if (!props.isLoadingCarteirasUsuario && props.ResponseCarteirasUsuario !== []) {
          setCarteiras(props.ResponseCarteirasUsuario);
          setTodasCarteiras(props.ResponseCarteirasUsuario)
        }
    }, [props.isLoadingCarteirasUsuario, props.ResponseCarteirasUsuario])


    useEffect(() => {
      async function getWalletDates(carteira) {
              await fetchComAppDatasCarteiras({nomeCarteira: carteira}).then(response => {
                
                  let datas = {
                      inicio: response.data_mais_antiga,
                      final: response.data_mais_recente
                  }

                  const diaA = datas.inicio.substr(0,2);
                  const mesA = datas.inicio.substr(3,2)
                  const anoA = datas.inicio.substr(6,4)
                  let timestamp = new Date(`${anoA}-${mesA}-${diaA}`).getTime()
                  const diaR = datas.final.substr(0,2);
                  const mesR = datas.final.substr(3,2)
                  const anoR = datas.final.substr(6,4)
                  console.log('bbbb'+diaR,mesR,anoR)
                  let timestampR = new Date(`${anoR}-${mesR}-${diaR}`).getTime()
                  setFirstWalletDate(timestamp);
                  setFirstSelectedDate(timestamp);
                  setLastWalletDate(timestampR);
                  setLastSelectedDate(timestampR);
                  setIsLoadingDatas(false)

              }).catch(error => 
                error
              )

  }
  if (selectPeriod && selectedWallet !== '') {
      getWalletDates(selectedWallet)

  }
  }, [selectPeriod])

    const handleSetecWallet = (name) => {
      setSelectedWallet(name);
      setInputCarteira(name)
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

      const handleChangeSelectPeriod = () =>  {
        setSelectPeriod(!selectPeriod)
        if (selectedWallet) {
            setIsLoadingDatas(true)
        }
    }

    const handleShowFirstDate = () => {

    }

    const handleShowLastDate = () => {

    }

    const handleSelectFirstDate = (date) => {
        if (date > firstWalletDate) {
            setFirstSelectedDate(date)
            showError(false)
        } else {
            handleShowError(`Escolha uma data posterior a ${firstWalletDate}`)
        }
    }

    const handleSelectLastDate = (date) => {
        if (date < firstWalletDate) {
            setFirstSelectedDate(date)
            showError(false)
        } else {
            handleShowError(`Escolha uma data anterior a ${lastWalletDate}`)
        }
    }

    function handleShowError(message) {
        setErrorMessage(message)
        showError(true)
    }


    const handleSaveChanges = () => {
        
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
                    style={{height: props.height, width: props.width, marginTop: getStatusBarHeight()}}>
                    <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 15, marginLeft: globalStyles.dimensions.width*-0.4}}>
                        <TouchableOpacity onPress={props.buttonAction}>
                            <Ionicons name="arrow-undo" size={25} color={StyledTheme.colors.fontColor}/>
                        </TouchableOpacity>
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
                            <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => handleSetecWallet(el)}>
                                {selectedWallet === el ? 
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
                      <SelectPeriodView>
                        <ToggleLabelText>Todo o período</ToggleLabelText>
                      <ToggleView>
                      <RightCard onPress={handleChangeSelectPeriod} activeOpacity={1} pressDuration={0.5}>
                        {
                          !selectPeriod ? (
                            <CurrencyPress>
                              <Text style={{ color: StyledTheme.colors.firstLayer, fontSize: 25, marginRight: 4 }
                              }>o</Text>
                            </CurrencyPress>
                          ) : (
                            <Currency>
                              <Text style={
                                { color: StyledTheme.colors.invertedBackground, fontSize: 25, marginRight: 4 }
                              }>o</Text>
                            </Currency>
                          )
                        }


                      </RightCard>

                      {
                        selectPeriod ? (
                          <PercentPress>
                            <Icon.Button
                              name="calendar"
                              color={StyledTheme.colors.firstLayer}
                              backgroundColor={StyledTheme.colors.invertedBackground}
                              iconStyle={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginLeft: 8
                              }
                              }
                              onPress={handleChangeSelectPeriod}
                            />
                          </PercentPress>
                        ) : (
                          <Percent>
                            <Icon.Button
                              name="calendar"
                              color={StyledTheme.colors.fontColor}
                              backgroundColor={StyledTheme.colors.background}
                              iconStyle={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginLeft: 8
                              }}
                              onPress={handleChangeSelectPeriod}
                            />
                          </Percent>
                        )
                      }
                    </ToggleView>
                    <ToggleLabelText>Selecionar período</ToggleLabelText>
                    </SelectPeriodView>
                    {
                      selectPeriod ? (
                        <DatesView style={{width: props.width}}>
                          <Text>Selecione o período de análise</Text>
                          <FirstLastDateView  style={{width: props.width}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={handleShowFirstDate} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                                <DateButtonView>
                                    <DateButtonText>De: {
                                    (new Date(firstSelectedDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'})
                                    }
                                    </DateButtonText>
                                    <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                                </DateButtonView>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={handleShowLastDate} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                                <DateButtonView>
                                    <DateButtonText>De: {
                                    (new Date(lastSelectedDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'})
                                    }
                                    </DateButtonText>
                                    <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                                </DateButtonView>
                            </TouchableOpacity>
                          </FirstLastDateView>
                        </DatesView>
                      ) :  null
                    }
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