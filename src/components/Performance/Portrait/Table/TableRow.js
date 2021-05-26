import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from 'styled-components';


import { ContainerRow, TextoTable } from './styles';

const TableRow = (props) => {

  const StyledTheme = useContext(ThemeContext)

  return (
      <ContainerRow style={(props.index % 2) === 0 || props.index === 0 ? {} : {backgroundColor: StyledTheme.colors.tableColor}}>
        <TextoTable>{props.col1}</TextoTable>
        <TextoTable>{props.col2}</TextoTable>
        <TextoTable>{props.col3}</TextoTable>
        <TextoTable>{props.col4}</TextoTable>
      </ContainerRow>
  );
};

export default TableRow;

