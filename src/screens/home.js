import React, { useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  processColor,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ValueBox from '../components/valueBox';
import globalStyles from '../styles/globalStyles';
// import setTimeOut from 'timers'

import LineChartResumo from '../components/LineChartResumo';
import OutroPie from '../components/PieChart';
import Filtro from '../components/FiltroHome';
import Benchmarks from '../components/Benchmarks'

import {
    dataHomeBox,
    resposta1
} from '../data/data';
import { useRoute } from '@react-navigation/native';
import SkeletonHome from '../components/SkeletonHome'

export const Home = ({navigation}) => {
  const [showAlteraCarteira, setShowAlteraCarteira] = useState(false);
  const [percent, setPercent] = useState(true)
  const [currency, setCurrency] = useState (false)
  const [showModal, setShowModal] = useState(false);
  const [showBench, setShowBench] = useState(false);
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selecionadoLine, setSelecionadoLine] = useState({})
  const [] = useState('');
  const [] = useState('');
  const [values1, setValues1] = useState([
    {
      y: 650,
      x: 0,
      marker: 'BDS: 650 pts',
    },
    {
      y: 770,
      x: 1,
      marker: 'BDS: 770 pts',
    },
    {
      y: 760,
      x: 2,
      marker: 'BDS: 760 pts',
    },
    {
      y: 740,
      x: 3,
      marker: 'BDS: 740 pts',
    },
    {
      y: 760,
      x: 4,
      marker: 'BDS: 760 pts',
    },
    {
      y: 650,
      x: 5,
      marker: 'BDS: 650 pts',
    },
  ]);
  const [values2, setValues2] = useState([
    {
      y: 350,
      x: 0,
      marker: 'Vitality: 350 pts',
    },
    {
      y: 470,
      x: 1,
      marker: 'Vitality: 470 pts',
    },
    {
      y: 500,
      x: 2,
      marker: 'Vitality: 460 pts',
    },
    {
      y: 600,
      x: 3,
      marker: 'Vitality: 440 pts',
    },
    {
      y: 700,
      x: 4,
      marker: 'Vitality: 460 pts',
    },
    {
      y: 350,
      x: 5,
      marker: 'Vitality: 350 pts',
    },
  ]);
  const [labels, setLabels] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selecionadoPie, setSelecionadoPie] = useState({})




  const greenBlue = 'rgb(26, 182, 151)';

  useEffect(() => {
    const valores1 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.ibov),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.ibov, 3) + '%',
        }
    });
    const valores2 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.baseLine),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.ibov, 3) + '%',
        }
    });
    const linelabes = resposta1.resposta["tab-p1"].linha.map((el) => {
        return el.data
    })
    setValues1(valores1);
    setValues2(valores2);
    setLabels(linelabes);
  }, [])


  function handleSelectLine(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      setSelectedEvent(null);
      setSelecionadoLine({});
    } else {
      setSelectedEvent(JSON.stringify(entry));
      setSelecionadoLine(entry);
    }
  }

  function handleSelectPie(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      setSelectedEntry(null)
    } else {
      setSelectedEntry(JSON.stringify(entry))
      setSelecionadoPie(entry)
    }
};

  const data = {
    dataSets: [
      {
        values: values1,
        label: 'Certeira',
        config: {
          mode: 'CUBIC_BEZIER',
          drawValues: false,
          lineWidth: 2,
          drawCircles: false,
          circleColor: processColor(greenBlue),
          drawCircleHole: false,
          circleRadius: 5,
          highlightColor: processColor('transparent'),
          color: processColor(greenBlue),

          valueTextSize: 15,
        },
      },

      {
        values: values2,
        label: 'CDI',
        config: {
          mode: 'CUBIC_BEZIER',
          enableDashedLine: true,
          drawValues: false,
          lineWidth: 0.5,
          dashedLine: {
            lineLength: 10,
            spaceLength: 10
          },
          drawCircles: false,
          circleColor: processColor('white'),
          drawCircleHole: false,
          circleRadius: 5,
          highlightColor: processColor('transparent'),
          color: processColor('white'),
          valueTextSize: 15,
        },
      },
    ],
  };


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
  }, []);

  
  setTimeout(() => {setLoading(false)}, 3000)

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

  

  const benchmarks = [
    {   label: 'CDI',
        isSelected: true,
        isFavorite: true,   
    },
    {   label: 'IBOVESPA',
        isSelected: false,
        isFavorite: false   
    },
    {   label: 'IPCA',
        isSelected: false,
        isFavorite: false,
    },
    {   label: 'IGPM',
        isSelected: false,
        isFavorite: false

    }]


  
    return (
      <View>
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
              {/* <TouchableOpacity style={styles.right} onPress={handlePercent}>
                <View  style={percent ? styles.percentPress : styles.percent}>
                  <Text percent style={percent ? 
                  {color:'#000', fontSize:25, marginLeft: 4} :
                  {color:'#FFF', fontSize:25, marginLeft: 4}
                  }>
                   R$
                  </Text>
                  { percent ? <Icon name="bars" size={25} color={globalStyles.colors.firstLayer} />
                  :
                  <Icon name="percent" size={25} color='#FFF' />}
                </View>

              </TouchableOpacity> */}
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
              <Benchmarks visible={showBench} minHeight={200} width={globalStyles.dimensions.width} buttonAction={handleCloseBench} benchmarks={benchmarks}/>
            </View>
            <View style={styles.benchmarksButton}>
              <Text style={{fontSize:20, color:'#FFF', marginRight: 10}}>Benchmarks</Text>
                <TouchableOpacity style={styles.right, {marginTop: -3}} onPress={handleOpenBench}>
                  <Icon name="sort-down" size={25} color='#FFF'/>
                </TouchableOpacity>
              </View>
            <View style={styles.titleNavigationContainer}>
              <Text style={styles.titleNavigation}>Performance</Text>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Performance')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </View>
            <View style={styles.lineChartContainer}>
                <LineChartResumo
                handleSelect={handleSelectLine}
                selectedEvent={selectedEvent}
                selecionado={selecionadoLine.data ? selecionadoLine.data.marker : null}
                data={data}
                label={labels}
                />
            </View>
            <View style={styles.titleNavigationContainer}>
              <Text style={styles.titleNavigation}>Carteira</Text>
              <TouchableOpacity style={{marginTop: 15, marginLeft: 15}} onPress={() => navigation.navigate('Carteira')}>
               <Icon name="chevron-right" size={20} color={globalStyles.colors.fontColor}/>
              </TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
                <OutroPie handleSelect={handleSelectPie} 
                selectedEntry={selectedEntry}
                valorCentro={selecionadoPie.data ? selecionadoPie.data.label :  ''}
                />      
            </View>
            
        </ScrollView>
        )}
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        height: 1080,
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
