import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'

import TabChart from '../components/TabChart';



const Cards = ({id, title,value, show, handleClick, cor, data}) => {
    function numberToReal(numeros) {
      let numero = numeros.toFixed(2).split('.');
      numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
    }
    const valor = numberToReal(value)

    return (
        <View>
        <View style={[styles.blocoCor, {backgroundColor: cor}]}>
             <View style={styles.bloco}>
               <View style={styles.leftSide}>
                  <Icon name="circle" size={10} color={cor}/>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.right}
                    onPress={()=> handleClick(title)}
                >
                    { show ?   <Icon name="chevron-up" size={20} color={globalStyles.colors.fontColor}/>
                    :  <Icon name="chevron-down" size={20} color={globalStyles.colors.fontColor}/>}
                </TouchableOpacity>
                </View>
             </View>
                { show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: cor}]}>
                    <View style={styles.blocoExpand}>
                      <View style={styles.expandLeft}>
                        <Text style={styles.text}>data: {data}</Text>
                        <Text style={styles.text}>valor: {valor}</Text>
                        { title === 'Ações' ?
                          <View style={styles.chartContainer} >
                            <TabChart title={title}/>
                          </View>
                          : null
                        }
                      </View>
                    </View>
                  </View>
                )}
        </View>
    )
}

export default Cards

const styles = StyleSheet.create({
      text: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
        margin: 8
      },
      bloco: {
        flexDirection: 'row',  
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      },
      blocoCor: {
        flexDirection: 'row',  
        alignItems: 'center',
        marginTop: 20,
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      
      },
      right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20

      },
      blocoExpand: {
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: -10,
        marginBottom: 0,
        padding: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
      },
      blocoExpandCor: {
        flexDirection: 'row',
        backgroundColor: globalStyles.colors.firstLayer,
        width: globalStyles.dimensions.width / 1.15,
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 5,
        padding: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
      },
      leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
      },
      title: {
        color: globalStyles.colors.fontColor,
        fontSize: 23,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginVertical: 5,
    },
      value: {
          color: globalStyles.colors.fontColor,
          fontSize: 25,
      },
      expandLeft:{
        justifyContent: 'space-between'
    },
      expandRigh:{
        justifyContent: 'space-around'
    },
    chartContainer: {
      width: globalStyles.dimensions.width / 1.2,
      height: 250,
      marginTop: 20
    },
    })