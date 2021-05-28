import React, {useContext, useState} from 'react';
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
import FingerPrint from '../components/Login/FingerPrint';

import globalStyles from '../styles/globalStyles';

import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id'
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native';

import comdadoLogin from '../dados/conta/Login';

import { Container, TextCustom, ButtonView, ButtonText, PasswordReset } from './Login/styles';
import { ThemeContext } from 'styled-components';


const Login = ({route, navigation}) => {
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [hideSenha, setHideSenha] = useState(true);
  const [showCredenciaisErradas, setShowCredenciaisErradas] = useState(false)

  const StyledTheme = useContext(ThemeContext)

  useEffect(async () => {
    await AsyncStorage.removeItem('Carteira')
    const { credentials} = route.params;
        if (credentials) {
            pressHandler()
        } else {
        }
    }, []);

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  }

  function handleErrologin() {
    setShowCredenciaisErradas(true)
    setTimeout(
      () => {setShowCredenciaisErradas(false)}, 5000
    )
  }

  async function handleLogin() {
   //await AsyncStorage.removeItem('Carteira')
      if (inputUsuario !== '') {
          if (inputSenha !== '') {
            comdadoLogin(inputUsuario, inputSenha).then( async (response) => {
            
              await AsyncStorage.setItem('token', response['access_token'].toString())
              await AsyncStorage.setItem('expiration', response['expires_in'].toString())
              setInputSenha('');
              setInputUsuario('')

              try{
                await Keychain.setGenericPassword(
                  inputUsuario,
                  inputSenha
                )
              } catch (error) {
              }
              navigation.navigate('AfterLogin');
            }
            )
            .catch(error => {
              console.log(error);
              handleErrologin();
            })
            
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
              console.warn(credentials)
              comdadoLogin(credentials.username, credentials.password).then( async (response) => {
            
                await AsyncStorage.setItem('token', response['access_token'].toString())
                await AsyncStorage.setItem('expiration', response['expires_in'].toString())
  
                try{
                  await Keychain.setGenericPassword(
                    inputUsuario,
                    inputSenha
                  )
                } catch (error) {
                }
                navigation.navigate('AfterLogin');
              }
              )
              .catch(error => {
                console.log(error);
                handleErrologin();
              })
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

    const handleHidePassword = () => {
      setHideSenha(!hideSenha)
    }
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Container>
            <CustomInput
              placeholder={'Usuario'}
              value={inputUsuario}
              onChangeText={usuario => setInputUsuario(usuario)}
              label={'Usuário:'}
              style={{width: globalStyles.dimensions.width * 0.67, height: 40, color: StyledTheme.colors.background}}
              keyboardType={'email-address'}
              placeholderTextColor={'#aaa'}
              type={'usuário'}
            />
            <CustomInput
              placeholder={'Senha'}
              value={inputSenha}
              onChangeText={senha => setInputSenha(senha)}
              label={'Senha:'}
              style={{width: globalStyles.dimensions.width * 0.6, color: StyledTheme.colors.background}}
              secureTextEntry={hideSenha}
              placeholderTextColor={'#aaa'}
              type={'senha'}
              hidePassword={handleHidePassword}
            />
            { showCredenciaisErradas ?
            (<Text style={{color: 'red', fontSize: 16}}>Credencias inválidas</Text>)
            : null }
          <TouchableOpacity activeOpacity={0.7} onPress={handleLogin}>
            <ButtonView>
              <ButtonText>Login</ButtonText>
            </ButtonView>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={handleForgotPassword}>
            <PasswordReset>Esqueceu a senha?</PasswordReset>
          </TouchableOpacity>
          <FingerPrint pressHandler={pressHandler}/>
          <View style={{flex: 1}}/>
          <ButtonText style={{paddingBottom: 20}}>0.1.0</ButtonText>
        </Container>
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