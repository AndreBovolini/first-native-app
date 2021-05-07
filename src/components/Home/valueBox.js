import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import globalStyles from '../../styles/globalStyles';

const ValueBox = (props) => {
    return (
        <View  style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    )
}

export default ValueBox

const styles = StyleSheet.create({
    container: {
        width: '47%',
        height: '100%',
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 5,

        
    },
    title: {
        color: globalStyles.colors.fontColor,
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginVertical: 5,
    },
    value: {
        color: globalStyles.colors.fontColor,
        fontSize: 30,
    }
})
