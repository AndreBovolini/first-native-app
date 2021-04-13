import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import globalStyles from '../styles/globalStyles';


const Carteira = ({navigation}) => {

    return (
        <View style={styles.container}>
           
            <Text style={styles.text}>Carteira</Text>
        </View>
    )
}

export default Carteira;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyles.colors.backGround,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: globalStyles.dimensions.width / 4,
      },
      text: {
        color: globalStyles.colors.fontColor,
        fontSize: 24,
      },
})