import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/Carteira/Cards/CardsCarteira/cards'
import PieCarteira from '../components/Carteira/GraficoPie/PieChart';
import Seletor from '../components/Carteira/Seletor/Seletor'

import { resposta2 } from '../data/dataTeste';

import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { dataPieChart } from '../components/Carteira/GraficoPie/dataPieChart';

import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ThemeContext } from 'styled-components/native';

import {
  Title,
  ChartContainer,
  ContainerCards,
  LoadingView
} from '../screens/Carteira/style'
import { newDataPieChart } from '../components/Carteira/NewGraficoPie/newDataPieChart';
import NewPieChart from '../components/Carteira/NewGraficoPie';
import { LoadAnimation } from '../components/loading';

import { OrientationLocker, PORTRAIT, LANDSCAPE } from "react-native-orientation-locker";

const Carteira = (props) => {
  const [arrayAtivos, setArrayAtivos] = useState([]);
  const [scrollViewHeight, setScrollViewHeight] = useState(globalStyles.dimensions.height)
  const [cores, setCores] = useState(globalStyles.chartColors.pieChartColors);
  const [newDadosChart, setNewDadosChart] = useState([])
  const [showAtivos, setShowAtivos ] = useState(true)
  const [heightDefault, setHeightDefault] = useState(558)
  const [tabsScrollHeight, setTabsScrollHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [orientacao, setOrientacao] = useState('portrait')
  const [opacity, setOpacity] = useState(0)
  const [isLoadingDatas, setIsLoadingDatas] = useState(false);
  // const [screen, setScreen] = useState('carteira')

const StyledTheme = useContext(ThemeContext)

  // useDeviceOrientationChange((o) => {
  //   setScreen('carteira')
  //   setOrientacao(o)
  // });

  // useEffect(() => {
  //   if (orientacao.toLowerCase().includes('landscape')){
  //     Orientation.lockToPortrait()
  //   }     
  // }, [orientacao])

  useEffect(() => {
    setIsLoading(true)
    
    if (!props.isLoadingDadosHomePage && props.responseDadosHomePage !== [] && !props.isLoadingDadosPosicaoConsolidada && props.responseDadosPosicaoConsolidada !== undefined) {
      //console.warn(props.responseDadosPosicaoConsolidada)
      const keysAtivos = Object.keys(showAtivos ? props.responseDadosPosicaoConsolidada : resposta2.grafico1)
      
    const AtivosCarteira = keysAtivos.map((el,i) => {
      return {
        value: parseFloat(showAtivos ? props.responseDadosPosicaoConsolidada[el] : resposta2.grafico1[el]),
        label: (el === 'nd' ? 'Outros' : el) ,
      }
    })
    let ativos = []
    

    
    AtivosCarteira.forEach((el, i) => {
      ativos.push({
        id: i,
        ativo: el.label,
        value: el.value,
        data: el.data,
        cor: cores[i],
        show: false,
      });
    });
    //console.warn(ativos)

    setArrayAtivos(ativos);
    setScrollViewHeight(heightDefault + (ativos.length * 120));
    setTabsScrollHeight(heightDefault + (ativos.length * 120));

   let infos = ''
   let dadosChartNew = '';
    if(showAtivos){
      infos = dataPieChart(props.responseDadosPosicaoConsolidada,StyledTheme.colors.invertedBackground)
      
      dadosChartNew = newDataPieChart(props.responseDadosPosicaoConsolidada, StyledTheme)
    }else{
      infos = dataPieChart(resposta2.grafico1,StyledTheme.colors.invertedBackground )
      
      dadosChartNew = newDataPieChart(resposta2.grafico1, StyledTheme)
    }
    // const infos = dataPieChart(showAtivos ? (resposta2.grafico0, StyledTheme.colors.invertedBackground)
    //   : (resposta2.grafico1, StyledTheme.colors.invertedBackground))
    if (newDadosChart != dadosChartNew ) {
      //console.warn(dadosChartNew)
   setNewDadosChart(dadosChartNew)
    setIsLoading(false)
   
    
   
    }
    }
   
    
    
  }, [showAtivos, props.isLoadingDadosHomePage, props.responseDadosHomePage, StyledTheme, props.responseDadosPosicaoConsolidada, props.isLoadingDadosPosicaoConsolidada]);

  useEffect(()=>{

    setOpacity(0)
    if(true){
      setIsLoadingDatas(false)
      //console.log("AAAA")
      setTimeout(()=> {
        setOpacity(1)
      }, 2000)
      setTimeout(()=>{
        setIsLoadingDatas(true)
      }, 1000)
  }
  },[StyledTheme])


  function handleSelectorAtivos() {
    setShowAtivos(true)
  }

  function handleSelectorCustodiante() {
    setShowAtivos(false)
  }

  useEffect(() => {
    let showCount = 0
    let acao = 0
    arrayAtivos.forEach((el, i) => {
      if (el.ativo === 'A????es/ETFs') {
        acao = 1
        showCount = showCount +1;
      } else if (el.show){
        showCount = showCount +1;
      }
    })
    //console.warn(showCount, acao)
    const increasedHeight = ((showCount * 93) + (acao * 300));
    //console.warn(heightDefault, globalStyles.dimensions.height, increasedHeight)
    setScrollViewHeight(tabsScrollHeight + increasedHeight)
  }, [arrayAtivos])

  function handleClick(tipoAtivo) {
        let newArray = [...arrayAtivos];
        newArray = newArray.map((el, id) => {
          if (el.ativo === tipoAtivo) {
            el.show = !el.show
          }
          return el;
        })
        setArrayAtivos(newArray)
    }

  function handleSelectPie(event) {
      try{
        
        let selectName = event.data.name
        let filtrado = arrayAtivos.filter(ativo => ativo.ativo === selectName)
        filtrado[0].show = true;
        let newArray = [...arrayAtivos];
        newArray = newArray.filter(ativo => ativo.ativo !== selectName)
        newArray.unshift(filtrado[0])
        setArrayAtivos(newArray);
      }catch{

      }
};


      return (
        <SafeAreaView style={{flex: 1, backgroundColor: StyledTheme.colors.background}}>
        { isLoading ? (
            <LoadAnimation/>
          ) : (
        <ScrollView 
        contentContainerStyle={{justifyContent: 'flex-start', 
        alignItems: 'center', 
        width: globalStyles.dimensions.width, 
        height: scrollViewHeight < globalStyles.dimensions.height ? globalStyles.dimensions.height : scrollViewHeight, 
        backgroundColor: StyledTheme.colors.background}}>
        <Title>Carteira</Title>
        <Seletor handleSelectorCustodiante={handleSelectorCustodiante} handleSelectorAtivos={handleSelectorAtivos}/>
        
            <ChartContainer>
              {/*
              { dadosChart.infos ?
                <PieCarteira
                infos={dadosChart.infos}
                handleSelectPie={handleSelectPie}
              />    : null}  */}
              { newDadosChart[0] && !props.isLoadingDadosPosicaoConsolidada ? 
                <NewPieChart data={newDadosChart}
                handleSelectPie={handleSelectPie}
                />
              : null}
            </ChartContainer>
            
       
            <ContainerCards>
              {arrayAtivos.map((el, i) => {
                return <Cards id={i} 
                              title={el.ativo} 
                              value={el.value}
                              data={el.data}
                              key={i} 
                              handleClick={handleClick}
                              show={el.show}
                              cor={el.cor}/>;
              })}
            </ContainerCards>
        </ScrollView>
          )}
        </SafeAreaView>
    )
    
}

const mapStateToProps = state => ({
  isLoadingDadosHomePage: state.dadosHomePage.loading,
  responseDadosHomePage: state.dadosHomePage.response,
  responseDadosPosicaoConsolidada: state.dadosPosicaoConsolidada.data,
  isLoadingDadosPosicaoConsolidada: state.dadosPosicaoConsolidada.loading,
});

export default connect(mapStateToProps)(Carteira);
