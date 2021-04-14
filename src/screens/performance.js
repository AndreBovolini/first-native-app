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

import ValueBox from '../components/valueBox';
import globalStyles from '../styles/globalStyles';

import LineChartRender from '../components/LineChart';
import SelectPeriod from '../components/SelectPeriod';

import {
    dataHomeBox
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
    const [indiceAno, setIndiceAno] = useState(0);

    function handleSelecionaAno(ano) {
        setAnoSelecionado(ano);
        let indice = anos.indexOf(ano);
        setIndiceAno(indice);
    }

    const anos = ['1m', '3m', '2021', '1 year', 'Tudo']

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
        label: 'BDS',
        config: {
          mode: 'CUBIC_BEZIER',
          drawValues: false,
          lineWidth: 2,
          drawCircles: true,
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
        label: 'Vitality',
        config: {
          mode: 'CUBIC_BEZIER',
          drawValues: false,
          lineWidth: 2,
          drawCircles: true,
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
            {anos.map((el, i) => {
                return (
                  <SelectPeriod ano={el} key={i} anoSelecionado={anoSelecionado} handleSelecionaAno={handleSelecionaAno}/>
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
    }
})
