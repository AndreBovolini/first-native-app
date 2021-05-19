import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import TableRow from './TableRow';

import { dados } from '../../../../data/data'

import globalStyles from '../../../../styles/globalStyles'

const Table = (props) => {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


  return (
    <View style={{height: 500, borderRadius: 20,  width: globalStyles.dimensions.width *0.9}}>
      <View style={styles.containerTable} >
        <View style={styles.containerHeader}>
        <Text style={styles.textoHeader}>Período</Text>
          <Text style={styles.textoHeader}>Carteira</Text>
          <Text style={styles.textoHeader}>IPCADP</Text>
          <Text style={styles.textoHeader}>%IPCADP</Text>
        </View>
        <ScrollView nestedScrollEnabled = {true}>
        {dados[props.indiceAno].response.map((el, i) => {
            return (
                <TableRow key={i} index={i} col1={meses[i]} col2={el.carteira} col3={el.IPCADP} col4={el.IPCADPP}/>
            )
        })}
        </ScrollView>
      </View>
      </View>
  );
};

export default Table;

const styles = StyleSheet.create({
    containerTable: {
        width: globalStyles.dimensions.width *0.90,
        height: 500,
        marginVertical: 5,
        marginHorizontal: 0,
        backgroundColor: '#161616',
        borderRadius: 20,
      },
      containerHeader: {
        flexDirection: 'row',
        height: 35,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
      },
      textoHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#161616',
      },
});
