import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/Carteira/Cards/cards'
import OutroPie from '../components/Carteira/GraficoPie/PieChart';

import {
  dataHomeBox,
  AtivosCarteira
} from '../data/data';

const Carteira = ({navigation}) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selecionadoPie, setSelecionadoPie] = useState({});
  const [arrayAtivos, setArrayAtivos] = useState([])
  const [scrollViewHeight, setScrollViewHeight] = useState(1183)
  const [arrayShow, setArrayShow] = useState([])
  const [cores, setCores] = useState(globalStyles.chartColors.pieChartColors);

  useEffect(() => {
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
  }, []);

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
    setScrollViewHeight(1183 + increasedHeight)
  }, [arrayAtivos])
  
    function handleClick(tipoAtivo) {
        // const newArray = [...arrayShow];
        // newArray[index]= !arrayShow[index]
        // setArrayShow(newArray);
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
        // ativos.splice(ativos.indexOf(selectName, 1))
        // ativos.unshift(selectName)
      }catch{

      }
      
    }
};

      return (
        <ScrollView contentContainerStyle={[styles.container, { height: scrollViewHeight}]}>
        <Text style={styles.title}>Carteira</Text>
            <View style={styles.chartContainer}>
                <OutroPie handleSelect={handleSelectPie} 
                selectedEntry={selectedEntry}
                valorCentro={selecionadoPie.data ? selecionadoPie.data.label :  ''}
                />      
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

export default Carteira;

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