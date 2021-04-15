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
  const [cores, setCores] = useState(['#5456A2','#7A77B7','#ABA2D0','#5f8dca','#7FAADB', '#a7d7d2', '#48A192']);

  useEffect(() => {
    let ativos = []
    AtivosCarteira.forEach((el, i) => {
      ativos.push(el.label);
    });
    setArrayAtivos(ativos);
  }, []);
  
  const [show,setShow] = useState([false])
    function handleClick(index) {
        const newArray = Array(arrayAtivos.length).fill(false)
        newArray[index]= !show[index]
        setShow(newArray)
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
        setShow([false])
      }
      
    }

    console.log(event.nativeEvent)
};

      return (
        <ScrollView contentContainerStyle={styles.container}>
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
                              value={el} 
                              key={i} 
                              handleClick={handleClick}
                              show={show[i]}
                              cor={cores[i]}/>;
              })}
            </View>
        </ScrollView>
    )
    
}

export default Carteira;

const styles = StyleSheet.create({
      container: {
        height: globalStyles.dimensions.height *2,
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
      height: globalStyles.dimensions.height / 1.8,
      marginTop: 20
    },
})