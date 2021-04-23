import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../components/CustomInput';

const CardAlteraCarteira = (props) => {
    const [carteira, setAlteraCarteira] = useState('');
    

return (
    <View>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
         <View style={styles.bloco}>
           <View style={styles.leftSide}>
              <Icon name="circle" size={10} color={'#FFF'}/>
              <Text style={styles.title}>Carteira Atual: {carteira}</Text>
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
                      <Picker 
                        style={styles.pickerContainer}
                        mode={'dropdown'}
                        selectedValue={carteira}
                        onValueChange={(carteira) => setAlteraCarteira(carteira)}
                        
                        
                      >
                          <Picker.Item label = "Selecione:" value=""/>
                          <Picker.Item label="Carteira 1" value="Carteira 1" />
                          <Picker.Item label="Carteira 2" value="Carteira 2" />
                          <Picker.Item label="Carteira 3" value="Carteira 3" />

                      </Picker>
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
    button: {
        height: 50,
        width: globalStyles.dimensions.width * 0.6,
        backgroundColor: '#1A0873',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
      },
      pickerContainer: {
          width: 160,
          height: 30,
          color: globalStyles.colors.fontColor,

      }
    })