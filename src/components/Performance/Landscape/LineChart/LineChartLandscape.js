import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  processColor,
} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';
import { ThemeContext } from 'styled-components';
import globalStyles from '../../../../styles/globalStyles';



const LineChartLandscape = props => {

  const StyledTheme = useContext(ThemeContext)

  return (
    <View style={{flex: 1}}>

      <View style={[styles.container, {backgroundColor: StyledTheme.colors.backGround,}]}>
        <LineChart
          style={styles.chart}
          data={props.data}
          chartDescription={{text: ''}}
          legend={{
            enabled: true,
            textSize: 15,
            textColor: processColor(StyledTheme.chartColors.legendColor),
            form: 'CIRCLE',

            horizontalAlignment: 'CENTER',
            verticalAlignment: 'BOTTOM',
            orientation: 'HORIZONTAL',
            wordWrapEnabled: true,
          }}
          marker={{
            enabled: true,
            digits: 2,
            markerColor: processColor(StyledTheme.chartColors.tooltip),
            textColor: processColor(StyledTheme.chartColors.tooltipText),
            textSize: 20,
          }}
          xAxis={{
            enabled: true,
            granularity: props.granularity,
            drawLabels: true,
            position: 'BOTTOM',
            drawAxisLine: true,
            drawGridLines: true,
            fontFamily: 'HelveticaNeue-Medium',
            fontWeight: 'bold',
            textSize: 12,
            textColor: processColor(StyledTheme.chartColors.axis),
            valueFormatter: props.labels,
          }}
          yAxis={{
            left: {
              enabled: true,
              drawGridLines: true,
              drawLabels: true,
              drawAxisLine: true,
              textColor: processColor(StyledTheme.chartColors.axis),
              valueFormatter: "###'%'",
            },
            right: {
              enabled: true,
              drawGridLines: false,
              drawLabels: true,
              drawAxisLine: true,
              textColor: processColor(globalStyles.chartColors.axis),
              valueFormatter: `${props.number}`+`${props.symbol}`,
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 1300,
            durationY: 0,
            easingY: 'EaseInOutQuart',
          }}
          drawGridBackground={false}
          highlightPerTapEnabled={true}
          highlightPerDragEnabled={true}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={true}
          pinchZoom={true}
          doubleTapToZoomEnabled={true}
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
    padding: 20,
  },
  chart: {
    height: globalStyles.dimensions.width*0.9,
  },
});

export default LineChartLandscape;
