import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


import globalStyles from '../../styles/globalStyles'

const TableRowData = (props) => {
    console.log(props)
    return (
        <View style={styles.bloco}>
            <View style={{flexDirection:'row'}}>
                <View style={[styles.line, {backgroundColor: props.color}]}></View>
                <Text style={{fontSize: 15, color: 'white', marginBottom: -20}}>{props.label}</Text>
            </View>
            <View>
                <Text style={{fontSize: 13, color: 'white', marginBottom: -20}}>{props.value}</Text>
            </View>
        </View>
    )
}

export default TableRowData

const styles = StyleSheet.create({
    bloco: {
        flexDirection: 'row',  
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 5,
        height: 40,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: globalStyles.colors.firstLayer
      },
    line: {
        height: 15,
        width: 3,
        marginTop: 2,
        marginBottom: -20,
        marginRight: 6
    }
})