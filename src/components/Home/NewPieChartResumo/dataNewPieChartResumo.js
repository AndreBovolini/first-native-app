import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  processColor,
} from 'react-native';


import globalStyles from '../../../styles/globalStyles';

export const newDataPieChartHome = (response, StyledTheme) => {

    


    const keysAtivos = Object.keys(response.grafico0)
    const AtivosCarteira = keysAtivos.map((el,i) => {
      if ( parseFloat(response.grafico0[el]) > 0) {
      return {
      value: parseFloat(response.grafico0[el]),
      label: (el === 'nd' ? 'Outros' : el) ,
          }
      }
  
  }).filter(item => item != null)

        let arrayData =[]
        arrayData = AtivosCarteira.map((el, i) => {
          return {
            value: el.value,
            name: el.label,
            itemStyle: { 
                color: StyledTheme.chartColors.pieChartColors[i]
            }
          }
        })
        console.warn(arrayData)

    return ( arrayData )
}
