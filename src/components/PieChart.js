import React, { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';

const OutroPie = (props) => {
  
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
            values: [
              {value: props.sandwiches, label: 'Sandwiches'},
              {value: props.salads, label: 'Salads'},
              {value: props.soup, label: 'Soup'},
              {value: props.beverages, label: 'Beverages'},
              {value: props.desserts, label: 'Desserts'}],
            label: '',
            config: {
              colors: [processColor('#5456A2'), processColor('#ABA2D0'), processColor('#5f8dca'), processColor('#a7d7d2'), processColor('#48A192')],
              valueTextSize: 20,
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
            highlights={infos.highlights}

            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

            entryLabelColor={processColor('white')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'HelveticaNeue-Medium'}
            drawEntryLabels={true}

            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{text: props.valorCentro, color: processColor('white'), fontFamily: 'HelveticaNeue-Medium', size: 40}}
            centerTextRadiusPercent={100}
            holeRadius={40}
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
