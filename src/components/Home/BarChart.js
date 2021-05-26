import React, { useContext } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor
  } from 'react-native';
  
  import {BarChart} from 'react-native-charts-wrapper';
import { ThemeContext } from 'styled-components';

  import globalStyles from '../../styles/globalStyles'

const BarChartHome = (props) => {

  const StyledTheme = useContext(ThemeContext)

  const indices = ['carteira', 'ibov', 'cdi']
  const cores = ['#48A192', '#5456A2', '#7FAADB']

  let numeros = indices.map((indice, el) => {
    return props.data[indice]
  })

  let lowest = Math.min(...numeros)

  const dataSets = indices.map((indice, i) => {
    return {
            values: [props.data[indice]],
            label: indice,
            config: {
              drawValues: false,
              colors: [processColor(cores[i])],
            }
    }
  })

    infos = {
        legend: {
          enabled: false,
          textSize: 14,
          form: "SQUARE",
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          wordWrapEnabled: true
        },
        data: {
          dataSets: dataSets,
          config: {
            barWidth: 0.1,
            group: {
              fromX: 0.25,
              groupSpace: 0.1,
              barSpace: 0.05,
            },
          }
        },
        xAxis: {
          enabled: false,
            axisLineColor: processColor('black'),
        position: 'BOTTOM',
          valueFormatter: ['1990'],
          drawLabels: false,
          granularityEnabled: true,
          granularity: 1,
          axisMaximum: 1,
          axisMinimum: 0,
          centerAxisLabels: true,
          drawAxisLine: true,
          textColor: processColor(globalStyles.chartColors.background),
        },
        yAxis: {
            left: {
              drawLabels: false,
              drawAxisLine: false,
              drawGridLines: false,
              enabled: true,
              axisMinimum: lowest < 0 ? lowest : 0,
              zeroLine: {
                    enabled: true,
                    lineWidth: 0.7,
                    lineColor: processColor(StyledTheme.colors.invertedBackground)
                    }
              },
              right: {
                enabled: false
              }
        },
        marker: {
          enabled: true,
          markerColor: processColor('#F0C0FF8C'),
          textColor: processColor('white'),
          markerFontSize: 14,
        },
      };


    return (
        <BarChart
            style={styles.chart}
            data={infos.data}
            xAxis={infos.xAxis}
            yAxis={infos.yAxis}
            animation={{durationX: 2000}}
            legend={infos.legend}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            pinchZoom={false}
          doubleTapToZoomEnabled={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
          />
    )
};

export default BarChartHome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      
      
    },
    chart: {
      height: 250,
      width: globalStyles.dimensions.width * 0.90,
      alignSelf: 'center'
    }
  });