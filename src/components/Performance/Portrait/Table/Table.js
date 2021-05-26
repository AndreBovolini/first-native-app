import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import TableRow from './TableRow';

import { dados } from '../../../../data/data'

import globalStyles from '../../../../styles/globalStyles'

import { ContainerTable, ContainerHeader, TextoHeader } from './styles';

const Table = (props) => {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


  return (
    <View style={{height: 500, borderRadius: 20,  width: globalStyles.dimensions.width *0.9}}>
      <ContainerTable>
        <ContainerHeader>
        <TextoHeader>Período</TextoHeader>
          <TextoHeader>Carteira</TextoHeader>
          <TextoHeader>IPCADP</TextoHeader>
          <TextoHeader>%IPCADP</TextoHeader>
        </ContainerHeader>
        <ScrollView nestedScrollEnabled = {true}>
        {dados[props.indiceAno].response.map((el, i) => {
            return (
                <TableRow key={i} index={i} col1={meses[i]} col2={el.carteira} col3={el.IPCADP} col4={el.IPCADPP}/>
            )
        })}
        </ScrollView>
      </ContainerTable>
      </View>
  );
};

export default Table;

