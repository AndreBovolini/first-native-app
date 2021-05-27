import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../../CustomInput';

import { ThemeContext } from 'styled-components/native';

import {
  Bloco,
  LeftSide,
  Title,
  RightButton,
  BlocoExpand,
  ButtonText,
  ButtonView
} from './style'

const CardAlteraSenha = (props) => {
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [senhaNovamente, setSenhaNovamente] = useState('')
    const [hideSenha, setHideSenha] = useState(true);

    const handleHidePassword = () => {
      setHideSenha(!hideSenha)
    }

    const StyledTheme = useContext(ThemeContext)

    return (
        <View>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
             <Bloco>
               <LeftSide>
                  <Icon name="circle" size={10} color={'#2A0DB8'}/>
                  <Title>Altere sua senha</Title>
                </LeftSide>
                <RightButton onPress={()=> props.handleClick()}
                >
                    { props.show ?   <Icon name="chevron-up" size={20} color={StyledTheme.colors.fontColor}/>
                    :  <Icon name="chevron-down" size={20} color={StyledTheme.colors.fontColor}/>}
                </RightButton>
                </Bloco>
             </View>
                { props.show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: '#2A0DB8'}]}>
                    <BlocoExpand>
                        <CustomInput
                            placeholder={'Senha antiga'}
                            value={senhaAntiga}
                            onChangeText={senha => setSenhaAntiga(senha)}
                            label={'Senha antiga:'}
                            labelColor={StyledTheme.colors.fontColor}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#808080'}
                            
                        />
                        <CustomInput
                            placeholder={'Senha nova'}
                            value={senhaNova}
                            onChangeText={senha => setSenhaNova(senha)}
                            label={'Senha nova:'}
                            labelColor={StyledTheme.colors.fontColor}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#808080'}
                        />
                        <CustomInput
                            placeholder={'Senha nova'}
                            value={senhaNovamente}
                            onChangeText={senha => setSenhaNovamente(senha)}
                            label={'Insira sua senha novamente:'}
                            labelColor={StyledTheme.colors.fontColor}
                            style={{width: globalStyles.dimensions.width * 0.7, height: 40, color:'#000'}}
                            secureTextEntry={true}
                            placeholderTextColor={'#808080'}
                        />
                        <TouchableOpacity activeOpacity={0.7}>
                            <ButtonView>
                                <ButtonText>Alterar senha</ButtonText>
                            </ButtonView>
                        </TouchableOpacity>
                    </BlocoExpand>
                  </View>
                )}
        </View>
    )
}

export default CardAlteraSenha;

const styles = StyleSheet.create({
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
      }
    })