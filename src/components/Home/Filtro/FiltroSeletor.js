import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import Modal from 'react-native-modal';
import CustomInput from '../../CustomInput'
import globalStyles from '../../../styles/globalStyles';
import { ThemeContext } from 'styled-components/native';	
import Ionicons from 'react-native-vector-icons/Ionicons'
import CalendarPicker from '../../Perfil/Cards/Calendar/CalendarPicker'
import { Container, ModalCustom, TitleText, ButtonView, Button, ButtonText, ToggleView, Percent, PercentPress, Currency, CurrencyPress, RightCard,
SelectPeriodView, ToggleLabelText, FirstLastDateView,
DateButtonText, DateButtonView, DatesView, LoadingView
} from './styles';

import { toDate } from 'date-fns';
import { sub } from 'date-fns';
import { subDays } from 'date-fns';
import { getTime } from 'date-fns';

import { connect } from 'react-redux';
import { pegarDadosCarteiras } from '../../../store/actions/actions-dados-usuario'
import { alteraCarteira, logout } from '../../../store/actions/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fetchComAppDatasCarteiras from '../../../dados/conta/datasCarteiras';
import { pegarDadosHomePage } from '../../../store/actions/action-dados-home';

import Animated , {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { pegarDadosPosicaoConsolidada } from '../../../store/actions/action-posicao-consolidada';


const FiltroSeletor = props => {
    const [carteiras, setCarteiras] = useState([])
    const [carteira, setCarteira] = useState([
        'Carteira 1', 'Carteira 2', 'Carteira 3', 'Carteira 4',  'Carteira 5'
    ])
    const [height, setHeight] = useState(210)
    const [inputCarteira, setInputCarteira] = useState('')
    const [todasCarteiras, setTodasCarteiras] = useState([])

    const [selectedWallet, setSelectedWallet] = useState(props.stateCarteira.carteira);
    const [selectPeriod, setSelectPeriod] = useState(false);
    const [showSelectorInicial, setShowSelectorInicial] = useState(false)
    const [showSelectorFinal, setShowSelectorFinal] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    const [firstWalletDate, setFirstWalletDate] = useState('')
    const [lastWalletDate, setLastWalletDate] = useState('')
    const [firstSelectedDate, setFirstSelectedDate] = useState('')
    const [lastSelectedDate, setLastSelectedDate] = useState('')

    const StyledTheme = useContext(ThemeContext)


    const animation = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withTiming(animation.value, {
              duration: 400
            })
          }
        ]
      }
    })

    function switchMode() {
      if (!selectPeriod) {
        selectPeriodMode()
      } else {
        allPeriodMode()
      }
      setSelectPeriod(!selectPeriod)
      if (selectedWallet) {
          setIsLoadingDatas(true)
      }
    }

    function selectPeriodMode() {
      animation.value = 45

    }

    function allPeriodMode() {
      animation.value = 0
    }


    useEffect(() => {
        if (!props.isLoadingCarteirasUsuario && props.ResponseCarteirasUsuario !== []) {
          setCarteiras(props.ResponseCarteirasUsuario);
          setTodasCarteiras(props.ResponseCarteirasUsuario)
        }
    }, [props.isLoadingCarteirasUsuario, props.ResponseCarteirasUsuario])

    useEffect(() => {
      if(carteira.length <= 2){
        setHeight(120)
      }else if(carteira.length === 3) {
        setHeight(180)
      }else{
        setHeight(210)
      }
    },[carteira])

    useEffect(() => {
      async function getWalletDates(carteira) {
              const expiration = await AsyncStorage.getItem('expiration')
              console.warn(carteira)
              await fetchComAppDatasCarteiras({nomeCarteira: carteira}).then(response => {

                if (response.msg === 'Expired token') {
                  handleShowError('Token Expirado')
                } else {
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
                  console.log('times', new Date(timestamp).toLocaleDateString('pt-br', {timeZone: 'UTC'}))
                  setFirstWalletDate(timestamp);
                  setFirstSelectedDate(timestamp);
                  setLastWalletDate(timestampR);
                  setLastSelectedDate(timestampR);
                  setIsLoadingDatas(false)
                  setShowSelectorFinal(false)
                  setShowSelectorInicial(false)
                }
              }).catch(error => 
                error
              )

  }
  if (selectPeriod && selectedWallet !== '') {

      getWalletDates(selectedWallet)

  }
  }, [selectPeriod, selectedWallet])

    const handleSetecWallet = (name) => {
      setSelectedWallet(name);
      setInputCarteira(name);
      setIsLoadingDatas(true)
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
        if(selectPeriod === true){
          if(carteira.length <= 2){
            setHeight(120)
          }else if( carteira.length === 3){
            setHeight(180)
          }else{
          setHeight(210)
          }
        }
        if (selectedWallet) {
            setIsLoadingDatas(true)
        }
    }

    const handleShowFirstDate = () => {
      setHeight(120)
      setShowSelectorInicial(true)
      setShowSelectorFinal(false)
    }

    const handleShowLastDate = () => {
      setHeight(120)
      setShowSelectorFinal(true)
      setShowSelectorInicial(false)
    }

    const handleSelectFirstDate = (date) => {
        if (date > firstWalletDate) {
            
            setFirstSelectedDate(date)
            setShowError(false)
            setShowSelectorInicial(false)
        } else {
            handleShowError(`Escolha uma data posterior a ${firstWalletDate}`)
            setShowSelectorInicial(false)
        }
    }

    const handleSelectLastDate = (date) => {
        if (date < lastWalletDate) {
            
            setLastSelectedDate(date)
            setShowError(false)
            setShowSelectorFinal(false)
        } else {
            handleShowError(`Escolha uma data anterior a ${lastWalletDate}`)
            setShowSelectorFinal(false)
            
        }
    }

    function handleShowError(message) {
      if (message === 'Token Expirado') {
        setTimeout(() => {
          props.logout();
          props.buttonAction
        }, 100)
      }
        setErrorMessage(message)
        setShowError(true)
    }


    const handleSaveChanges = () => {
        if (props.stateCarteira.carteira === selectedWallet) {
          if ( firstSelectedDate === firstWalletDate && lastSelectedDate === lastWalletDate) {
            handleShowError('Esta já é a análise atual')
          } else {
            props.pegarDadosPosicaoConsolidada(selectedWallet)
            props.pegarDadosHomePage()
          }
        } else {
          props.alteraCarteira(selectedWallet)
          props.pegarDadosPosicaoConsolidada(selectedWallet)
          props.pegarDadosHomePage()
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
            marginTop: 0
            }}
            useNativeDriverForBackdrop>
                <ModalCustom
                    style={{height: props.height, width: props.width, marginTop: getStatusBarHeight()}}>
                    <View style={{flexDirection: 'row'}}>
                    
                    
                    <View style={{flexDirection: 'row', marginLeft:globalStyles.dimensions.width*-0.07}}></View>
                      <View style={{marginTop: 2, marginLeft: globalStyles.dimensions.width*-0.09, marginTop: 20}}>
                      <TouchableOpacity onPress={props.buttonAction}>
                          <Ionicons name="arrow-undo" size={25} color={StyledTheme.colors.fontColor}/>
                      </TouchableOpacity>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0, marginBottom: -10, marginLeft: globalStyles.dimensions.width* 0.09}}>
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
                    </View>
                    <ScrollView style={{height: height}}>
                        {carteiras[0] ?
                        carteira.map((el, i) => {
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
                    <TouchableOpacity style={{
                      backgroundColor: !selectPeriod ? '#FFF' : '#2A0DB8',
                      height: 25,
                      width: 70,
                      borderRadius: 15,
                    }}
                    onPress={switchMode}
                    >
                      <Animated.View style={[{
                        backgroundColor: !selectPeriod ? '#000' : '#FFF',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        margin: 2.5,
                      }, animatedStyles]}>

                      </Animated.View>

                    </TouchableOpacity>
                    <ToggleLabelText>Selecionar período</ToggleLabelText>
                    </SelectPeriodView>

                    
                    

                    {
                      selectPeriod ? (
                        <>
                        { isLoadingDatas ? (
                          <LoadingView>
                           <ActivityIndicator size='large' color={StyledTheme.colors.invertedBackground}/>
                         </LoadingView>
                       ) : (
                         <>
                        <DatesView style={{width: props.width}}>
                          <Text style={{color: StyledTheme.colors.fontColor, fontSize: 15, alignSelf: 'center', marginBottom: 10 }}>Selecione o período de análise</Text>
                          <FirstLastDateView  style={{width: props.width, marginTop: -5}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={handleShowFirstDate} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                                <DateButtonView>
                                    <DateButtonText>De: { 
                                      firstWalletDate === firstSelectedDate ? 
                                      (subDays(new Date(firstSelectedDate),1)).toLocaleDateString('pt-br', {timeZone: 'UTC'} )
                                      :
                                      (new Date(firstSelectedDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'} )
                                    }
                                    </DateButtonText>
                                    <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                                </DateButtonView>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={handleShowLastDate} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                                <DateButtonView>
                                    <DateButtonText>Até: { 
                                      lastWalletDate === lastSelectedDate ?
                                      (subDays(new Date(lastSelectedDate),1)).toLocaleDateString('pt-br', {timeZone: 'UTC'} )
                                      :
                                      (new Date(lastSelectedDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'} )}
                                    </DateButtonText>
                                    <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                                </DateButtonView>
                            </TouchableOpacity>
                            
                          </FirstLastDateView>
                          
                          {showSelectorInicial ? (
                            <CalendarPicker
                              minDate={new Date(firstWalletDate)}
                              current={firstSelectedDate === firstWalletDate ? subDays(new Date(firstSelectedDate),1) : new Date(firstSelectedDate)}
                              onChange={(data) => handleSelectFirstDate(data)}
                              id={'inicial'}
                            />
                          )
                        : null}
                        {showSelectorFinal ? (
                          <CalendarPicker
                            maxDate={new Date(lastWalletDate)}
                            current={lastSelectedDate === lastWalletDate ? subDays(new Date(lastSelectedDate),1) : new Date(lastSelectedDate)}
                            onChange={(data) => handleSelectLastDate(data)}
                            id={'final'}
                          />
                        )
                      : null}
                        </DatesView>
                        </>
                       )}
                       </>
                      ) :  null
                    }
                    { showError ? 
                    <Text style={{color: 'red'}}>{errorMessage}</Text>
                    : null }
                    <TouchableOpacity activeOpacity={0.7} onPress={handleSaveChanges}>
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
    
    datas: state.dates,
    dataMaisAntiga: state.dates.dataMaisAntiga,
    dataMaisRecente: state.dates.dataMaisRecente,
    dadosHomePage: state.dadosHomePage,
  });

const mapDispatchToProps = ( dispatch )=> ({
  alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
  pegarCarteirasUsuario: (token) => dispatch(pegarDadosCarteiras(token)),
  pegarDadosHomePage: () => dispatch(pegarDadosHomePage()),
  pegarDadosPosicaoConsolidada: (carteira) => dispatch(pegarDadosPosicaoConsolidada(carteira)),
  logout: () => dispatch(logout())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(FiltroSeletor);