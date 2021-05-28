import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from 'styled-components';


import { ContainerRow, TextoTable } from './styles';

const TableRow = (props) => {

  const StyledTheme = useContext(ThemeContext)

  return (
      <View style={(props.index % 2) === 0 || props.index === 0 ? styles.containerRow : [styles.containerRow, {backgroundColor: '#252525'}]}>
        <View style={styles.bloco}>
          <Text style={styles.textoTable}>{props.col1}</Text>
        </View>
        <View style={styles.bloco}> 
          <Text style={styles.textoTable}>{props.col2}</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.textoTable}>{props.col3}</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.textoTable}>{props.col4}</Text>
        </View>
      </View>
  );
};

export default TableRow;

const styles = StyleSheet.create({
      containerRow: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 0.5,
      },
      textoTable: {
        fontSize: 18,
        fontWeight: '300',
        color: '#f3f3f3',
      },
      bloco: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 60
      }
});
