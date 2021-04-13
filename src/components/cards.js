import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../styles/globalStyles';


const Cards = (props) => {

    const [show,setShow] = useState([false]*4)

    function handleClick(index) {
        const newArray = [false,false,false]
        console.log(newArray)
        newArray[index]= !show[index]
        setShow(newArray)
    }
    return (
        <View style={styles.container}>
             <View style={styles.bloco}>
                <Text style={styles.text}>Card {props.id}</Text>
                <TouchableOpacity style={styles.botao}
                    onPress={()=> handleClick(props.id)}
                >
                    <Text style={styles.buttonText}>{show[props.id] ? '-' : '+'}</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
       
      },
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
          width: '60%',
          height: 70,
          borderRadius: 10,
        
      },
      botao: {
        height: 26,
        width: 26,
        backgroundColor: globalStyles.colors.fontColor,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        margin:180,
        position: 'relative',
        
      },
      buttonText: {
        color: '#000',
        fontSize: 20,
        alignItems: 'center',
        justifyContent:'center'
      },
      blocoExpand: {
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 5,
        padding: 5,
        width: '60%',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
        
      }
    })