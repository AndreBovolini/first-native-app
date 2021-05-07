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

import { AtivosCarteira } from '../../../data/data';
import globalStyles from '../../../styles/globalStyles';

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
          textColor: processColor(globalStyles.chartColors.legendColor),
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
              colors: globalStyles.chartColors.pieChartColors.map(el => {
                return processColor(el)
              }),
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
            chartBackgroundColor={processColor(globalStyles.colors.backGround)}
            chartDescription={infos.description}
            data={infos.data}
            legend={infos.legend}
            marker={{
              enabled: true,
              markerColor: processColor(globalStyles.chartColors.tooltip),
              textColor: processColor(globalStyles.chartColors.tooltipText),
              textSize: 23,
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
            styledCenterText={{text: 'Carteira', color: processColor(globalStyles.chartColors.centerText), fontFamily: 'HelveticaNeue-Medium', size: 30}}
            centerTextRadiusPercent={90}
            holeRadius={60}
            holeColor={processColor(globalStyles.chartColors.pieChartHole)}
            transparentCircleRadius={40}
            transparentCircleColor={processColor(globalStyles.chartColors.pieChartHole)}
            maxAngle={360}
            onSelect={props.handleSelect}
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
