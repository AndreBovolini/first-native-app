import React, {useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  LayoutAnimation,
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';


const LineChartRender = props => {
  const greenBlue = 'rgb(26, 182, 151)';
  const petrel = 'rgb(59, 145, 153)';

  return (
    <View style={{flex: 1}}>

      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={props.data}
          chartDescription={{text: ''}}
          legend={{
            enabled: true,
            textSize: 15,
            textColor: processColor('white'),
            form: 'CIRCLE',

            horizontalAlignment: 'CENTER',
            verticalAlignment: 'BOTTOM',
            orientation: 'HORIZONTAL',
            wordWrapEnabled: true,
          }}
          marker={{
            enabled: true,
            digits: 2,
            markerColor: processColor('#252525'),
            textColor: processColor('white'),
            backgroundTint: processColor('red'),
            textSize: 20,
          }}
          xAxis={{
            enabled: true,
            granularity: props.granularity,
            drawLabels: true,
            position: 'BOTTOM',
            drawAxisLine: true,
            drawGridLines: false,
            fontFamily: 'HelveticaNeue-Medium',
            fontWeight: 'bold',
            textSize: 12,
            textColor: processColor('white'),
            valueFormatter: props.labels,
          }}
          yAxis={{
            left: {
              enabled: true,
              drawGridLines: false,
              drawLabels: true,
              drawAxisLine: true,
              textColor: processColor('white'),
              valueFormatter: "###'%'",
            },
            right: {
              enabled: false,
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 1300,
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
          onSelect={props.handleSelect}
          onTouchEnd={() => console.warn('salve')}
          onChange={event => console.log(event.nativeEvent)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  chart: {
    height: 400,
  },
});

export default LineChartRender;
