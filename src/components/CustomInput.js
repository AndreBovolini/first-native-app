import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput {...props} />
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
        color: '#FFF',
    },
    containerInput: {
        backgroundColor: '#FFF',
        borderRadius: 10
    }
})
