import React  from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons'

import { Container, ContainerInput, Label} from './CustomInput/styles'

const CustomInput = (props) => {

  return (
    <Container>
      <View>
        <Text style={props.labelColor}>{props.label}</Text>
      </View>
      <ContainerInput>
        <TextInput {...props} />
        {props.type === 'senha' && props.secureTextEntry ?
        <TouchableOpacity onPress={props.hidePassword}>
        <Ionicons name="eye-off" size={20} color='#000' style={{marginTop: 15, marginRight: 10, }}/>
        </TouchableOpacity>: null}
        {props.type === 'senha' && !props.secureTextEntry ?
        <TouchableOpacity onPress={props.hidePassword}>
        <Ionicons name="eye" size={20} color='#000' style={{marginTop: 15, marginRight: 10, }}/>
        </TouchableOpacity>: null}
      </ContainerInput>
    </Container>
  );
};

export default CustomInput;

