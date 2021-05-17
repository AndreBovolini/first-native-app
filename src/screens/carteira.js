import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/Carteira/Cards/cards'
import PieCarteira from '../components/Carteira/GraficoPie/PieChart';
import Seletor from '../components/Carteira/Seletor'

import { resposta2 } from '../data/dataTeste';

import {
  AtivosCarteira,
  dataHomeBox,
} from '../data/data';


import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { dataPieChart } from '../components/Carteira/GraficoPie/dataPieChart';

import { connect } from 'react-redux';

const Carteira = (props) => {
  const [arrayAtivos, setArrayAtivos] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selecionadoPie, setSelecionadoPie] = useState({});
  const [scrollViewHeight, setScrollViewHeight] = useState(1183)
  const [cores, setCores] = useState(globalStyles.chartColors.pieChartColors);
  const [teste,setTeste]=useState({
    teste:false
  }
)
const [dadosChart, setDadosChart] = useState({})
const [showAtivos, setShowAtivos ] = useState(true)
const [heightDefault, setHeightDefault] = useState((AtivosCarteira.length-1)*90)
const [lengthAtivos, setLengthAtivos] = useState(AtivosCarteira.length)



  useEffect(() => {
    if (!props.isLoadingDadosHomePage && props.responseDadosHomePage !== []) {
      const keysAtivos = Object.keys(showAtivos ? resposta2.grafico0 : resposta2.grafico1)
    const AtivosCarteira = keysAtivos.map((el,i) => {
      return {
        value: parseFloat(showAtivos ? resposta2.grafico0[el] : resposta2.grafico1[el]),
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

    setArrayAtivos(ativos);
    console.log(arrayAtivos)
    if(arrayAtivos.length !== 0 ) {
      setLengthAtivos(arrayAtivos.length)
    }else{
      setLengthAtivos(AtivosCarteira.length)
    }
    
    const infos = dataPieChart(showAtivos ? resposta2.grafico0 : resposta2.grafico1)
    setDadosChart(infos)
    }
    
    
  }, [showAtivos, props.isLoadingDadosHomePage, props.responseDadosHomePage]);

  
  function handleSelectorAtivos() {
    console.log(lengthAtivos + ' here' )
    setShowAtivos(true)
    setHeightDefault((lengthAtivos-1)*90)
  }
  function handleSelectorCustodiante() {
    console.log(lengthAtivos + ' here' )
    setShowAtivos(false)
    setHeightDefault((lengthAtivos-1)*90)
  }

  useEffect(() => {
    let showCount = 0
    let acao = 0
    arrayAtivos.forEach((el, i) => {
      if (el.ativo === 'Ações') {
        acao = 1
        showCount = showCount +1;
      } else if (el.show){
        showCount = showCount +1;
      }
    })
    const increasedHeight = ((showCount * 93) + (acao * 300));
    setScrollViewHeight(heightDefault + globalStyles.dimensions.height + increasedHeight)
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
    let entry = event.nativeEvent
    if (entry == null) {
      setSelectedEntry(null)
      
    } else {
      setSelectedEntry(JSON.stringify(entry))
      setSelecionadoPie(entry)
      try{
        let selectName = event.nativeEvent.data.label
        let filtrado = arrayAtivos.filter(ativo => ativo.ativo === selectName)
        filtrado[0].show = true;
        let newArray = [...arrayAtivos];
        newArray = newArray.filter(ativo => ativo.ativo !== selectName)
        newArray.unshift(filtrado[0])
        setArrayAtivos(newArray);
      }catch{

      }
      
    }
};


      return (
        <ScrollView contentContainerStyle={[styles.container, { height: scrollViewHeight}]}>
        <Text style={styles.title}>Carteira</Text>
        <Seletor handleSelectorCustodiante={handleSelectorCustodiante} handleSelectorAtivos={handleSelectorAtivos}/>
            <View style={styles.chartContainer}>
              { dadosChart.infos ?
                <PieCarteira
                infos={dadosChart.infos}
                handleSelectPie={handleSelectPie}
                />    : null}  
            </View>
            <View style={styles.containerCards}>
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
            </View>
        </ScrollView>
    )
    
}

const mapStateToProps = state => ({
  isLoadingDadosHomePage: state.dadosHomePage.loading,
  responseDadosHomePage: state.dadosHomePage.response,
});

export default connect(mapStateToProps)(Carteira);

const styles = StyleSheet.create({
      container: {
        width: globalStyles.dimensions.width,
        backgroundColor: globalStyles.colors.backGround,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      title: {
        color: globalStyles.colors.fontColor,
        fontSize: 40,
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginVertical: 10, 
        marginLeft: 10,
    },
      text: {
        color: globalStyles.colors.fontColor,
        fontSize: 24,
      },
    containerCards: {
      flex:1,
      alignItems: 'center',
    },
    chartContainer: {
      width: globalStyles.dimensions.width,
      height: 382,
      marginTop: 20
    },
    
})