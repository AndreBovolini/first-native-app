import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import Cards from '../components/cards'

const Performance = ({navigation}) => {

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Performance</Text>
        
            <ScrollView style={styles.containerCard}>
                <Cards id={1} title='teste1' value='R$ 400,40'/>
                <Cards id={2} title='teste1' value='R$ 400,40'/>
                <Cards id={3} title='teste1' value='R$ 400,40'/>
                <Cards id={4} title='teste1' value='R$ 400,40'/>
                <Cards id={5} title='teste1' value='R$ 400,40'/>
                <Cards id={6} title='teste1' value='R$ 400,40'/>
                
            </ScrollView>

  </SafeAreaView>
    )
}

export default Performance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.backGround,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 55,
    borderBottomColor: '#000',
    
    
    
},
    title: {
        color: globalStyles.colors.fontColor,
        fontSize: 40,
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginVertical: 10, 
        marginLeft: 10,
},
  containerCard: {
    flex: 1,
    backgroundColor: '#000',
  }
  })
