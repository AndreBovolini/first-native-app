import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import CustomInput from '../components/CustomInput';
import FingerPrint from '../components/FingerPrint';

import globalStyles from '../styles/globalStyles';

import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id'
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputSenha, setInputSenha] = useState('');

  useEffect(async () => {
    try { 
        let credentials = await Keychain.getGenericPassword();
        if (credentials) {
            pressHandler()
        } else {
          console.log('No credentials stored')
        }
      } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
      }
    }, [])

  const handleForgotPassword = () => {
    navigation.navigate('Reset Password');
  }

  async function handleLogin() {
      if (inputUsuario !== '') {
          if (inputSenha !== '') {
            try{
                await Keychain.setGenericPassword(
                  inputUsuario,
                  inputSenha
                )
              } catch (error) {
                console.log(error)
              }
              let dateLogin = new Date() + (1000*60*30);
              AsyncStorage.setItem('token', dateLogin.toString())
              navigation.navigate('Home');
          }
      };
  }

  const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
  }
 
   async function pressHandler() {
 
     TouchID.isSupported(optionalConfigObject)
   .then(biometryType => {
     // Success code
     if (biometryType === 'FaceID') {
         console.log('FaceID is supported.');
     } else {
         console.log('TouchID is supported.'); 
     }
   })
   .catch(error => {
     // Failure code
     console.log(error);
   });
 
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
       .then(async (success) => {
         try {
      
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
              console.log('Credentials successfully loaded for user ' + credentials.username + ' password: ' + credentials.password);
              let dateLogin = new Date() + (1000*60*30);
              AsyncStorage.setItem('token', dateLogin.toString())
              navigation.navigate('Home');
            } else {
              console.log('No credentials stored')
            }
          } catch (error) {
            console.log('Keychain couldn\'t be accessed!', error);
          }
       })
       .catch(error => {
       });
   }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
            <CustomInput
              placeholder={'Usuario'}
              value={inputUsuario}
              onChangeText={usuario => setInputUsuario(usuario)}
              label={'Usuário:'}
              style={{width: globalStyles.dimensions.width * 0.7, color:'#000'}}
              keyboardType={'email-address'}
              placeholderTextColor={'#aaa'}
            />
            <CustomInput
              placeholder={'Senha'}
              value={inputSenha}
              onChangeText={senha => setInputSenha(senha)}
              label={'Senha:'}
              style={{width: globalStyles.dimensions.width * 0.7, color:'#000'}}
              secureTextEntry={true}
              placeholderTextColor={'#aaa'}
            />
          <TouchableOpacity activeOpacity={0.7} onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleForgotPassword}>
            <Text style={styles.passwordReset}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <FingerPrint pressHandler={pressHandler}/>
          <View style={{flex: 1}}/>
        </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: globalStyles.dimensions.width / 2,
  },
  text: {
    color: '#FFF',
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
    color: '#FFF',
    fontSize: 20,
  },
  passwordReset: {
    color: '#FFF',
  },
});
