import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


import globalStyles from '../../../styles/globalStyles'
import { BlocoTitulo, Wrapper, Line, BlocoValor, TextLabelHeader, TextHeader } from './styles';


const TableRowData = (props) => {
    //console.log(props)
    return (
        <Wrapper>
        <BlocoTitulo style={[{width: globalStyles.dimensions.width / (1.15/ (props.keys.length > 3 ? 0.3 : 0.5))}]}>
            <View style={{flexDirection:'row'}}>
                {
                    props.line && (
                        <Line style={[{backgroundColor: props.color}]}></Line>
                    )
                }
                <TextHeader>{props.label}</TextHeader>
            </View>
        </BlocoTitulo>
        <BlocoValor style={[{justifyContent: props.keys.length > 1 ? 'space-between' : 'flex-end', width: globalStyles.dimensions.width / (1.15/ (props.keys.length > 3 ? 0.7 : 0.5))}]}>
           {props.keys.map((el, i) => {
               return (
                <View key={i}>
                <TextLabelHeader>{props.value[el]+'%'}</TextLabelHeader>
            </View>
               )
           })}
        </BlocoValor>
        </Wrapper>
    )
}

export default TableRowData