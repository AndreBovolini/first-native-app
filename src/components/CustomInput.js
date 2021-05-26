import React  from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomInput = (props) => {

  return (
    <View style={styles.container}>
      <View>
        <Text style={props.labelColor}>{props.label}</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput {...props} />
        {props.type === 'senha' && props.secureTextEntry ?
        <TouchableOpacity onPress={props.hidePassword}>
        <Ionicons name="eye-off" size={20} color='#000' style={{marginTop: 15, marginRight: 10, }}/>
        </TouchableOpacity>: null}
        {props.type === 'senha' && !props.secureTextEntry ?
        <TouchableOpacity onPress={props.hidePassword}>
        <Ionicons name="eye" size={20} color='#000' style={{marginTop: 15, marginRight: 10, }}/>
        </TouchableOpacity>: null}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    container:{
        height: 80,
    },
    label: {
        color: globalStyles.colors.fontColor,
    },
    containerInput: {
      flexDirection: 'row',
      // width: globalStyles.dimensions.width * 0.7,
        backgroundColor: '#FFF',
        borderRadius: 10,
    }
})
