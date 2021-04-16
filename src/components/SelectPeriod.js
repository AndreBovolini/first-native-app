import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';


const SelectPeriod = props => {
  return (
    <TouchableOpacity onPress={() => props.handleSelecionado(props.ano)} activeOpacity={0.7}>
      <View style={ props.ano !== props.selecionado ? styles.container : [styles.container, {backgroundColor: '#C4C4C4'}]}>
        <Text style={ props.ano !== props.selecionado ? styles.anoText : [styles.anoText, {color: '#161616'}]}>{props.ano}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectPeriod;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 60,
    backgroundColor: globalStyles.colors.backGround,
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
