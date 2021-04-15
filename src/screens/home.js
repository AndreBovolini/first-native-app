import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  processColor,
  View,
} from 'react-native';

import Cards from '../components/cards'
import ValueBox from '../components/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartResumo from '../components/LineChartResumo';
import OutroPie from '../components/PieChart';

import {
    dataHomeBox,
    resposta1
} from '../data/data';
import { useEffect } from 'react';


export const Home = ({navigation}) => {
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
  const [labels, setLabels] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
    const [selecionadoPie, setSelecionadoPie] = useState({})
    const [sandwiches, setSandwiches] = useState(35);
    const [salads, setSalads] = useState(35);
    const [soup, setSoup] = useState(35);
    const [beverages, setBeverages] = useState(35);
    const [desserts, setDesserts] = useState(35);

  const greenBlue = 'rgb(26, 182, 151)';
  const petrel = 'rgb(59, 145, 153)';

  useEffect(() => {
    const valores1 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.ibov),
            x: parseFloat(i),
            marker: 'IBOV: ' + parseFloat(el.ibov, 3) + ' %' + ' PETR4: ' + parseFloat(el.petr4, 3) + ' %',
        }
    });
    const valores2 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.cdi),
            x: parseFloat(i),
            marker: 'IBOV: ' + parseFloat(el.ibov, 3) + ' %' + ' CDI: ' + parseFloat(el.cdi, 3) + ' %',
        }
    });
    const linelabes = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return el.data
    })
    setValues1(valores1);
    setValues2(valores2);
    setLabels(linelabes);
  }, [])

  function handleSelectLine(event) {
    

    
    let entry = event.nativeEvent;
     console.warn('aaaa')
    if (entry == null) {
      setSelectedEvent(null);
      setSelecionadoLine({});
    } else {
      setSelectedEvent(JSON.stringify(entry));
      setSelecionadoLine(entry);
    }

    console.log(event.nativeEvent);
  }

  function handleSelectPie(event) {
    let entry = event.nativeEvent
    console.warn('bbb')
    if (entry == null) {
      setSelectedEntry(null)
    } else {
      setSelectedEntry(JSON.stringify(entry))
      setSelecionadoPie(entry)
    }

    console.log(event.nativeEvent)
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
            <Text style={styles.title}>Portfólio</Text>
            <View style={styles.valueBoxContainer}>
                <View style={styles.valueBoxContainerRow}>
                    <ValueBox title={dataHomeBox[0].label} value={dataHomeBox[0].value + ' %'}/>
                    <ValueBox title={dataHomeBox[1].label} value={dataHomeBox[1].value + ' %'}/>
                </View>
                <View style={styles.valueBoxContainerRow}>
                    <ValueBox title={dataHomeBox[2].label} value={dataHomeBox[2].value + ' %'}/>
                    <ValueBox title={dataHomeBox[3].label} value={'R$ ' +  dataHomeBox[3].value}/>
                </View>
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
            <View style={styles.chartContainer}>
                <OutroPie handleSelect={handleSelectPie} 
                selectedEntry={selectedEntry}
                sandwiches={sandwiches}
                salads={salads}
                soup={soup}
                beverages={beverages}
                desserts={desserts}
                valorCentro={selecionadoPie.data ? selecionadoPie.data.value.toString() :  'Carteira'}
                />      
            </View>
        </ScrollView>
    )
}

export default Home;

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
        height: globalStyles.dimensions.height / 1.75,
        marginTop: 20, 
      },
      lineChartContainer: {
        width: globalStyles.dimensions.width,
        height: globalStyles.dimensions.height / 3,
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
