import { processColor } from 'react-native'

import { resposta2 } from '../../../data/dataTeste'

export const dataLineChartHome = (response) => {
    console.log(response)
    const keysDatas = Object.keys(response.Carteira)
    const respostaDados = keysDatas.map((el,i) => {
      return {
      data: el,
      Carteira: response.Carteira[el] ? response.Carteira[el] : 0,
      CDI: response.CDI[el] ? response.CDI[el] : 0,
      PL: response.PL[el] ? response.PL[el] : 0,
      baseline: '0'
      }
    })
    console.log(respostaDados)

    const greenBlue = 'rgb(26, 182, 151)';
    const valores1 = respostaDados.map((el, i) => {
        return {
            y: parseFloat(el.Carteira),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.Carteira, 3) + '%',
        }
    });
    const valores2 = respostaDados.map((el, i) => {
        return {
            y: parseFloat(el.baseline),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.Carteira, 3) + '%',
        }
    });
    const linelabes = respostaDados.map((el) => {
        return el.data
    })
    return ({
        data: {
            dataSets: [
              {
                values: valores1,
                label: 'Certeira',
                config: {
                  mode: 'CUBIC_BEZIER',
                  drawValues: false,
                  lineWidth: 2,
                  drawCircles: false,
                  circleColor: processColor(greenBlue),
                  drawCircleHole: false,
                  circleRadius: 5,
                  highlightColor: processColor('transparent'),
                  color: processColor(greenBlue),
        
                  valueTextSize: 15,
                },
              },
        
              {
                values: valores2,
                label: 'CDI',
                config: {
                  mode: 'CUBIC_BEZIER',
                  enableDashedLine: true,
                  drawValues: false,
                  lineWidth: 0.5,
                  dashedLine: {
                    lineLength: 10,
                    spaceLength: 10
                  },
                  drawCircles: false,
                  circleColor: processColor('white'),
                  drawCircleHole: false,
                  circleRadius: 5,
                  highlightColor: processColor('transparent'),
                  color: processColor('white'),
                  valueTextSize: 15,
                },
              },
            ],
          },
        labels: linelabes,
    })



    
}