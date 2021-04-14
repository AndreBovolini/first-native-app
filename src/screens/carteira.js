import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/cards'

import {
  dataHomeBox
} from '../data/data';

const Carteira = ({navigation}) => {

    return (
        <View style={styles.container}>
           
            <Text style={styles.text}>Carteira</Text>
            <View style={styles.containerCards}>
              <Cards id={0} title={dataHomeBox[0].label} value={dataHomeBox[0].value + ' %'}/>
              <Cards id={1} title={dataHomeBox[1].label} value={dataHomeBox[1].value + ' %'}/>
              <Cards id={2} title={dataHomeBox[2].label} value={dataHomeBox[2].value + ' %'}/>
            </View>
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
    containerCards: {
      flex:1,
      alignItems: 'center',
    }
})