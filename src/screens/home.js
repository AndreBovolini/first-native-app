import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  processColor,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'


import ValueBox from '../components/Home/ValueBox/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartResumo from '../components/Home/LineChartResumo/LineChartResumo';
import LineChartRes from '../components/Home/LineChartResumo/LineChartRes'
import PieChartResumo from '../components/Home/PieChartResumo/PieChartResumo';
import Filtro from '../components/Home/Filtro/FiltroHome';
import Benchmarks from '../components/Home/Benchmarks';
import CardCarousel from '../components/Performance/Portrait/CardCarousel'
import TableRow from '../components/Home/Table/TableRow'
import FiltroSeletor from '../components/Home/Filtro/FiltroSeletor'
import {
  dados,
  dataHomeBox,

} from '../data/data';

import { dataLineChartHome } from '../components/Home/LineChartResumo/dataLineChartResumo';
import { dataPieChartHome } from '../components/Home/PieChartResumo/dataPieChartResumo';
import { dataLineChartRes } from '../components/Home/LineChartResumo/dataLineChartRes'
import SkeletonHome from '../components/Home/Skeleton/SkeletonHome'

import { connect } from 'react-redux';
import BarChartHome from '../components/Home/BarChart';
import { Container, LargeContainer, LeftCard, RightCard, SettingsButton, TitleContainer, Title, CurrencyPress, Currency, ButtonView, ValueBoxContainer, ValueBoxContainerRow, Percent, PercentPress, BenchmarksButton, TitleNavigationContainer, TitleNavigation, ChartContainer, LineChartContainer } from './Home/style';
import { ThemeContext } from 'styled-components/native';
import { CommonActions } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import OneSignal from 'react-native-onesignal';

import { newDataPieChartHome } from '../components/Home/NewPieChartResumo/dataNewPieChartResumo';
import NewPieChartResumo from '../components/Home/NewPieChartResumo';
import { alteraViewMode, logout } from '../store/actions/actions';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import LinearGradient from 'react-native-linear-gradient'

import Orientation, {
  useDeviceOrientationChange, OrientationLocker, PORTRAIT
} from 'react-native-orientation-locker';


import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  withRepeat
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

const Home = ({ infosCarteiras, dadosHomePage, navigation, stateCarteira, logout, alteraViewMode }) => {
  const [percent, setPercent] = useState(false)
  const [currency, setCurrency] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showBench, setShowBench] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dadosLineChart, setDadosLineChart] = useState({})
  const [dadosPie, setDadosPie] = useState({})
  const [dadosNewPie, setDadosNewPie] = useState([])
  const [graficoCarrossel, setGraficoCarrossel] = useState(3)
  const [tipoCarrossel, setTipoCarrossel] = useState('ativo');
  const [accepted, setAccepted] = useState(false)
  const [acceptedProgrammed, setAcceptedProgrammed] = useState(false)
  const [dadosLineChartRes, setDadosLineChartRes] = useState({})
  const [opacity, setOpacity] = useState(0)
  const [periodo, setPeriodo] = useState('')
  const [orientacao, setOrientacao] = useState('portrait')

  useEffect(() => {
      let datas =`${(new Date(stateCarteira.dataInicial)).toLocaleDateString('pt-br', {timeZone: 'UTC'})} - ${(new Date(stateCarteira.dataFinal)).toLocaleDateString('pt-br', {timeZone: 'UTC'})}`
      setPeriodo(datas);
      //console.warn('alterou')
    }, [stateCarteira.dataInicial, stateCarteira.dataFinal])

    // useDeviceOrientationChange((o) => {
     
    //   setOrientacao(o)
    //   console.log(orientacao)
    // });


        Orientation.lockToPortrait()
  



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

  const dadosTable = {
    table1: [
      {
        label: 'Carteira',
        value: {
          'Dia': -0.11,
          'Mês': 0.94,
          'Ano': 0.72,
          '12_m': 10.50,
          'Período': 13.87
        },
      },
      {
        label: 'CDI',
        value: {
          'Dia': -0.01,
          'Mês': 0.21,
          'Ano': 0.69,
          '12_m': 2.13,
          'Período': 10.20
        },
      },
      {
        label: 'IBOV',
        value: {
          'Dia': -0.98,
          'Mês': 1.94,
          'Ano': -0.10,
          '12_m': 50.73,
          'Período': 32.84
        },
      },
    ],
    table2: [
      {
        label: 'Carteira',
        value: {
          'Mês': 0.94,
        },
      },
      {
        label: 'CDI',
        value: {
          'Mês': 0.21,
        },
      },
      {
        label: 'IBOV',
        value: {
          'Mês': 1.94,
        },
      },
    ],
    table3: [
      {
        label: 'Carteira',
        value: {
          'Ano': 0.72,
        },
      },
      {
        label: 'CDI',
        value: {
          'Ano': 0.69,
        },
      },
      {
        label: 'IBOV',
        value: {
          'Ano': -0.10,
        },
      },
    ],
    table4: [
      {
        label: 'Dia',
        value: {
          'Carteira': -0.11,
          'CDI': 0.01,
          'IBOV': -0.98
        }
      },
      {
        label: 'Mês',
        value: {
          'Carteira': 0.94,
          'CDI': 0.21,
          'IBOV': 1.94
        }
      },
      {
        label: 'Ano',
        value: {
          'Carteira': 0.72,
          'CDI': 0.69,
          'IBOV': -0.10
        }
      },
      {
        label: '12_m',
        value: {
          'Carteira': 10.50,
          'CDI': 2.13,
          'IBOV': 50.73
        }
      },
      {
        label: 'No período',
        value: {
          'Carteira': 13.87,
          'CDI': 10.20,
          'IBOV': 32.84
        }
      },
    ],
    table5: [
      {
        label: 'Dia',
        value: {
          'Carteira': -0.11,
          'CDI': 0.01,
          'IBOV': -0.98
        }
      },
      {
        label: 'Mês',
        value: {
          'Carteira': 0.94,
          'CDI': 0.21,
          'IBOV': 1.94
        }
      },
      {
        label: 'Ano',
        value: {
          'Carteira': 0.72,
          'CDI': 0.69,
          'IBOV': -0.10
        }
      },
      {
        label: '12_m',
        value: {
          'Carteira': 10.50,
          'CDI': 2.13,
          'IBOV': 50.73
        }
      },
      {
        label: 'No período',
        value: {
          'Carteira': 13.87,
          'CDI': 10.20,
          'IBOV': 32.84
        }
      },
    ]
  }

  // useEffect(() => {
  //   OneSignal.setAppId('9c34a82a-2fc6-4d7a-bb50-10512cbba842');
  //   OneSignal.sendTags({
  //     "user_teste": acceptedProgrammed ? 'accepted' : null,
  //     "user_type": accepted ? 'acceptedNotify' : null,
  //   })
  //   OneSignal.setLocationShared(false);
  //   OneSignal.promptForPushNotificationsWithUserResponse(response => {
  //     console.log("Prompt response:", response);
  //   });

  //   OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  //     console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  //     let notification = notificationReceivedEvent.getNotification();
  //     console.log("notification: ", notification);
  //     const data = notification.additionalData
  //     console.log("additionalData: ", data);
  //     const button1 = {
  //       text: "Cancel",
  //       onPress: () => { notificationReceivedEvent.complete(); },
  //       style: "cancel"
  //     };
  //     const button2 = { text: "Complete", onPress: () => { notificationReceivedEvent.complete(notification); } };
  //     Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
  //   });

  //   OneSignal.setNotificationOpenedHandler(notification => {
  //     console.log("OneSignal: notification opened:", notification);
  //     navigation.navigate('Home')
  //   });

  // }, [acceptedProgrammed, accepted])


  // useEffect(async () => {
  //   let acceptPush = await AsyncStorage.getItem('Push');
  //   let acceptPushProgrammed = await AsyncStorage.getItem('PushProgramada');
  //   //console.warn(acceptPush, acceptPushProgrammed)
  //   setAccepted(acceptPush === 'true' ? true : false);
  //   setAcceptedProgrammed(acceptPushProgrammed === 'true' ? true : false);
  // }, [])

  const userLogout = () => {
    logout()
  }


  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform : [
                { translateX: positionX.value},
                { translateY: positionY.value }
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx) {
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {

        }
    })



  // useEffect(
  //   () => {
  //   if (Platform.OS === 'ios')  {
  //     navigation.addListener('beforeRemove', (e) => {
  //       console.log(e.data.action)
  //       const unsubscribe = navigation.addListener('focus', () => {
  //         // do something
  //       });
  //       if (e.data.action.payload.name === 'Login' ) {
  //         navigation.dispatch(e.data.action);
  //         return unsubscribe;
  //        } else if ( e.data.action.payload.name === 'AfterLogin') {
  //          console.log('teste after')
  //        return
  //       } else {
  //       e.preventDefault();
  
  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         'Você deseja sair do app?',
  //         'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //         [
  //           { text: "Manter", style: 'cancel', onPress: () => {} },
  //           { text: "Logout", style: 'cancel', onPress: () => {
  //             AsyncStorage.removeItem('token');
  //             navigation.dispatch(
  //               CommonActions.navigate({
  //                 name: 'Login',
  //                 params: {
  //                   credentials: false,
  //                 },
  //               })
  //             );
  //         } },
  //           {
  //             text: 'Sair',
  //             style: 'destructive',
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => RNExitApp.exitApp(),
  //           },
  //         ]
  //       )
  //       }
  //     })
  //   }
  // }
  //   ,
  //   [navigation]
  // );

  
  
  useEffect(() => {
    if (!dadosHomePage.loading && dadosHomePage.data.grafico5) {
      const dadosLineChart = dataLineChartHome(dadosHomePage.data.grafico5, StyledTheme.colors.invertedBackground);
      setDadosLineChart(dadosLineChart)
      const infos = dataPieChartHome(dadosHomePage.data, StyledTheme.colors.invertedBackground)
      const optionEcharts = newDataPieChartHome(dadosHomePage.data, StyledTheme)
      //(optionEcharts)
      setDadosPie(infos)
      setDadosNewPie(optionEcharts)
      const dadosLineChartRes = dataLineChartRes(dadosHomePage.data)
      setDadosLineChartRes(dadosLineChartRes)
      setLoading(dadosHomePage.loading)
      setTimeout(()=> {
        setOpacity(1)
      }, 1000)
    }
  }, [dadosHomePage.loading, dadosHomePage.data, StyledTheme])

  //console.log('AAAA ', dadosLineChartRes)

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("O que você deseja fazer?", '', [
  //       {
  //         text: "Manter",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       {
  //         text: "Sair",
  //         onPress: () => BackHandler.exitApp()
  //       },
  //       {
  //         text: 'Fazer Logoff',
  //         onPress: () => {
  //           AsyncStorage.removeItem('token');
  //           navigation.navigate('Login', {
  //             credentials: false
  //           })
  //         }
  //       }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, [navigation])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true
    })
}, [])


  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handlePercent = () => {
    setPercent(true)
    setCurrency(false)
  }
  const handleCurrency = () => {
    setCurrency(true)
    setPercent(false)
  }

  const handleChangeFormat = () => {
    setCurrency(!currency)
    setPercent(!percent)
    if(!currency){
      currencyMode()
    }else{
      percentMode()
    }
  }

  function currencyMode() {
    animation.value = 0

  }

  function percentMode() {
    animation.value = 45
  }

  const handleCloseModal = () => {
    setShowModal(false)

  }

  const handleOpenBench = () => {
    setShowBench(true)
  }

  const handleCloseBench = () => {
    setShowBench(false)

  }

  const handleGetIndex = (index) => {
    setGraficoCarrossel(index + 1)
  }

  const animationSwitch = useSharedValue(stateCarteira.mode === 'dark' ? 44 : 0)

    const animatedSwitchStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withTiming(animationSwitch.value, {
              duration: 400
            })
          }
        ]
      }
    })

    function nightSwitchMode() {
      animationSwitch.value = 44

    }

    function daySwitchMode() {
      animationSwitch.value = 0
    }


  const handleAlteraMode = () => {
    if (stateCarteira.mode === 'dark') {
      alteraViewMode('light')
      daySwitchMode()
      AsyncStorage.setItem('mode', 'light')
    } else {
      alteraViewMode('dark')
      nightSwitchMode()
      AsyncStorage.setItem('mode', 'dark')
    }
  }

  const animationSkeleton = useSharedValue(-200)

    const animatedSkeletonStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withRepeat(withTiming(animationSkeleton.value, {
              duration: 600
            }),
            15
            )
          }
        ]
      }
    })

    useEffect(() => {
      animationSkeleton.value = 200
    }, [])

  

  async function handleAccept() {
    //(accepted)
    await AsyncStorage.setItem('Push', (!accepted ? 'true' : 'false'))
    setAccepted(!accepted)
    if (accepted === true) {
      setAcceptedProgrammed(false)
      await AsyncStorage.setItem('PushProgramada', ('false'))
    }
  }

  // async function handleAcceptProgrammed() {
  //   await AsyncStorage.setItem('PushProgramada', (!acceptedProgrammed ? 'true' : 'false'))
  //   setAcceptedProgrammed(!acceptedProgrammed)
  // }

  // console.log('INDICE ' + index)
  return (
    
    <LargeContainer>
    
      <SafeAreaView >
      
      <FiltroSeletor 
        visible={showModal} 
        width={globalStyles.dimensions.width}
        buttonAction={handleCloseModal}
        userLogout={userLogout}
      /> 

      {/*}
      <Filtro visible={showModal} 
            accepted={accepted}
            acceptedProgrammed={acceptedProgrammed}
            handleAcceptProgrammed={handleAcceptProgrammed} 
            handleAccept={handleAccept} minHeight={250} 
            width={globalStyles.dimensions.width} buttonAction={handleCloseModal} 
            
            />
      */}
        {dadosHomePage.loading || !dadosHomePage.data.grafico5 ? <SkeletonHome isLoading={true}/> :
        (<ScrollView contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center', height: 1730, width: globalStyles.dimensions.width,
        backgroundColor: StyledTheme.colors.background}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            
            </View>
            <TitleContainer>
              <LeftCard>
                <Text style={{color: StyledTheme.colors.fontColor}}>{periodo}</Text>
                <Title>Portfólio</Title>
              </LeftCard>
              <View>
                {/* <RightCard onPress={handleOpenModal}>
                  <Icon name="bars" size={25} color={StyledTheme.colors.invertedBackground} />
                </RightCard> */}
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={ stateCarteira.mode === 'dark' ?
                  ['#f7c81b', '#f7821b', '#f01fb8'] : ['#eb00f7', '#61038a', '#180475']
                } style={{
                      height: 25,
                      width: 70,
                      borderRadius: 15,
                    }}>
                <TouchableOpacity style={{
                      backgroundColor: 'transparent',
                      height: 25,
                      width: 70,
                      borderRadius: 15,
                    }}
                    onPress={handleAlteraMode}
                    >
                      {/* { stateCarteira.mode === 'dark' ?
                      <View style={{marginLeft: 8}}>
                        <Text style={{color: '#FFF', fontSize: 10, textAlign: 'center', fontWeight: '700'}}>Day {'\n'} Mode</Text>
                      </View> : null
                      } */}
                      <Animated.View style={[{
                        backgroundColor:'#FFF',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        margin: 2.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }, animatedSwitchStyles]}>
                        { stateCarteira.mode === 'dark' ? 
                        <Ionicons name="sunny" size={15} color={'#f7821b'} /> :
                        <Ionicons name="moon-outline" size={15} color={'#61038a'} />
                    }
                      </Animated.View>
                      {/* { stateCarteira.mode === 'light' ?
                      <View style={{marginRight: 8}}>
                        <Text style={{color: '#FFF', fontSize: 10, textAlign: 'center', fontWeight: '700'}}>Night {'\n'} Mode</Text>
                      </View> : null
                      } */}
                    </TouchableOpacity>
                    </LinearGradient>
              </View>
            </TitleContainer>
            <ButtonView>
              {/*
              <RightCard onPress={handleCurrency} activeOpacity={1} pressDuration={0.5}>
                {
                  currency ? (
                    <CurrencyPress>
                      <Text style={{ color: StyledTheme.colors.firstLayer, fontSize: 25, marginRight: 4 }
                      }>R$</Text>
                    </CurrencyPress>
                  ) : (
                    <Currency>
                      <Text style={
                        { color: StyledTheme.colors.invertedBackground, fontSize: 25, marginRight: 4 }
                      }>R$</Text>
                    </Currency>
                  )
                }


              </RightCard>

              {
                percent ? (
                  <PercentPress>
                    <Icon.Button
                      name="percent"
                      color={StyledTheme.colors.firstLayer}
                      backgroundColor={StyledTheme.colors.invertedBackground}
                      iconStyle={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginLeft: 8
                      }
                      }
                      onPress={handlePercent}
                    />
                  </PercentPress>
                ) : (
                  <Percent>
                    <Icon.Button
                      name="percent"
                      color={StyledTheme.colors.fontColor}
                      backgroundColor={StyledTheme.colors.firstLayer}
                      iconStyle={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginLeft: 8
                      }}
                      onPress={handlePercent}
                    />
                  </Percent>
                )
              }
            */}
              <TouchableOpacity style={{
                backgroundColor: !percent ? (stateCarteira.mode === 'dark' ? '#FFF' : StyledTheme.colors.firstLayer) : '#2A0DB8',
                height: 25,
                width: 70,
                borderRadius: 15,
              }}
                onPress={handleChangeFormat}
              >
                <Animated.View style={[{
                  backgroundColor: !percent ? '#000' : '#FFF' ,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  margin: 2.5,
                }, animatedStyles]}>
                {!percent ? 
                <Text style={{color:'#FFF', fontSize:14, marginLeft:1}}>R$</Text>:
                <Text style={{color:'#000', fontSize:18, fontWeight:'bold', marginTop: -2, marginLeft: -1.5}}> %</Text>
               }

                </Animated.View>

              </TouchableOpacity>
            </ButtonView>
            <ValueBoxContainer>
              <ValueBoxContainerRow>
                <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[0].value : dataHomeBox[0].percent + ' %'} />
                <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[1].value : dataHomeBox[1].percent + ' %'} />
              </ValueBoxContainerRow>
              <ValueBoxContainerRow>
                <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[2].value : dataHomeBox[2].percent + ' %'} />
                <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[3].value : dataHomeBox[3].percent + ' %'} />
              </ValueBoxContainerRow>
            </ValueBoxContainer>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Benchmarks visible={showBench} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseBench} />
            </View>

            

            <RightCard style={{ marginTop: -3 }} onPress={handleOpenBench}>
              <BenchmarksButton>
                <Text style={{ fontSize: 20, color: '#FFF', marginRight: 10, }}>Benchmarks</Text>
                <Icon name="sort-down" size={25} color='#FFF' style={{ marginTop: -3 }} />
              </BenchmarksButton>
            </RightCard>

            <TitleNavigationContainer style={{ marginTop: -10 }}>
              <CardCarousel handleGetIndex={handleGetIndex} />

            </TitleNavigationContainer>
            {tipoCarrossel &&
              <TableRow data={dadosTable['table' + graficoCarrossel]} graficoCarrossel={graficoCarrossel} />}
            <TitleNavigationContainer>
              <TitleNavigation>Performance</TitleNavigation>
              <TouchableOpacity style={{ marginTop: 15, marginLeft: 15 }} onPress={() => navigation.navigate('Performance')}>
                <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor} />
              </TouchableOpacity>
            </TitleNavigationContainer>
            
            <LineChartContainer style={{opacity: opacity}}>
              {!dadosHomePage.loading && Object.keys(dadosLineChartRes).length !== 0 ?
                <LineChartRes
                  data={dadosLineChartRes.dataSets}
                  labels={dadosLineChartRes.labels}
                  ativos={dadosLineChartRes.keysAtivos}

                />
                : null}
              {/* {!dadosHomePage.loading && dadosHomePage.data !== [] ?
                <LineChartResumo
                  data={dadosLineChart.data}
                  label={dadosLineChart.labels}
                /> :
                null} */}
            </LineChartContainer>
            {/* <View>
              {!dadosHomePage.loading && Object.keys(dadosLineChartRes).length !== 0?
                <LineChartRes
                  data={dadosLineChartRes.dataSets}
                  labels={dadosLineChartRes.labels}
                  ativos={dadosLineChartRes.keysAtivos}
                  
                />
                : null}
            </View> */}

            <TitleNavigationContainer>

              <TitleNavigation>Carteira</TitleNavigation>
              <TouchableOpacity style={{ marginTop: 15, marginLeft: 15 }} onPress={() => navigation.navigate('Carteira')}>
                <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor} />
              </TouchableOpacity>
            </TitleNavigationContainer>
            {/*
            <ChartContainer>
              <PieChartResumo
                infos={dadosPie.infos}
              />
            </ChartContainer>
            */}

            <ChartContainer>
              {dadosNewPie !== {} ?
                <NewPieChartResumo data={dadosNewPie} />
                : null}
            </ChartContainer>


           
          </ScrollView>
          )}
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[
                animatedButtonStyle, {
                    position: "absolute",
                    bottom: 113,
                    right: 22,
                }
            ]}>
                <ButtonAnimated onPress={handleOpenModal}
                style={[{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
              }, {backgroundColor: '#2A0DB8'}]}
                >
                    <Icon name="filter" size={25} color={StyledTheme.colors.invertedBackground} />
                </ButtonAnimated>
            </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
      
    </LargeContainer>
   
  )
}


const mapStateToProps = state => ({
  stateCarteira: state.dates,
  dadosHomePage: state.dadosHomePage,
  infosCarteiras: state.infosCarteiras
});

const mapDispatchToProps = ( dispatch )=> ({
  logout : () => dispatch(logout()),
  alteraViewMode: (mode) => dispatch(alteraViewMode(mode)),
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Home);