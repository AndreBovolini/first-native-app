import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor
  } from 'react-native';
  
  import {BarChart} from 'react-native-charts-wrapper';

  import globalStyles from '../../styles/globalStyles'

const BarChartHome = () => {

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
          dataSets: [{
            values: [-30],
            label: 'Company A',
            config: {
              drawValues: false,
              colors: [processColor('red')],
            }
          }, {
            values: [40],
            label: 'Company B',
            config: {
              drawValues: false,
              colors: [processColor('blue')],
            }
          }, {
            values: [50],
            label: 'Company C',
            config: {
              drawValues: false,
              colors: [processColor('green')],
            }
          }],
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
              axisMinimum: -40,
              zeroLine: {
                    enabled: true,
                    lineWidth: 1,
                    lineColor: processColor('#FFF')
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
      backgroundColor: '#F5FCFF'
    },
    chart: {
      height: 300,
      width: globalStyles.dimensions.width * 0.95
    }
  });