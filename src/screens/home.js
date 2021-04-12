import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ValueBox from '../components/valueBox';
import globalStyles from '../styles/globalStyles';


export const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Portfólio</Text>
            <View style={styles.valueBoxContainer}>
                <View style={styles.valueBoxContainerRow}>
                    <ValueBox title='teste1' value='R$ 400,40'/>
                    <ValueBox title='teste1' value='R$ 400,40'/>
                </View>
                <View style={styles.valueBoxContainerRow}>
                    <ValueBox title='teste1' value='R$ 400,40'/>
                    <ValueBox title='teste1' value='R$ 400,40'/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyles.colors.backGround,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: globalStyles.colors.fontColor,
        fontSize: 40,
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginVertical: 10, 
        marginLeft: 10,
    },
    valueBoxContainer: {
        height: globalStyles.dimensions.height / 3.6,
        width: globalStyles.dimensions.width,
    }, 
    valueBoxContainerRow: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        marginVertical: 5
    }
})
