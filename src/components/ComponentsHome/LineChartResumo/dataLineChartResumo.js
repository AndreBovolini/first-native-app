import { processColor } from 'react-native'

import { resposta1 } from '../../../data/data'

export const dataLineChartHome = () => {
    const greenBlue = 'rgb(26, 182, 151)';
    const valores1 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.ibov),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.ibov, 3) + '%',
        }
    });
    const valores2 = resposta1.resposta["tab-p1"].linha.map((el, i) => {
        return {
            y: parseFloat(el.baseLine),
            x: parseFloat(i),
            marker: 'Carteira: ' + parseFloat(el.ibov, 3) + '%',
        }
    });
    const linelabes = resposta1.resposta["tab-p1"].linha.map((el) => {
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