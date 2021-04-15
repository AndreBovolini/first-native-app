import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  processColor,
  View,
} from 'react-native';

import ValueBox from '../components/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartRender from '../components/LineChart';
import SelectPeriod from '../components/SelectPeriod';
import TableRow from '../components/TableRow';

import {
    dataHomeBox,
    dados,
    resposta1
} from '../data/data';


const Performance = ({navigation}) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
  const [selecionadoLine, setSelecionadoLine] = useState({})
  const [inputValue, setInputValue] = useState('');
  const [inputMarker, setInputMarker] = useState('');
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
  const [anoSelecionado, setAnoSelecionado] = useState('2017');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Tudo');
  const [indiceAno, setIndiceAno] = useState(0);

    function handleSelecionaAno(ano) {
        setAnoSelecionado(ano);
        let indice = anos.indexOf(ano);
        setIndiceAno(indice);
    }

    function handleSelecionaPeriodo(periodo) {
      setPeriodoSelecionado(periodo)
  }

  const alteraDataPTParaEN = data => {
    data = data.split('/');
    data = data[2] + '-' + data[1] + '-' + data[0];
    return data;
  };

  function oneMonthPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*31);
    return date >= dataAtual
  }

  function threeMonthPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*92);
    return date >= dataAtual
  }

  function oneYearPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*365);
    return date >= dataAtual
  }

  function thisYear(value) {
    let year =  value.data.slice(-4);
    return year === periodoSelecionado
  }


  useEffect(() => {

    let filteredData = [];
    
    switch (periodoSelecionado) {
      case '1m':
        filteredData = resposta1.resposta['tab-p1'].linha.filter(oneMonthPeriod);
      break;
      case '3m':
        filteredData = resposta1.resposta['tab-p1'].linha.filter(threeMonthPeriod);
      break;
      case '2021':
        filteredData = resposta1.resposta['tab-p1'].linha.filter(thisYear);
      break;
      case '1 year':
        filteredData = resposta1.resposta['tab-p1'].linha.filter(oneYearPeriod);
        break;
      case 'Tudo':
        filteredData = resposta1.resposta['tab-p1'].linha;
      break;
    };

    if (filteredData !== []) {
    const valores1 = filteredData.map((el, i) => {
        return {
            y: parseFloat(el.ibov),
            x: parseFloat(i),
            marker: 'IBOV: ' + parseFloat(el.ibov, 3) + ' %' + ' PETR4: ' + parseFloat(el.petr4, 3) + ' %',
        }
    });
    const valores2 = filteredData.map((el, i) => {
        return {
            y: parseFloat(el.cdi),
            x: parseFloat(i),
            marker: 'IBOV: ' + parseFloat(el.ibov, 3) + ' %' + ' CDI: ' + parseFloat(el.cdi, 3) + ' %',
        }
    });

    setValues1(valores1);
    setValues2(valores2);
  };
  }, [periodoSelecionado])

  const periodos = ['1m', '3m', '2021', '1 year', 'Tudo'];
  const anos = ['2017', '2018', '2019', '2020', '2021'];
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const greenBlue = 'rgb(26, 182, 151)';
  const petrel = 'rgb(59, 145, 153)';

  function handleSelectLine(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      setSelectedEvent(null);
      setSelecionadoLine({});
    } else {
      setSelectedEvent(JSON.stringify(entry));
      setSelecionadoLine(entry);
    }

    console.log(event.nativeEvent);
  }

  const data = {
    dataSets: [
      {
        values: values1,
        label: 'Carteira',
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
          drawValues: false,
          lineWidth: 2,
          drawCircles: false,
          circleColor: processColor(petrel),
          drawCircleHole: false,
          circleRadius: 5,
          highlightColor: processColor('transparent'),
          color: processColor(petrel),
          valueTextSize: 15,
        },
      },
    ],
  };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Performance</Text>
            <View style={styles.containerSelector}>
            {periodos.map((el, i) => {
                return (
                  <SelectPeriod ano={el} key={i} selecionado={periodoSelecionado} handleSelecionado={handleSelecionaPeriodo}/>
                )
            })}
            </View>
            <View style={styles.chartContainer}>
                <LineChartRender
                handleSelect={handleSelectLine}
                selectedEvent={selectedEvent}
                selecionado={selecionadoLine.data ? selecionadoLine.data.marker : null}
                data={data}
                />
            </View>
            <View style={styles.containerSelector}>
      {anos.map((el, i) => {
          return (
            <SelectPeriod ano={el} key={i} selecionado={anoSelecionado} handleSelecionado={handleSelecionaAno}/>
          )
      })}
        
      </View>
      <ScrollView style={styles.containerTable} nestedScrollEnabled = {true}>
        <View style={styles.containerHeader}>
        <Text style={styles.textoHeader}>Período</Text>
          <Text style={styles.textoHeader}>Carteira</Text>
          <Text style={styles.textoHeader}>IPCADP</Text>
          <Text style={styles.textoHeader}>%IPCADP</Text>
        </View>
        {dados[indiceAno].response.map((el, i) => {
            return (
                <TableRow key={i} index={i} col1={meses[i]} col2={el.carteira} col3={el.IPCADP} col4={el.IPCADPP}/>
            )
        })}
      </ScrollView>
        </ScrollView>
    )
}
export default Performance;

const styles = StyleSheet.create({
    container: {
        height: globalStyles.dimensions.height *2,
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
        marginLeft: 10,
    },
    valueBoxContainer: {
        height: globalStyles.dimensions.height / 3.6,
        width: globalStyles.dimensions.width,
    }, 
    valueBoxContainerRow: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginVertical: 5
    },
    chartContainer: {
        width: globalStyles.dimensions.width,
        height: globalStyles.dimensions.height / 1.6,
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
    containerSelector: {
        height: 30,
        width: (globalStyles.dimensions.width *4)/5,
        marginRight: globalStyles.dimensions.width /5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      alignItems: 'center',
    },
    containerTable: {
      height: 200,
      marginVertical: 20,
      marginHorizontal: 0,
      backgroundColor: '#161616',
      borderRadius: 10,
    },
    containerHeader: {
      flexDirection: 'row',
      height: 35,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#C4C4C4',
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 5,
    },
    textoHeader: {
      fontSize: 20,
      fontWeight: '700',
      color: '#161616',
    },
})
