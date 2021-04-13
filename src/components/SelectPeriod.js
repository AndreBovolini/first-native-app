import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const SelectPeriod = props => {
  return (
    <TouchableOpacity onPress={() => props.handleSelecionaAno(props.ano)} activeOpacity={0.7}>
      <View style={ props.ano !== props.anoSelecionado ? styles.container : [styles.container, {backgroundColor: '#C4C4C4'}]}>
        <Text style={ props.ano !== props.anoSelecionado ? styles.anoText : [styles.anoText, {color: '#161616'}]}>{props.ano}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectPeriod;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 60,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anoText: {
    color: '#C4C4C4',
    fontSize: 20,
    fontWeight: '700',
  },
});
