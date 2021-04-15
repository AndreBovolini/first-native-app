import React, {useState} from 'react';
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
  const [selecionadoPie, setSelecionadoPie] = useState({})
  const [sandwiches, setSandwiches] = useState(35);
  const [salads, setSalads] = useState(35);
  const [soup, setSoup] = useState(35);
  const [beverages, setBeverages] = useState(35);
  const [desserts, setDesserts] = useState(35);


  let ativos = AtivosCarteira.map(n => {
    return n.label
  })
  // let ativos = ['sandwiches', 'salads', 'soup', 'beverages', 'desserts']
  const [show,setShow] = useState([false])
    function handleClick(index) {
        const newArray = [false]
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
        console.log('name ' + selectName)
        handleClick(ativos.indexOf(selectName))
        ativos.splice(ativos.indexOf(selectName, 1))
        ativos.unshift(selectName)
        console.log('ativos '+ ativos)
      }catch{
        setShow([false])
      }
      
    }

    console.log(event.nativeEvent)
};

      return (
        <ScrollView contentContainerStyle={styles.container}>
             <View style={styles.chartContainer}>
                <OutroPie handleSelect={handleSelectPie} 
                selectedEntry={selectedEntry}
                sandwiches={sandwiches}
                salads={salads}
                soup={soup}
                beverages={beverages}
                desserts={desserts}
                valorCentro={selecionadoPie.data ? selecionadoPie.data.label :  'Carteira'}
                />      
            </View>
            {/* <View style={styles.chartContainer}>
                <OutroPie handleSelect={handleSelectPie} 
                selectedEntry={selectedEntry}
                sandwiches={sandwiches}
                salads={salads}
                soup={soup}
                beverages={beverages}
                desserts={desserts}
                valorCentro={selecionadoPie.data ? selecionadoPie.data.value.toString() :  ''}
                />      
            </View> */}
            <View style={styles.containerCards}>
              {ativos.map(n => {
                return <Cards id={ativos.indexOf(n)} 
                              title={n} 
                              value={AtivosCarteira[ativos.indexOf(n)].value}
                              label={AtivosCarteira[ativos.indexOf(n)].label}
                              key={ativos.indexOf(n)} 
                              handleClick={handleClick}
                              show={show}/>;
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
      height: globalStyles.dimensions.height / 1.5,
      marginTop: 20
    },
})