import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  processColor,
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';
import globalStyles from '../../../styles/globalStyles';



const LineChartResumo = props => {


  return (
    <View style={{flex: 1}}>

      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={props.data}
          chartDescription={{text: ''}}
          legend={{
            enabled: false,
            textSize: 15,
            textColor: processColor(globalStyles.chartColors.legendColor),
            form: 'CIRCLE',

            horizontalAlignment: 'CENTER',
            verticalAlignment: 'BOTTOM',
            orientation: 'HORIZONTAL',
            wordWrapEnabled: true,
          }}
          marker={{
            enabled: true,
            digits: 2,
            markerColor: processColor(globalStyles.chartColors.tooltip),
            textColor: processColor(globalStyles.chartColors.tooltipText),
            textSize: 20,
          }}
          xAxis={{
            enabled: false,
            granularity: 25,
            drawLabels: true,
            position: 'BOTTOM',
            drawAxisLine: true,
            drawGridLines: false,
            fontFamily: 'HelveticaNeue-Medium',
            fontWeight: 'bold',
            textSize: 12,
            textColor: processColor(globalStyles.chartColors.axis),
            valueFormatter: props.label,
          }}
          yAxis={{
            left: {
              enabled:false,
              drawGridLines: false,
              drawLabels: true,
              drawAxisLine: true,
              textColor: processColor(globalStyles.chartColors.axis),
              valueFormatter: "###'%'",
            },
            right: {
              enabled: false,
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 3200,
            durationY: 0,
            easingY: 'EaseInOutQuart',
          }}
          drawGridBackground={false}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={false}
          scaleEnabled={false}
          scaleXEnabled={false}
          scaleYEnabled={false}
          pinchZoom={false}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.backGround,
    padding: 20,
  },
  chart: {
    flex: 1,
  },
});

export default LineChartResumo;
