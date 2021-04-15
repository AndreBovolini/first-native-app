import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TableRow = (props) => {
  return (
      <View style={(props.index % 2) === 0 || props.index === 0 ? styles.containerRow : [styles.containerRow, {backgroundColor: '#252525'}]}>
        <Text style={styles.textoTable}>{props.col1}</Text>
        <Text style={styles.textoTable}>{props.col2}</Text>
        <Text style={styles.textoTable}>{props.col3}</Text>
        <Text style={styles.textoTable}>{props.col4}</Text>
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
});
