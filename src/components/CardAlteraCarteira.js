import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../components/CustomInput';
import { Picker } from '@react-native-picker/picker';

const CardAlteraCarteira = (props) => {
    const [carteira, setAlteraCarteira] = useState('Carteira 1');
    

return (
    <View>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
         <View style={styles.bloco}>
           <View style={styles.leftSide}>
              <Icon name="circle" size={10} color={'#FFF'}/>
              <Text style={styles.title}>{`Carteira Atual: ${ carteira }`}</Text>
            </View>
            <TouchableOpacity style={styles.right}
                onPress={()=> props.handleClick()}
            >
                { props.show ?   <Icon name="chevron-up" size={20} color={globalStyles.colors.fontColor}/>
                :  <Icon name="chevron-down" size={20} color={globalStyles.colors.fontColor}/>}
            </TouchableOpacity>
            </View>
         </View>
         { props.show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: '#2A0DB8'}]}>
                    <View style={styles.blocoExpand}>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => setAlteraCarteira('Carteira 1')} >
                            <View style={styles.buttonView}>
                              <Text style={styles.buttonText}>Carteira 1</Text>
                              <Ionicons name={'wallet'} size={18} color={globalStyles.colors.fontColor} />
                            </View>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => setAlteraCarteira('Carteira 2')} >
                            <View style={styles.buttonView}>
                              <Text style={styles.buttonText}>Carteira 2</Text>
                              <Ionicons name={'wallet'} size={18} color={globalStyles.colors.fontColor} />
                            </View>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                )}
    </View>
    )}

export default CardAlteraCarteira;

const styles = StyleSheet.create({
      text: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
        margin: 8
      },
      bloco: {
        flexDirection: 'row',  
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      },
      blocoCor: {
        flexDirection: 'row',  
        alignItems: 'center',
        marginTop: 20,
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      
      },
      right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20

      },
      blocoExpand: {
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: -10,
        marginBottom: 0,
        padding: 5,
        paddingBottom: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
      },
      blocoExpandCor: {
        flexDirection: 'row',
        backgroundColor: globalStyles.colors.firstLayer,
        width: globalStyles.dimensions.width / 1.15,
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 5,
        padding: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
      },
      leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
      },
      title: {
        color: globalStyles.colors.fontColor,
        fontSize: 23,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginVertical: 5,
    },
      value: {
          color: globalStyles.colors.fontColor,
          fontSize: 25,
      },
      expandLeft:{
        justifyContent: 'space-between'
    },
      expandRigh:{
        justifyContent: 'space-around'
    },
    buttonView: {
      height: 40,
      width: 170,
      backgroundColor: '#2A0DB8',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    buttonText: {
      color: globalStyles.colors.fontColor,
      fontSize: 18,
      marginRight: 20,

    }

    })