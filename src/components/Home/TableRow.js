import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native';


import globalStyles from '../../styles/globalStyles'
import TableRowData from '../Home/TableRowData'

const TableRow = (props) => {
    console.log(props.data)
    return (
        <View style={{marginBottom:10}}>
            <View  style={styles.header}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 15, color: 'white',}}>Ativo</Text>
                </View>
                <View>
                    <Text style={{fontSize: 15, color: 'white', marginRight: 5}}>Mês</Text>
                </View>
            </View>
            {props.data.map((el,i)=> {
            return <TableRowData 
                    label={el.label}
                    value={el.value}
                    color={el.color}
                    key={i}
                />
            })}
        </View>
    )
}

export default TableRow
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',  
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 5,
        height: 50,
        marginBottom: -15,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between',
        
      },
    bloco: {
        flexDirection: 'row',  
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 5,
        height: 50,
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
        marginRight: 4
    }
})