import React, { useEffect, useState } from 'react';
import {
  processColor,
} from 'react-native';


//import { resposta2 } from '../../../data/dataTeste'
import globalStyles from '../../../styles/globalStyles';

export const newDataPieChart = (resposta, StyledTheme) => {

    const keysAtivos = Object.keys(resposta)
    const AtivosCarteira = keysAtivos.map((el,i) => {
        if ( parseFloat(resposta[el]) > 0) {
      return {
      value: parseFloat(resposta[el]),
      label: (el === 'nd' ? 'Outros' : el),
          }
    }
  }
  ).filter(item => item != null)
  
    let arrayData = []
    arrayData = AtivosCarteira.map((el, i) => {
        return {
            value: el.value,
            name: el.label,
            itemStyle: { 
                color: StyledTheme.chartColors.pieChartColors[i]
            }
          }
        })
    //console.warn(arrayData)
    return (
        arrayData
    )
}
