import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


import globalStyles from '../../../styles/globalStyles'
import TableRowData from './TableRowData'
import TableHeader from './TableHeader';

import { Header } from './styles'

const TableRow = (props) => {

    colors = ['#48A192', '#5456A2', '#7FAADB'];
   
    const keysValues = Object.keys(props.data[0].value);

    let tipoCarrossel = '';

    switch(props.graficoCarrossel) {
        case 1,2,3 :
          tipoCarrossel = 'ativo';
          break;
        case 4,5 :
          tipoCarrossel = 'periodo';
          break;
      }
    

    return (
        <View style={{marginBottom:10}}>
            <Header>
               <TableHeader label={'Ativo'} colors={colors} keys={keysValues} line={ (
                   props.graficoCarrossel === 1 || props.graficoCarrossel === 2 || props.graficoCarrossel === 3
               ) ? false : true}/>
            </Header>
            {props.data.map((el,i)=> {
            return <TableRowData
                    line={ (
                        props.graficoCarrossel === 1 || props.graficoCarrossel === 2 || props.graficoCarrossel === 3
                    ) ? true : false}
                    label={el.label}
                    value={el.value}
                    keys={keysValues}
                    color={colors[i]}
                    key={i}
                />
            })}
        </View>
    )
}

export default TableRow
