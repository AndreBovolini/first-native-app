import React, { useEffect, useState } from 'react';
import {
  processColor,
} from 'react-native';


import { AtivosCarteira } from '../../../data/data';
import { resposta2 } from '../../../data/dataTeste'
import globalStyles from '../../../styles/globalStyles';

export const dataPieChartHome = () => {

    const keysAtivos = Object.keys(resposta2.grafico1)
    const AtivosCarteira = keysAtivos.map((el,i) => {
      return {
      value: parseFloat(resposta2.grafico1[el]),
      label: el,
          }
  
  })
    const [chartData, setChartData] = useState(AtivosCarteira);
    const [soma, setSoma] = useState(0)

    useEffect(() => {
        let soma = 0
        let arrayData =[]
        AtivosCarteira.forEach((el, i) => {
          soma = soma + parseFloat(el.value)
        })
        setSoma(soma);
        arrayData = AtivosCarteira.map((el, i) => {
          let percent = ((parseFloat(el.value) / soma) *100).toFixed(2)
          return {
            value: el.value,
            label: el.label,
            marker: `${el.label}: ${percent}%`
          }
        })
        setChartData(arrayData);
      },[])
    
    return ({
      infos: {
        legend: {
          enabled: true,
          textSize: 15,
          textColor: processColor(globalStyles.chartColors.legendColor),
          form: 'CIRCLE',
  
          horizontalAlignment: "CENTER",
          verticalAlignment: "BOTTOM",
          orientation: "HORIZONTAL",
          wordWrapEnabled: true
        },
        data: {
          dataSets: [{
            values: chartData,
            label: '',
            config: {
              colors: globalStyles.chartColors.pieChartColors.map(el => {
                return processColor(el)
              }),
              valueTextSize: 0,
              valueTextColor: processColor('black'),
              sliceSpace: 5,
              selectionShift: 13,
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
      }
    })
}
