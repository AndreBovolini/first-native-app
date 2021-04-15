import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'

const Cards = ({id, title,value, show, handleClick, cor}) => {

    return (
        <View>
        <View style={[styles.blocoCor, {backgroundColor: cor}]}>
             <View style={styles.bloco}>
                <Text style={styles.text}>{title}</Text>
                <TouchableOpacity style={styles.right}
                    onPress={()=> handleClick(id)}
                >
                    { show ?   <Icon name="chevron-up" size={20} color="#FFF"/>
                    :  <Icon name="chevron-down" size={20} color="#FFF"/>}
                </TouchableOpacity>
                </View>
             </View>
                { show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: cor}]}>
                    <View style={styles.blocoExpand}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.text}>{value}</Text>
                    </View>
                  </View>
                )}
        </View>
    )
}

export default Cards

const styles = StyleSheet.create({
      text: {
        color: '#FFF',
        fontSize: 24,
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
      }
    })