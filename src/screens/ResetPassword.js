import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomModal from '../components/ResetPassoword/Modal';

import Icon from 'react-native-vector-icons/FontAwesome'

import globalStyles from '../styles/globalStyles';
import { ThemeContext } from 'styled-components';

const ResetPassword = ({navigation}) => {
  const [inputEmail, setInputEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const StyledTheme = useContext(ThemeContext)

  const handleReturnToLogin = () => {
    navigation.navigate('Login');
  };

  const handleResetPassword = () => {
      setShowModal(true)
  }

  const handleCloseModal = () => {
      setShowModal(false)
      navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
        
      <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={handleReturnToLogin}>
        <Icon name="chevron-left" size={20} color={StyledTheme.colors.fontColor}/>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CustomModal visible={showModal} height={200} width={globalStyles.dimensions.width *0.9} buttonAction={handleCloseModal}/>
        </View>
        <CustomInput
              placeholder={'E-mail'}
              value={inputEmail}
              onChangeText={email => setInputEmail(email)}
              label={'E-mail:'}
              style={{width: globalStyles.dimensions.width * 0.7,height: 40, color:'#000'}}
              keyboardType={'email-address'}
              placeholderTextColor={'#aaa'}
            />
        <TouchableOpacity activeOpacity={0.7} onPress={handleResetPassword}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleReturnToLogin}>
          <Text style={styles.passwordReset}>Voltar ao login</Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.backGround,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: globalStyles.dimensions.width / 2,
  },
  text: {
    color: globalStyles.colors.fontColor,
    fontSize: 24,
  },
  button: {
    height: 50,
    width: globalStyles.dimensions.width * 0.6,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: globalStyles.colors.fontColor,
    fontSize: 20,
  },
  passwordReset: {
    color: globalStyles.colors.fontColor,
  },
});
