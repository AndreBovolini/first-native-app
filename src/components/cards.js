import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'

const Cards = (props) => {

    const [show,setShow] = useState([false])

    function handleClick(index) {
        const newArray = [false,false,false]
        console.log(newArray)
        newArray[index]= !show[index]
        setShow(newArray)
    }
    return (
        <View>
             <View style={styles.bloco}>
                <Text style={styles.text}>Ativo {props.id}</Text>
                <TouchableOpacity style={styles.right}
                    onPress={()=> handleClick(props.id)}
                >
                    { show[props.id] ?   <Icon name="chevron-up" size={20} color="#FFF"/>
                    :  <Icon name="chevron-down" size={20} color="#FFF"/>}
                </TouchableOpacity> 
             </View>
                { show[props.id] && (
                    <View style={styles.blocoExpand}>
                        <Text style={styles.text}>{props.title}</Text>
                        <Text style={styles.text}>{props.value}</Text>
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
        marginTop: 5,
        padding: 5,
        height: 60,
        borderRadius: 10,
        width: 385,
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
        marginBottom: 5,
        padding: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
        
      }
    })