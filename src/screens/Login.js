import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler
} from 'react-native';

import CustomInput from '../components/CustomInput';
import FingerPrint from '../components/FingerPrint';

import globalStyles from '../styles/globalStyles';

import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id'
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native';

const Login = ({route, navigation}) => {
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputSenha, setInputSenha] = useState('');

  useEffect(async () => {
    const { credentials} = route.params;
        if (credentials) {
            pressHandler()
        } else {
        }
    }, []);

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
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
              }
              let dateLogin = new Date().getTime() + (1000*60*5);
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

     } else {

     }
   })
   .catch(error => {
     // Failure code

   });
 
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
       .then(async (success) => {
         try {
      
            let credentials = await Keychain.getGenericPassword();
            if (credentials) {
            
              let dateLogin = new Date().getTime() + (1000*60*5);
              AsyncStorage.setItem('token', dateLogin.toString())
              navigation.navigate('Home');
            } else {
            }
          } catch (error) {
          }
       })
       .catch(error => {
       });
   }

  const currentRoute = useRoute()
   useEffect(() => {
    const backAction = () => {
      if(currentRoute.name === 'Login') {
       BackHandler.exitApp() 
      }if (currentRoute.name === 'Home'){
        navigation.navigate('Home')
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

 
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