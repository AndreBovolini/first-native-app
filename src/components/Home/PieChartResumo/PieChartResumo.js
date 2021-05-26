import React, { useContext, useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
import { ThemeContext } from 'styled-components';

import { AtivosCarteira } from '../../../data/data';
import globalStyles from '../../../styles/globalStyles';

const PieChartResumo = (props) => {
 
  const StyledTheme = useContext(ThemeContext)

return (
    <View style={{flex: 1}}>
        <View>

        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor(StyledTheme.colors.background)}
            chartDescription={props.infos.description}
            data={props.infos.data}
            legend={props.infos.legend}
            marker={{
              enabled: true,
              markerColor: processColor(StyledTheme.chartColors.tooltip),
              textColor: processColor(StyledTheme.chartColors.tooltipText),
              textSize: 23,
            }}
            highlights={props.infos.highlights}

            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
            drawEntryLabels={false}
            entryLabelColor={processColor('white')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'HelveticaNeue-Medium'}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{text: 'Carteira', color: processColor(StyledTheme.chartColors.centerText), fontFamily: 'HelveticaNeue-Medium', size: 30}}
            centerTextRadiusPercent={90}
            holeRadius={60}
            holeColor={processColor(StyledTheme.chartColors.pieChartHole)}
            transparentCircleRadius={40}
            transparentCircleColor={processColor(StyledTheme.chartColors.pieChartHole)}
            maxAngle={360}
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
  

export default PieChartResumo;
