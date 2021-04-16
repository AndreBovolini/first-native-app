import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/cards'
import OutroPie from '../components/PieChart';

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
      ativos.push(el.label);
    });
    const newArray = Array(arrayAtivos.length).fill(false);
    setArrayShow(newArray);
    setArrayAtivos(ativos);
  }, []);

  useEffect(() => {
    let showCount = 0
    arrayShow.forEach((el, i) => {
      if (el) {
        showCount = showCount +1;
      }
    })
    const increasedHeight = (showCount * 90);
    setScrollViewHeight(1183 + increasedHeight)
  }, [arrayShow])
  
    function handleClick(index) {
        const newArray = [...arrayShow];
        newArray[index]= !arrayShow[index]
        setArrayShow(newArray);
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
        handleClick(arrayAtivos.indexOf(selectName));
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
                              title={el} 
                              value={AtivosCarteira[arrayAtivos.indexOf(el)].value}
                              data={AtivosCarteira[arrayAtivos.indexOf(el)].data}
                              key={i} 
                              handleClick={handleClick}
                              show={arrayShow[i]}
                              cor={cores[i]}/>;
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