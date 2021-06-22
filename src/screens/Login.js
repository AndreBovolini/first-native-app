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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [saveUser, setSaveUser] = useState(true)
  const [showSave, setShowSave] = useState(true)

  const StyledTheme = useContext(ThemeContext)

  useEffect(async () => {
    await AsyncStorage.removeItem('Carteira')
    const { credentials} = route.params;
        if (credentials) {
            fillCredentials()
            pressHandler()
            setShowSave(false)
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
               if (response.allowed.includes('COMAPP001')) {
              let fixedDate = new Date(response.expires_in.replace('-', '/').replace('-', '/') + ' -0300');
              await AsyncStorage.setItem('token', response['access_token'].toString())
              await AsyncStorage.setItem('expiration', fixedDate.getTime().toString())
              await AsyncStorage.setItem('token_type', response['token_type'])
              setInputSenha('');

              try{
                if (saveUser) {
                await Keychain.setGenericPassword(
                  inputUsuario,
                  inputSenha
                )
                }
              } catch (error) {
              }
              navigation.navigate('AfterLogin');
            } else {
              handleErrologin();
            }
            
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

  async function fillCredentials() {
    let credentials = await Keychain.getGenericPassword();
    setInputUsuario(credentials.username);
    setInputSenha(credentials.password);
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
              //console.warn(credentials)
              comdadoLogin(credentials.username, credentials.password).then( async (response) => {
            
                if (response.allowed.includes('COMAPP001')) {
                  let fixedDate = new Date(response.expires_in.replace('-', '/').replace('-', '/') + ' -0300');
                  await AsyncStorage.setItem('token', response['access_token'].toString())
                  await AsyncStorage.setItem('expiration', fixedDate.getTime().toString())
                  await AsyncStorage.setItem('token_type', response['token_type'])
                  setInputSenha('');
                  navigation.navigate('AfterLogin');
                } else {
                  handleErrologin();
                }
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
            { showSave ?
            <View style={{flexDirection: 'row', marginBottom: 10, marginLeft: -40}}>
              <TouchableOpacity onPress={() => {setSaveUser(!saveUser)}}>
                {saveUser? 
                <Ionicons name="checkbox" size={16} color={'#FFF'}/>
                :
                <Ionicons name="square-outline" size={16} color={'#FFF'}/>
                }
              </TouchableOpacity>
              <Text style={styles.textSalvar}>Manter-me conectado</Text>
            </View>
           : null}

              
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
          <ButtonText style={{paddingBottom: 20}}>0.1.1</ButtonText>
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
  textSalvar: {
    color: '#FFF',
    fontSize: 15,
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