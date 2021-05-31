import React, {useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import globalStyles from '../styles/globalStyles';
import profile from '../../assets/images/profile.png';

import { ThemeContext } from 'styled-components/native';

import {
  SafeArea,
  ContainerInfos,
  TextUser,

} from '../screens/Profile/style'

import CardAlteraSenha from '../components/Perfil/Cards/CardAlteraSenha/CardAlterarSenha';
import CardDatePicker from  '../components/Perfil/Cards/CardDatePicker/CardDatePicker';
import CardAlteraCarteira from '../components/Perfil/Cards/CardAlteraCarteira/CardAlteraCarteira'
import CardCarousel from '../components/Performance/Portrait/CardCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { connect, Provider } from 'react-redux';
import store from '../store/index';

import { alteraViewMode } from '../store/actions/actions'

import OneSignal from 'react-native-onesignal';

const Profile = ({navigation, stateCarteira, alteraViewMode}) => {
    const [showAlteraSenha, setShowAlteraSenha] = useState(false);
    const [showAlteraCarteira, setShowAlteraCarteira] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [height, setHeight] = useState(630);

    const StyledTheme = useContext(ThemeContext)

    useEffect(()=> {
      OneSignal.setAppId('9c34a82a-2fc6-4d7a-bb50-10512cbba842')
      OneSignal.promptForPushNotificationsWithUserResponse(response => {
        console.log("Prompt response:", response);
      });

      OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
        console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
        let notification = notificationReceivedEvent.getNotification();
        console.log("notification: ", notification);
        const data = notification.additionalData
        console.log("additionalData: ", data);
        const button1 = {
           text: "Cancel",
           onPress: () => { notificationReceivedEvent.complete(); },
           style: "cancel"
        };
        const button2 = { text: "Complete", onPress: () => { notificationReceivedEvent.complete(notification); }};
        Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
       });
      
       OneSignal.setNotificationOpenedHandler(notification => {
         console.log("OneSignal: notification opened:", notification);
       });

    },[])

    const onOpened = (result) => {
      console.log('Mensagem: ', result.notification.payload.body)
      console.log('Result: ', result)
    }

    useEffect(() => {
        let increment = 0;
        if (showDatePicker) {
            increment = increment + 90
        }
        if(showAlteraSenha) {
            increment = increment + 320
        }
        if(showAlteraCarteira){
            increment += 100
        }

        setHeight(700 + increment);
    }, [showAlteraSenha, showDatePicker])

    const handleCardSenha = () => {
        setShowAlteraSenha(!showAlteraSenha);
    };
    const handleCardCarteira = () => {
        setShowAlteraCarteira(!showAlteraCarteira);
    };

    const handleCardDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleClickLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login', {
          credentials: false
        })
    }

    const handleAlteraMode = () => {
      if (stateCarteira.mode === 'dark') {
        alteraViewMode('light')
        AsyncStorage.setItem('mode', 'light')
      } else {
        alteraViewMode('dark')
        AsyncStorage.setItem('mode', 'dark')
      }
    }

  return (
    <SafeArea>
    <ScrollView contentContainerStyle={{height: height, width: globalStyles.dimensions.width,
      backgroundColor: StyledTheme.colors.background, justifyContent: 'flex-start', alignItems: 'center',}}>
    
        <ContainerInfos>
            <Image source={profile} style={styles.profileImage}/>
            <TextUser> Olá, Usuário </TextUser>
        </ContainerInfos> 
        <View>
              <Provider store={store}>
              <CardAlteraCarteira show={showAlteraCarteira} handleClick={handleCardCarteira}/>
              <CardDatePicker
               show={showDatePicker}
               handleClick={handleCardDatePicker}  />
               </Provider>
              <CardAlteraSenha show={showAlteraSenha} handleClick={handleCardSenha}/>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleClickLogout}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        <TouchableOpacity onPress={handleAlteraMode}>
          <View style={[styles.buttonDarkMode, {backgroundColor: StyledTheme.colors.invertedBackground}]}>
            <Text style={{fontSize: 15, color: StyledTheme.colors.background}}>
              {stateCarteira.mode === 'dark' ? 'LightMode' : 'DarkMode'}
            </Text>
          </View>
        </TouchableOpacity>
          
      </ScrollView>
    </SafeArea>
  );
};


const mapStateToProps = state => ({
  stateCarteira: state.dates,
});

const mapDispatchToProps = ( dispatch )=> ({
  alteraViewMode: (mode) => dispatch(alteraViewMode(mode))
}) 
  

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    width: globalStyles.dimensions.width,
    backgroundColor: globalStyles.colors.backGround,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerInfos: {
      marginHorizontal: 20,
      marginVertical: 20,
      flexDirection: 'row',
      backgroundColor: globalStyles.colors.firstLayer,
      borderRadius: 20,
      width: globalStyles.dimensions.width* 0.9,
      height: 150,
      alignItems: 'center',
  },
  profileImage : {
    borderRadius: 60,
    marginLeft: 20,
    height: 120, 
    width: 120, 
    resizeMode: 'stretch',
    },
  textUser: {
    color: globalStyles.colors.fontColor,
    fontSize: 30,
    marginLeft: 20,
  },
  containerDatas: {
    flexDirection: 'row',
    backgroundColor: globalStyles.colors.firstLayer,
    width: globalStyles.dimensions.width * 0.85,
    height: 60,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textLabelData: {
    color: globalStyles.colors.fontColor,
    fontSize: 20,
  },
  textData: {
    color: globalStyles.colors.fontColor,
    fontSize: 18,
  },
  containerCards: {
    flex:1,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: globalStyles.dimensions.width * 0.6,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDarkMode: {
    height: 50,
    width: globalStyles.dimensions.width * 0.4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: globalStyles.colors.fontColor,
    fontSize: 20,
  },
  passwordReset: {
    color: globalStyles.colors.fontColor,
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
});