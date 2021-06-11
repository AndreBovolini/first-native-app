import React, { useContext } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor
  } from 'react-native';
  
import { ECharts } from 'react-native-echarts-wrapper';
import { ThemeContext } from 'styled-components';

  import globalStyles from '../../styles/globalStyles'

const NewBarChartHome = (props) => {

  const StyledTheme = useContext(ThemeContext)

  const indices = ['carteira', 'ibov', 'cdi']
  const cores = ['#48A192', '#5456A2', '#7FAADB']

  dataIndices = ['Indices']
  indices.forEach((indice) => {
      dataIndices.push(indice)
  })
  
  dataValues = ['']
  indices.forEach((indice) => {
      dataValues.push(props.data[indice])
  })
  console.warn(dataValues)

  let numeros = indices.map((indice, el) => {
    return props.data[indice]
  })


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

    options = {
        legend: {bottom: 30},
        tooltip: {},
        dataset: {
            source: [
                dataIndices,
                dataValues,
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {show :false},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
    };
    

    return (
        <ECharts
            option={options}
            backgroundColor={StyledTheme.colors.background}
          />
    )
};

export default NewBarChartHome;
