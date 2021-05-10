import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/FontAwesome'

const Benchmarks = props => {
    const [benchmarks, setBenchmarks] = useState([
      {   label: 'CDI',
          isSelected: true,
          isFavorite: true,   
      },
      {   label: 'IBOVESPA',
          isSelected: false,
          isFavorite: false   
      },
      {   label: 'IPCA',
          isSelected: false,
          isFavorite: false,
      },
      {   label: 'IGPM',
          isSelected: false,
          isFavorite: false
  
      }])
  

    
    const handleBenchmark = (el,i) => {
        let newArray = [...benchmarks]
        newArray[i].isSelected = true
        setBenchmarks(newArray)

    };
    const handleFavoriteBenchmark = (el,i) => {
        let newArray = [...benchmarks]
        newArray[i].isFavorite = !newArray[i].isFavorite
        newArray[i].isSelected = true
        setBenchmarks(newArray)
        try {
          AsyncStorage.setItem('Selecionados', JSON.stringify(newArray));
          
        } catch (error) {
          
        }
    };

    const handleDeleteBenchmark = (el,i) => {
        let newArray = [...benchmarks]
        newArray[i].isSelected = false
        setBenchmarks(newArray)
    };

    useEffect(async() => {
        try {

            const myArray = await AsyncStorage.getItem('Selecionados');
            if (myArray !== null) {
              let array = JSON.parse(myArray)
              array.map((el, i) => {
                if(array[i].isFavorite === false) {
                  array[i].isSelected = false
                }
              })
              setBenchmarks(array)
            }
          } catch (error) {
          }
    },[]);

    return (
        <View style={styles.container}>
      
      <Modal isVisible={props.visible} 
        hasbackdrop={true} 
        backdropOpacity={0.8}
        onBackButtonPress={props.buttonAction}
        onBackdropPress={props.buttonAction}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onSwipeComplete={props.buttonAction}
        swipeDirection={['down']}
        style={{
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}
        useNativeDriverForBackdrop>

        
        <View
          style={[styles.modal, {backgroundColor:'#252525', height: props.height, width: props.width}]}> 
            <Text style={{fontSize:25, color:'#FFF', marginBottom:15}}>Selecione os benchmarks</Text>
            <Text style={{fontSize:20, color:'#FFF', marginBottom:10}}> benchmarks selecionados: </Text>
  
  
            {benchmarks.map((el, i) => {
               if(el.isSelected) {
                return (<View style={styles.titleContainer} key={i}> 
                <View style={styles.left}>
                  {el.isFavorite ? <TouchableOpacity style={styles.left, {marginLeft:8}} onPress={() => handleFavoriteBenchmark(el,i)}>
                      <Icon name="star" size={22} color='#7faeff'/>
                  </TouchableOpacity> :
                    <TouchableOpacity style={styles.left, {marginLeft:8}} onPress={() => handleFavoriteBenchmark(el,i)}>
                        <Icon name="star" size={20} color='#A9A9A9'/>
                    </TouchableOpacity> }
                  <Text style={styles.title}>{el.label}</Text> 
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.right} onPress={(() => handleDeleteBenchmark(el,i))}>
                    <Icon name="trash" size={25} color='#FFF' style={{marginRight:7}}/>
                  </TouchableOpacity>
                  <Icon name="check" size={25} color='#9af688'/>
                </View>
              </View> )
               }
              })}

            <Text style={{fontSize:20, color:'#FFF', marginBottom:10, marginTop: 30}}
                > benchmarks disponíveis: </Text>
            {benchmarks.map((el, i) => {
                if (!el.isSelected) {
                return (<View style={styles.titleContainer} key={i}> 
                <View style={styles.left}>
                  <TouchableOpacity style={styles.left, {marginLeft:8}} onPress={() => handleFavoriteBenchmark(el,i)}>
                      <Icon name="star" size={20} color='#A9A9A9'/>
                  </TouchableOpacity>
                  <Text style={styles.title}>{el.label}</Text> 
                </View>
                <View>
                  <TouchableOpacity style={styles.right} onPress={() => handleBenchmark(el,i)} >
                    <Icon name="plus" size={25} color='#FFF'/>
                  </TouchableOpacity>
                </View>
              </View> )
              }
              })}
              <View style={styles.buttonClose}>
                  <TouchableOpacity style={styles.right} onPress={props.buttonAction} >
                   <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
        </View>
        
      </Modal>
      
    </View>
  );
};
export default Benchmarks

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
    },
    modal: {
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom:-20,
        paddingRight: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        width: globalStyles.dimensions.width*1.05,
        borderColor: '#D0D0D0',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 25,


    },
    title: {
        color: globalStyles.colors.fontColor,
        marginLeft: 7,
        fontSize: 25,
        fontWeight: '300',
        alignSelf: 'flex-start',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
  
    },
    buttonClose:{
        marginTop: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#3377ff',
        padding: 5,
        borderRadius: 10,
        paddingRight: 8
    },
    buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
      },
})