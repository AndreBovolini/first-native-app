import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/FontAwesome'

const Benchmarks = props => {
    const [benchmarks, setBenchmarks] = useState(['IBOVESPA','IPCA'])

    const handleBenchmark = (el) => {
        let newArray = [...benchmarks]
        newArray.push(el)
        setBenchmarks(newArray)
        console.log(benchmarks)
    };

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
            
            <View style={styles.titleContainer}> 
              <View style={styles.left}>
                <Icon name="star" size={15} color='#7faeff'/>
                <Text style={styles.title}>CDI</Text> 
              </View>
              <View>
                <TouchableOpacity style={styles.right} >
                  <Icon name="check" size={25} color='#9af688'/>
                </TouchableOpacity>
              </View>
            </View>
            {/* {benchmarks.map((el, i) => {
                return (<View style={styles.titleContainer} key={i}> 
                <View style={styles.left}>
                  <Text style={styles.title}>{el}</Text> 
                </View>
                <View>
                  <TouchableOpacity style={styles.right} >
                    <Icon name="plus" size={25} color='#FFF'/>
                  </TouchableOpacity>
                </View>
              </View> )
              })} */}
            
            <Text style={{fontSize:20, color:'#FFF', marginBottom:10, marginTop: 30}}
                > benchmarks disponíveis: </Text>
            {benchmarks.map((el, i) => {
                return (<View style={styles.titleContainer} key={i}> 
                <View style={styles.left}>
                  <Text style={styles.title}>{el}</Text> 
                </View>
                <View>
                  <TouchableOpacity style={styles.right} onPress={() => handleBenchmark(el)} >
                    <Icon name="plus" size={25} color='#FFF'/>
                  </TouchableOpacity>
                </View>
              </View> )
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