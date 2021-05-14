import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../CustomInput';



const CardAlteraSenha = (props) => {
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [senhaNovamente, setSenhaNovamente] = useState('')
    const [hideSenha, setHideSenha] = useState(true);

    const handleHidePassword = () => {
      setHideSenha(!hideSenha)
    }


    return (
        <View>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
             <View style={styles.bloco}>
               <View style={styles.leftSide}>
                  <Icon name="circle" size={10} color={'#FFF'}/>
                  <Text style={styles.title}>Altere sua senha</Text>
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
                        <CustomInput
                            placeholder={'Senha antiga'}
                            value={senhaAntiga}
                            onChangeText={senha => setSenhaAntiga(senha)}
                            label={'Senha antiga:'}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#aaa'}
                            
                        />
                        <CustomInput
                            placeholder={'Senha nova'}
                            value={senhaNova}
                            onChangeText={senha => setSenhaNova(senha)}
                            label={'Senha nova:'}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#aaa'}
                        />
                        <CustomInput
                            placeholder={'Senha nova'}
                            value={senhaNovamente}
                            onChangeText={senha => setSenhaNovamente(senha)}
                            label={'Insira sua senha novamente:'}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#aaa'}
                        />
                        <TouchableOpacity activeOpacity={0.7}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Alterar senha</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                )}
        </View>
    )
}

export default CardAlteraSenha;

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
    })