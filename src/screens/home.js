import React, { useState, useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ValueBox from '../components/Home/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartResumo from '../components/Home/LineChartResumo/LineChartResumo';
import PieChartResumo from '../components/Home/PieChartResumo/PieChartResumo';
import Filtro from '../components/Home/FiltroHome';
import Benchmarks from '../components/Home/Benchmarks';

import {
  dados,
    dataHomeBox,

} from '../data/data';

import { dataLineChartHome } from '../components/Home/LineChartResumo/dataLineChartResumo';
import { dataPieChartHome } from '../components/Home/PieChartResumo/dataPieChartResumo';
import SkeletonHome from '../components/Home/Skeleton/SkeletonHome'

import { connect } from 'react-redux';
import BarChartHome from '../components/Home/BarChart';

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
  const [selecionadoPie, setSelecionadoPie] = useState({})


  useEffect(() => {
    
    if (!dadosHomePage.loading && dadosHomePage.data.grafico5) {
      const dadosLineChart = dataLineChartHome(dadosHomePage.data.grafico5);
      // console.log(dadosHomePage.data)
    setDadosLineChart(dadosLineChart)
    const infos = dataPieChartHome(dadosHomePage.data)
    setDadosPie(infos)
    setLoading(dadosHomePage.loading)
    }
  },[dadosHomePage.loading, dadosHomePage.data])

 

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


  useEffect(() => {
    
  }, [])

    return (<View style={{backgroundColor: globalStyles.colors.backGround}}>
      <SafeAreaView >
        {loading ? <SkeletonHome isLoading={loading}/> :
        (<ScrollView contentContainerStyle={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Filtro visible={showModal} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseModal}/>
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.left}>
                <Text style={styles.title}>Portfólio</Text> 
              </View>
              <View>
                <TouchableOpacity style={styles.right} onPress={handleOpenModal}>
                  <Icon name="bars" size={25} color='#FFF'/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.right} onPress={handleCurrency} activeOpacity={1} pressDuration={0.5}>
                <View style={currency ? styles.currencyPress : styles.currency}>
                  <Text style={
                    currency ? {color:globalStyles.colors.firstLayer, fontSize:25, marginRight: 4} :
                    {color:'#FFF', fontSize:25, marginRight: 4} 
                    }>R$</Text>
                </View>
              </TouchableOpacity>
              <View  style={percent ? styles.percentPress : styles.percent}>
                {percent ? <Icon.Button
                  name="percent"
                  color={globalStyles.colors.firstLayer}
                  backgroundColor="#FFF"
                  iconStyle={{
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8}
                  }
                  onPress={handlePercent}
                />
                  :
                <Icon.Button
                  name="percent"
                  color='#FFF'
                  backgroundColor={globalStyles.colors.firstLayer}
                  iconStyle={{
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8
                }}
                  onPress={handlePercent}
                />}
                </View>
            </View>
            <View style={styles.valueBoxContainer}>
                <View style={styles.valueBoxContainerRow}>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[0].value : dataHomeBox[0].percent + ' %'}/>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[1].value : dataHomeBox[1].percent + ' %'}/>
                </View>
                <View style={styles.valueBoxContainerRow}>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[2].value : dataHomeBox[2].percent + ' %'}/>
                  <ValueBox title={dataHomeBox[0].label} value={!percent ? 'R$ ' + dataHomeBox[3].value : dataHomeBox[3].percent + ' %'}/> 
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Benchmarks visible={showBench} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseBench}/>
            </View>
            
                <TouchableOpacity style={styles.right, {marginTop: -3}} onPress={handleOpenBench}>
                <View style={styles.benchmarksButton}>
                  <Text style={{fontSize:20, color:'#FFF', marginRight: 10,}}>Benchmarks</Text>
                  <Icon name="sort-down" size={25} color='#FFF' style={{marginTop:-3}}/>
                  </View>
                </TouchableOpacity>

              <View style={styles.titleNavigationContainer}>
              <Text style={styles.titleNavigation}>Barras</Text>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Performance')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </View>
        <View style={styles.barChartContainer}>
          <BarChartHome />
        </View>
             
            <View style={styles.titleNavigationContainer}>
              <Text style={styles.titleNavigation}>Performance</Text>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Performance')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </View>
            <View style={styles.lineChartContainer}>
              {!dadosHomePage.loading && dadosHomePage.data !== [] ?
                <LineChartResumo
                data={dadosLineChart.data}
                label={dadosLineChart.labels}
                />:
                null}
            </View>
            <View style={styles.titleNavigationContainer}>
              <Text style={styles.titleNavigation}>Carteira</Text>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Carteira')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
                <PieChartResumo
                  infos={dadosPie.infos} 
                  />    
            </View>
            
        </ScrollView>
        )}
        </SafeAreaView>
        </View>
    )
}


const mapStateToProps = state => ({
  stateCarteira: state.dates,
  dadosHomePage: state.dadosHomePage,
  infosCarteiras: state.infosCarteiras
});
  

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        height: 1105,
        width: globalStyles.dimensions.width,
        backgroundColor: globalStyles.colors.backGround,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: globalStyles.colors.fontColor,
        fontSize: 40,
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginVertical: 10, 
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: globalStyles.dimensions.width / 1.15,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

    },
    buttonView:{
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: 7,
      marginBottom: 5
    },

    currency:{
      backgroundColor: globalStyles.colors.firstLayer,
      width: 48,
      alignItems:'center',
      paddingVertical: 2,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius:5
    },
    currencyPress:{
      backgroundColor:'#FFF',
      width: 48,
      paddingVertical: 2,
      alignItems:'center',
      borderBottomLeftRadius: 5,
      borderTopLeftRadius:5
    },
    percent:{
      backgroundColor: globalStyles.colors.firstLayer,
      
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5

    },
    percentPress:{
      backgroundColor:'#FFF',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5

    },
    valueBoxContainer: {
        height: 191,
        width: globalStyles.dimensions.width,
        
    }, 
    valueBoxContainerRow: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginVertical: 5,
    },
    benchmarksButton:{
      marginTop: 10,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: globalStyles.colors.firstLayer,
      padding: 5,
      borderRadius: 10,
      paddingRight: 8
    },
    titleNavigationContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
    titleNavigation: {
      color: globalStyles.colors.fontColor,
      fontSize: 30,
      fontWeight: '300',
    },
    chartContainer: {
        width: globalStyles.dimensions.width,
        height: 393,
        marginTop: 20, 
      },
      lineChartContainer: {
        width: globalStyles.dimensions.width,
        height: 230,
        marginTop: 20, 
      },
      barChartContainer: {
        width: globalStyles.dimensions.width,
        height: 300,
        marginTop: 20, 
      },
      label: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 0.5
    },
    labelText: {
        fontSize: 40,
        color: 'white',
    },
})


