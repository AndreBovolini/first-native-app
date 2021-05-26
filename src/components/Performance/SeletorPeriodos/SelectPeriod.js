import React, { useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ThemeContext } from 'styled-components';
import globalStyles from '../../../styles/globalStyles';

import { Container, AnoText } from './styles'


const SelectPeriod = props => {

  const StyledTheme = useContext(ThemeContext)

  return (
    <TouchableOpacity onPress={() => props.handleSelecionado(props.ano)} activeOpacity={0.7}>
      <Container style={ props.ano !== props.selecionado ? {} : {backgroundColor: StyledTheme.colors.secondLayer}}>
        <AnoText style={ props.ano !== props.selecionado ? {} : {color: StyledTheme.colors.firstLayer}}>{props.ano}</AnoText>
      </Container>
    </TouchableOpacity>
  );
};

export default SelectPeriod;
