import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


import globalStyles from '../../../styles/globalStyles'

import { Wrapper, BlocoTitulo, BlocoValor, Line, TextHeader, TextLabelHeader } from './styles'

const TableHeader = (props) => {
    //console.log(props)
    return (
        <Wrapper>
        <BlocoTitulo style={[{width: globalStyles.dimensions.width / (1.15/ (props.keys.length > 3 ? 0.3 : 0.5))}]}>
            <View style={{flexDirection:'row'}}>
                <TextHeader >{props.label}</TextHeader>
            </View>
        </BlocoTitulo>
        <BlocoValor style={[{justifyContent: props.keys.length > 1 ? 'space-between' : 'flex-end', width: globalStyles.dimensions.width / (1.15/ (props.keys.length > 3 ? 0.7 : 0.5))}]}>
           {props.keys.map((el, i) => {
               return (
                <View key={i} style={{flexDirection: 'row'}}>
                    {
                        props.line === true && (
                            <Line style={[{backgroundColor: props.colors[i]}]}></Line>
                        )
                    }
                <TextLabelHeader>{el}</TextLabelHeader>
                </View>
               )
           })}
        </BlocoValor>
        </Wrapper>
    )
}

export default TableHeader
