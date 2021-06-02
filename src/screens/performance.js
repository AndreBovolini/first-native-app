import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  processColor,
  View,
  Dimensions
} from 'react-native';

import globalStyles from '../styles/globalStyles';

import LineChartRender from '../components/Performance/Portrait/LineChart/LineChart';
import SelectPeriod from '../components/Performance/SeletorPeriodos/SelectPeriod';

import PerformanceLandscape, { PerformanceTableLandscape } from './performanceLandscape';

import {
    dados,
} from '../data/data';

import { resposta2 } from '../data/dataTeste'
import LineChartLandscape from '../components/Performance/Landscape/LineChart/LineChartLandscape';

import { dataLineChartPortrait} from '../components/Performance/Portrait/LineChart/dataLineChartPortrait'
import { dataLineChartLandscape} from '../components/Performance/Landscape/LineChart/dataLineChartLandscape'

import {connect } from 'react-redux'
import TableRow from '../components/Performance/Portrait/Table/TableRow';
import Table from '../components/Performance/Portrait/Table/Table';

import { ContainerHeader, Title, ContainerTableLandscape, ContainerTable, ChartContainer, ContainerSelector, TextoHeader, ContainerSelectorTable } from './Performance/styles'
import { ThemeContext } from 'styled-components';

import LineChartKit from '../components/Performance/Portrait/LineChart/LineChartKit'
const Performance = (props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selecionadoLine, setSelecionadoLine] = useState({})
  const [inputValue, setInputValue] = useState('');
  const [inputMarker, setInputMarker] = useState('');
  const [values, setValues] = useState([])
  const [dependencyRight, setDependencyRight] = useState([])
  const [labels, setLabels] = useState([]);
  const [granularity, setGranularity] = useState(50)
  const [anoSelecionado, setAnoSelecionado] = useState('2021');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Tudo');
  const [indiceAno, setIndiceAno] = useState(0);
  const [orientation, setOrientation] = useState('portrait')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [dadosLineChartPortrait, setDadosLineChartPortrait] = useState({})
  const [dadosLineChartLandscape, setDadosLineChartLandscape] = useState({})

  const StyledTheme = useContext(ThemeContext)

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: { width, height}}) => {
      if (width < height) {
        setOrientation('portrait')
        setScrollPosition(0)
      } else {
        setOrientation('landscape')
      }
    })
  }, [])

    function handleSelecionaAno(ano) {
        setAnoSelecionado(ano);
        let indice = anos.indexOf(ano);
        setIndiceAno(indice);
    }

    function handleSelecionaPeriodo(periodo) {
      setSelectedEvent(null);
      setSelecionadoLine({});
      setPeriodoSelecionado(periodo)
  }

  function handleScroll(event) {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

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

    const keysDatas = Object.keys(resposta2.grafico5.Carteira)
    const respostaDados = keysDatas.map((el,i) => {
      return {
      data: el,
      Carteira: resposta2.grafico5.Carteira[el] ? resposta2.grafico5.Carteira[el] : 0,
      CDI: resposta2.grafico5.CDI[el] ? resposta2.grafico5.CDI[el] : 0,
      PL: resposta2.grafico5.PL[el] ? resposta2.grafico5.PL[el] : 0,
      baseline: '0'
       }
   })

  useEffect(() => {

    let filteredData = [];
    switch (periodoSelecionado) {
      case '1m':
        filteredData = respostaDados.filter(oneMonthPeriod);
        setGranularity(7)
      break;
      case '3m':
        filteredData = respostaDados.filter(threeMonthPeriod);
        setGranularity(25)
      break;
      case '2021':
        filteredData = respostaDados.filter(thisYear);
        setGranularity(40)
      break;
      case '12m':
        setGranularity(50)
        filteredData = respostaDados.filter(oneYearPeriod);
        break;
      case 'Tudo':
        filteredData = respostaDados;
        setGranularity(150)
      break;
    };

    let keysAtivos = Object.keys(resposta2.grafico5)
    const ativosRight = ['PL']
    setDependencyRight(ativosRight)

    ativosRight.forEach((el)=> {
      keysAtivos.splice(keysAtivos.indexOf(el), 1);
      keysAtivos.unshift(el)
   })
    

    if (filteredData !== []) {
    let values = keysAtivos.map((ativo,i) => {
      const valores = filteredData.map((el,i) => {
        return {
          y: parseFloat(el[ativo]),
          x: parseFloat(i),
          marker: 'Carteira: ' + parseFloat(el.Carteira, 3) + '%' 
          + ' CDI: ' + parseFloat(el.CDI, 3) + '%',
      }
      })
      return {
        label: ativo,
        dataset: valores
      }
    })
    const linelabes = filteredData.map((el, i) => {
      return el.data
  })
    setValues(values)
    setLabels(linelabes)
  };
  }, [periodoSelecionado])

  const periodos = ['1m', '3m', '12m', '2021', 'Tudo'];
  const anos = ['2021', '2020', '2019', '2018', '2017'];
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const greenBlue = 'rgb(26, 192, 151)';
  const petrel = 'rgb(59, 115, 135)';
  const random = 'rgb(100, 99, 153)';
  const random2 = 'rgb(75, 40, 128)';
  const colors = [random, greenBlue, petrel]

  

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
        axisDependency: (dependencyRight.includes(el.label) ?
          'RIGHT' : 'LEFT' ),
        drawFilled: (dependencyRight.includes(el.label) ?
          true : false ),
        fillGradient: {
          colors: [processColor(random), processColor(random2)],
          positions:[0, 0.5],
          angle: 90,
          orientation: "TOP_BOTTOM",
          
        },
        fillAlpha: 4000

      },
    }
   })

   const data = {
     dataSets
   }
  

  useEffect(() => {
    
    if (!props.isLoadingDadosHomePage && props.responseDadosHomePage !== []) {
      const dadosLineChartPortrait = dataLineChartPortrait(props.responseDadosHomePage,periodoSelecionado);
      setDadosLineChartPortrait(dadosLineChartPortrait)
      const dadosLineChartLandscape = dataLineChartLandscape(props.responseDadosHomePage,periodoSelecionado);
      setDadosLineChartLandscape(dadosLineChartLandscape);
    }
  }, [periodoSelecionado, props.isLoadingDadosHomePage, props.responseDadosHomePage])


  if (orientation === 'landscape') {
    if (scrollPosition > 390) {
      return (
        <PerformanceTableLandscape>
          <View style={{height: globalStyles.dimensions.width *0.9, borderRadius: 20,  width: globalStyles.dimensions.height * 0.9}}>
          <ContainerTableLandscape>
            <ContainerHeader>
            <TextoHeader>Período</TextoHeader>
              <TextoHeader>Carteira</TextoHeader>
              <TextoHeader>IPCADP</TextoHeader>
              <TextoHeader>%IPCADP</TextoHeader>
            </ContainerHeader>
            <ScrollView nestedScrollEnabled = {true}>
            {dados[indiceAno].response.map((el, i) => {
                return (
                    <TableRow key={i} index={i} col1={meses[i]} col2={el.carteira} col3={el.IPCADP} col4={el.IPCADPP}/>
                )
            })}
            </ScrollView>
          </ContainerTableLandscape>
          </View>
        </PerformanceTableLandscape>
      )
    }
    return (
      <PerformanceLandscape>
        <LineChartLandscape
        data={dadosLineChartLandscape.data}
        labels={dadosLineChartLandscape.labels}
        granularity={dadosLineChartLandscape.granularity}
        number={dadosLineChartLandscape.number}
        symbol={dadosLineChartLandscape.symbol}
        />
      </PerformanceLandscape>
    )
  }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: StyledTheme.colors.background}}>
        <ScrollView 
        contentContainerStyle={{height: 1180,
        backgroundColor: StyledTheme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center'}} 
        onMomentumScrollEnd={(event) => handleScroll(event)}
        >
            <Title>{'Performance'}</Title>
            <ContainerSelector>
            {periodos.map((el, i) => {
                return (
                  <SelectPeriod ano={el} key={i} selecionado={periodoSelecionado} handleSelecionado={handleSelecionaPeriodo}/>
                )
            })}
            </ContainerSelector>
            <ChartContainer>
                {!props.isLoadingDadosHomePage && dadosLineChartPortrait !== {} ?
                <LineChartRender
                data={dadosLineChartPortrait.data}
                labels={dadosLineChartPortrait.labels}
                granularity={dadosLineChartPortrait.granularity}
                formated={dadosLineChartPortrait.formated}
                number={dadosLineChartPortrait.number}
                symbol={dadosLineChartPortrait.symbol}
                /> :
                null}
            </ChartContainer>
            <View>
              <LineChartKit/>
            </View>
            <ContainerSelectorTable>
      {anos.map((el, i) => {
          return (
            <SelectPeriod ano={el} key={i} selecionado={anoSelecionado} handleSelecionado={handleSelecionaAno}/>
          )
      })}
        
          </ContainerSelectorTable>
        <Table indiceAno={indiceAno}/>
      </ScrollView>
      </SafeAreaView>
    )
}
const mapStateToProps = state => ({
  isLoadingDadosHomePage: state.dadosHomePage.loading,
  responseDadosHomePage: state.dadosHomePage.data
})

export default connect(mapStateToProps)(Performance);

const styles = StyleSheet.create({
})
