import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
import { proc } from 'react-native-reanimated';

import { AtivosCarteira } from '../data/data';

const OutroPie = (props) => {
  const [chartData, setChartData] = useState(AtivosCarteira);
  const [soma, setSoma] = useState(0)

  useEffect(() => {
    let soma = 0
    let arrayData =[]
    AtivosCarteira.forEach((el, i) => {
      soma = soma + parseFloat(el.value)
    })
    setSoma(soma);
    arrayData = AtivosCarteira.map((el, i) => {
      let percent = ((parseFloat(el.value) / soma) *100).toFixed(2)
      return {
        value: el.value,
        label: el.label,
        marker: `${el.label}: ${percent}%`
      }
    })
    setChartData(arrayData);
  },[])
  
    const infos = {
        legend: {
          enabled: true,
          textSize: 15,
          textColor: processColor('white'),
          form: 'CIRCLE',
  
          horizontalAlignment: "CENTER",
          verticalAlignment: "BOTTOM",
          orientation: "HORIZONTAL",
          wordWrapEnabled: true
        },
        data: {
          dataSets: [{
            values: chartData,
            label: '',
            config: {
              colors: [processColor('#5456A2'),processColor('#7A77B7'), processColor('#ABA2D0'), processColor('#5f8dca'),processColor('#7FAADB'), processColor('#a7d7d2'), processColor('#48A192')],
              valueTextSize: 0,
              valueTextColor: processColor('black'),
              sliceSpace: 5,
              selectionShift: 13,
              // xValuePosition: "OUTSIDE_SLICE",
              // yValuePosition: "OUTSIDE_SLICE",
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('WHITE'),
              valueLinePart1Length: 0.5
            }
          }],
        },
        highlights: [{x:2}],
        description: {
          text: '',
          textSize: 15,
          textColor: processColor('darkgray'),
  
        }
      };


return (
    <View style={{flex: 1}}>
        <View>

        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('black')}
            chartDescription={infos.description}
            data={infos.data}
            legend={infos.legend}
            marker={{
              enabled: true,
              markerColor: processColor('black'),
              textColor: processColor('white'),
              textSize: 30,
            }}
            highlights={infos.highlights}

            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
            drawEntryLabels={false}
            entryLabelColor={processColor('white')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'HelveticaNeue-Medium'}

            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{text: props.valorCentro, color: processColor('white'), fontFamily: 'HelveticaNeue-Medium', size: 40}}
            centerTextRadiusPercent={90}
            holeRadius={60}
            holeColor={processColor('#000')}
            transparentCircleRadius={40}
            transparentCircleColor={processColor('#000')}
            maxAngle={360}
            onSelect={props.handleSelect}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    chart: {
      flex: 1
    }
  });
  

export default OutroPie
