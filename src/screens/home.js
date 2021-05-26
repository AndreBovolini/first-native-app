import React, { useState, useEffect, useContext} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'

import ValueBox from '../components/Home/ValueBox/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartResumo from '../components/Home/LineChartResumo/LineChartResumo';
import PieChartResumo from '../components/Home/PieChartResumo/PieChartResumo';
import Filtro from '../components/Home/Filtro/FiltroHome';
import Benchmarks from '../components/Home/Benchmarks';
import CardCarousel from '../components/Performance/Portrait/CardCarousel'
import TableRow from '../components/Home/Table/TableRow'

import {
  dados,
    dataHomeBox,

} from '../data/data';

import { dataLineChartHome } from '../components/Home/LineChartResumo/dataLineChartResumo';
import { dataPieChartHome } from '../components/Home/PieChartResumo/dataPieChartResumo';
import SkeletonHome from '../components/Home/Skeleton/SkeletonHome'

import { connect } from 'react-redux';
import BarChartHome from '../components/Home/BarChart';
import { Container, LargeContainer, LeftCard, RightCard, TitleContainer, Title, CurrencyPress, Currency, ButtonView, ValueBoxContainer, ValueBoxContainerRow, Percent, PercentPress, BenchmarksButton, TitleNavigationContainer, TitleNavigation, ChartContainer, LineChartContainer } from './Home/style';
import { ThemeContext } from 'styled-components/native';

export const Home = ({infosCarteiras, dadosHomePage, navigation, stateCarteira}) => {
  const [percent, setPercent] = useState(true)
  const [currency, setCurrency] = useState (false)
  const [showModal, setShowModal] = useState(false);
  const [showBench, setShowBench] = useState(false);
  const [loading, setLoading] = useState(true);
  const [] = useState('');
  const [] = useState('');
  const [dadosLineChart, setDadosLineChart] = useState({})
  const [dadosPie, setDadosPie] = useState({})
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selecionadoPie, setSelecionadoPie] = useState({});
  const [graficoCarrossel, setGraficoCarrossel] = useState(3)
  const [tipoCarrossel, setTipoCarrossel] = useState('ativo')

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

  const StyledTheme = useContext(ThemeContext)

  useEffect(() => {
    
    if (!dadosHomePage.loading && dadosHomePage.data.grafico5) {
      const dadosLineChart = dataLineChartHome(dadosHomePage.data.grafico5, StyledTheme.colors.invertedBackground);
     
    setDadosLineChart(dadosLineChart)
    const infos = dataPieChartHome(dadosHomePage.data, StyledTheme.colors.invertedBackground)
    setDadosPie(infos)
    setLoading(dadosHomePage.loading)
    }
  },[dadosHomePage.loading, dadosHomePage.data, StyledTheme])


  useEffect(() => {
    const backAction = () => {
      Alert.alert("O que você deseja fazer?",'', [
        {
          text: "Manter",
          onPress: () => null,
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: () => BackHandler.exitApp() 
        },
        {
          text: 'Fazer Logoff',
          onPress: () => {
            AsyncStorage.removeItem('token');
            navigation.navigate('Login', {
              credentials: false
            })
        }
      }
      ]);
      return true;
    };
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
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
    setGraficoCarrossel(index+1)
  }

  // console.log('INDICE ' + index)
    return (
    <LargeContainer>
      <SafeAreaView >
        {loading ? <SkeletonHome isLoading={loading}/> :
        (<ScrollView contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center', height: 1650, width: globalStyles.dimensions.width,
        backgroundColor: StyledTheme.colors.background}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Filtro visible={showModal} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseModal}/>
            </View>
            <TitleContainer>
              <LeftCard>
                <Title>Portfólio</Title> 
              </LeftCard>
              <View>
                <RightCard onPress={handleOpenModal}>
                  <Icon name="bars" size={25} color={StyledTheme.colors.invertedBackground}/>
                </RightCard>
              </View>
            </TitleContainer>
            <ButtonView>
              <RightCard onPress={handleCurrency} activeOpacity={1} pressDuration={0.5}>
                {
                  currency ? (
                    <CurrencyPress>
                      <Text style={{color: StyledTheme.colors.firstLayer, fontSize:25, marginRight: 4}
                      }>R$</Text>
                    </CurrencyPress>
                  ) : (
                    <Currency>
                      <Text style={
                        {color: StyledTheme.colors.invertedBackground, fontSize:25, marginRight: 4} 
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
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8}
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
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8
                }}
                  onPress={handlePercent}
                />
                  </Percent>
                )
              }
            </ButtonView>
            <ValueBoxContainer>
                <ValueBoxContainerRow>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[0].value : dataHomeBox[0].percent + ' %'}/>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[1].value : dataHomeBox[1].percent + ' %'}/>
                </ValueBoxContainerRow>
                <ValueBoxContainerRow>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[2].value : dataHomeBox[2].percent + ' %'}/>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[3].value : dataHomeBox[3].percent + ' %'}/> 
                </ValueBoxContainerRow>
            </ValueBoxContainer>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Benchmarks visible={showBench} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseBench}/>
            </View>
            
                <RightCard style={{marginTop: -3}} onPress={handleOpenBench}>
                <BenchmarksButton>
                  <Text style={{fontSize:20, color:'#FFF', marginRight: 10,}}>Benchmarks</Text>
                  <Icon name="sort-down" size={25} color='#FFF' style={{marginTop:-3}}/>
                  </BenchmarksButton>
                </RightCard>
            
            <TitleNavigationContainer>
              <CardCarousel handleGetIndex={handleGetIndex}/>
              
            </TitleNavigationContainer>
            { tipoCarrossel &&
            <TableRow data={dadosTable['table'+graficoCarrossel]} graficoCarrossel={graficoCarrossel}/> }
            <TitleNavigationContainer>
              <TitleNavigation>Performance</TitleNavigation>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Performance')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </TitleNavigationContainer>
            <LineChartContainer>
              {!dadosHomePage.loading && dadosHomePage.data !== [] ?
                <LineChartResumo
                data={dadosLineChart.data}
                label={dadosLineChart.labels}
                />:
                null}
            </LineChartContainer>
            <TitleNavigationContainer>
            
              <TitleNavigation>Carteira</TitleNavigation>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Carteira')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </TitleNavigationContainer>
            <ChartContainer>
                <PieChartResumo
                  infos={dadosPie.infos} 
                  />    
            </ChartContainer>
            
            
        </ScrollView>
        )}
        </SafeAreaView>
      </LargeContainer>
    )
}


const mapStateToProps = state => ({
  stateCarteira: state.dates,
  dadosHomePage: state.dadosHomePage,
  infosCarteiras: state.infosCarteiras
});
  

export default connect(mapStateToProps)(Home);


