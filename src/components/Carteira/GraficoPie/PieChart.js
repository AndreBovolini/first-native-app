import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';


import globalStyles from '../../../styles/globalStyles';

const PieCarteira = ({infos, handleSelectPie}) => {
  


return (
    <View style={{flex: 1}}>
        <View>

        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor(globalStyles.colors.backGround)}
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
            onSelect={event => handleSelectPie(even}
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
  

export default PieCarteira;
