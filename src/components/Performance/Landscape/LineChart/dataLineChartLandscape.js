import { processColor } from 'react-native'



export const dataLineChartLandscape = ( response, periodoSelecionado) => {

    const orientation = 'landscape'

    const keysDatas = Object.keys(response.grafico5.Carteira)
    const respostaDados = keysDatas.map((el,i) => {
      return {
      data: el,
      Carteira: response.grafico5.Carteira[el] ? response.grafico5.Carteira[el] : 0,
      CDI: response.grafico5.CDI[el] ? response.grafico5.CDI[el] : 0,
      PL: response.grafico5.PL[el] ? response.grafico5.PL[el] : 0,
      baseline: '0'
       }
   })


   const greenBlue = 'rgb(26, 192, 151)';
   const petrel = 'rgb(59, 115, 135)';
   const random = 'rgb(98, 85, 153)';
   const random2 = 'rgb(75, 40, 128)';
   const colors = [random, greenBlue, petrel]

   const alteraDataPTParaEN = data => {
    data = data.split('/');
    data = data[2] + '-' + data[1] + '-' + data[0];
    return data;
  };

   function oneMonthPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*31);
    return date >= dataAtual
  }

  function threeMonthPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*92);
    return date >= dataAtual
  }

  function oneYearPeriod(value) {
    let date = Date.parse(alteraDataPTParaEN(value.data));
    let dataAtual = new Date().getTime() - (1000*60*60*24*365);
    return date >= dataAtual
  }

  function thisYear(value) {
    let year =  value.data.slice(-4);
    return year === periodoSelecionado
  }

   let granularity = 50
   let filteredData = [];
    switch (periodoSelecionado) {
      case '1m':
        filteredData = respostaDados.filter(oneMonthPeriod);
        granularity = 7
      break;
      case '3m':
        filteredData = respostaDados.filter(threeMonthPeriod);
        granularity = 25
      break;
      case '2021':
        filteredData = respostaDados.filter(thisYear);
        granularity = 50
      break;
      case '12m':
        granularity = 50
        filteredData = respostaDados.filter(oneYearPeriod);
        break;
      case 'Tudo':
        filteredData = respostaDados;
        granularity = 150
      break;
    };
    

    let keysAtivos = Object.keys(response.grafico5)
    const ativosRight = ['PL']

    ativosRight.forEach((el)=> {
      keysAtivos.splice(keysAtivos.indexOf(el), 1);
      keysAtivos.unshift(el)
   })
   console.log(keysAtivos)
   let values = []
   let linelabes = []
    if (filteredData !== []) {
     values = keysAtivos.map((ativo,i) => {
      const valores = filteredData.map((el,i) => {
        return {
          y: parseFloat(el[ativo]),
          x: parseFloat(i),
          marker: 'Carteira: ' + parseFloat(el.Carteira, 3) + '%' 
          + ' CDI: ' + parseFloat(el.CDI, 3) + '%',
        }
      })
      
      console.log('BBBB' + valores[0])
      return {
        label: ativo,
        dataset: valores
      }
    })
    
    linelabes = filteredData.map((el, i) => {
      return el.data
  })
  console.log('AAAA'+ values[0][0])
  };

    const labels = [...linelabes]
    
    const dataSets = values.map((el,i) => {
        return {
        values: el.dataset,
        label: el.label,
        config: {
        mode: 'CUBIC_BEZIER',
        drawValues: false,
        lineWidth: 2,
        drawCircles: false,
        circleColor: processColor(colors[i]),
        drawCircleHole: false,
        circleRadius: 5,
        highlightColor: processColor(orientation === 'portrait' ? 'transparent' : 'red'),
        color: processColor(colors[i]),
        valueTextSize: 15,
        axisDependency: (ativosRight.includes(el.label) ?
            'RIGHT' : 'LEFT' ),
        drawFilled: (ativosRight.includes(el.label) ?
            true : false ),
        fillGradient: {
            colors: [processColor(random), processColor(random2)],
            positions:[0, 0.5],
            angle: 90,
            orientation: "TOP_BOTTOM",
            
        },
        fillAlpha: 150

        },
    }
    })
    const data = {
        dataSets
    }
    return ({
        data, 
        labels,
        granularity
    })

}