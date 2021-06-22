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
import Ionicons from 'react-native-vector-icons/Ionicons'
import RenderCalendar  from '../components/Perfil/Cards/Calendar/CalendarPicker'
import ToggleAnimation from '../components/Perfil/ToggleAnimation'
import { connect, Provider } from 'react-redux';
import store from '../store/index';
import OneSignal from 'react-native-onesignal';

import { alteraViewMode, logout } from '../store/actions/actions'
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { Value } from 'react-native-reanimated';

const Profile = ({navigation, stateCarteira, alteraViewMode, logout}) => {
    const [showAlteraSenha, setShowAlteraSenha] = useState(false);
    const [showAlteraCarteira, setShowAlteraCarteira] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [height, setHeight] = useState(680);
    const [heightScroll, setHeightScroll] = useState(200)
    const [value, setValue] = useState('not')
    const [accepted, setAccepted] = useState(false)
    const [acceptedProgrammed, setAcceptedProgrammed] = useState(false)
    const StyledTheme = useContext(ThemeContext)

    useEffect(() => {
        let increment = 0;
        if (showDatePicker) {
            increment = increment + heightScroll
        }
        if(showAlteraSenha) {
            increment = increment + 320
        }
        if(showAlteraCarteira){
            increment += 100
        }

        setHeight(750 + increment);
    }, [showAlteraSenha, showDatePicker])

    useEffect(() => {
      OneSignal.setAppId('9c34a82a-2fc6-4d7a-bb50-10512cbba842');
      OneSignal.sendTags({
        "user_teste": acceptedProgrammed ? 'accepted' : null,
        "user_type": accepted ? 'acceptedNotify' : null,
      })
      OneSignal.setLocationShared(false);
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
        const button2 = { text: "Complete", onPress: () => { notificationReceivedEvent.complete(notification); } };
        Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
      });
  
      OneSignal.setNotificationOpenedHandler(notification => {
        console.log("OneSignal: notification opened:", notification);
        navigation.navigate('Home')
      });
  
    }, [acceptedProgrammed, accepted])
  
  
    useEffect(async () => {
      let acceptPush = await AsyncStorage.getItem('Push');
      let acceptPushProgrammed = await AsyncStorage.getItem('PushProgramada');
      //console.warn(acceptPush, acceptPushProgrammed)
      setAccepted(acceptPush === 'true' ? true : false);
      setAcceptedProgrammed(acceptPushProgrammed === 'true' ? true : false);
    }, [])

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
        logout();
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

    async function handleAccept() {
      //(accepted)
      await AsyncStorage.setItem('Push', (!accepted ? 'true' : 'false'))
      setAccepted(!accepted)
      if (accepted === true) {
        setAcceptedProgrammed(false)
        await AsyncStorage.setItem('PushProgramada', ('false'))
      }
    }
  
    async function handleAcceptProgrammed() {
      await AsyncStorage.setItem('PushProgramada', (!acceptedProgrammed ? 'true' : 'false'))
      setAcceptedProgrammed(!acceptedProgrammed)
    }
  

  return (
    <SafeArea>
    <ScrollView contentContainerStyle={{height: height, width: globalStyles.dimensions.width,
      backgroundColor: StyledTheme.colors.background, justifyContent: 'flex-start', alignItems: 'center',}}>
    
        <ContainerInfos>
            <Image source={profile} style={styles.profileImage}/>
            <TextUser> Olá, Usuário </TextUser> 
        </ContainerInfos> 
        
        <TouchableOpacity onPress={handleAccept} style={{ flexDirection: 'row', backgroundColor: StyledTheme.colors.firstLayer, width: globalStyles.dimensions.width * 0.85, borderRadius: 10, height: 30, marginTop:10}}>	
              <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, marginLeft: 10, color: StyledTheme.colors.fontColor }}>Notificações Push: </Text>	
              <View>	
                {!accepted ?	
                  (	
                    <View style={{ flexDirection: 'row' }}>	
                      <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, color: StyledTheme.colors.fontColor }}>Off</Text>	
                      <Ionicons name="notifications-off-circle" size={25} color={StyledTheme.colors.fontColor} style={{ marginTop: 2, marginRight: 10, }} />	
                    </View>	
                  )	
                  :	
                  (	
                    <View style={{ flexDirection: 'row' }}>	
                      <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, color: StyledTheme.colors.fontColor }}>On</Text>	
                      <Ionicons name="notifications-circle" size={25} color={StyledTheme.colors.fontColor} style={{ marginTop: 2, marginRight: 10, }} />	
                    </View>	
                  )	
                }
              </View>	
            </TouchableOpacity>

            {
              accepted ?
              <TouchableOpacity onPress={handleAcceptProgrammed} style={{ flexDirection: 'row', backgroundColor: StyledTheme.colors.firstLayer, width: globalStyles.dimensions.width * 0.85, borderRadius: 10, height: 30, marginTop:10}}>	
              <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, marginLeft: 10, color: StyledTheme.colors.fontColor }}>Notificações Programadas: </Text>	
              <View>	
                {!acceptedProgrammed ?	
                  (	
                    <View style={{ flexDirection: 'row' }}>	
                      <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, color: StyledTheme.colors.fontColor }}>Off</Text>	
                      <Ionicons name="notifications-off-circle" size={25} color={StyledTheme.colors.fontColor} style={{ marginTop: 2, marginRight: 10, }} />	
                    </View>	
                  )	
                  :	
                  (	
                    <View style={{ flexDirection: 'row' }}>	
                      <Text style={{ fontSize: 20, marginTop: 4, marginRight: 10, color: StyledTheme.colors.fontColor }}>On</Text>	
                      <Ionicons name="notifications-circle" size={25} color={StyledTheme.colors.fontColor} style={{ marginTop: 2, marginRight: 10, }} />	
                    </View>	
                  )	
                }	
              </View>	
            </TouchableOpacity>
            : null
            }
        
        <View>
              <Provider store={store}>
              <CardAlteraCarteira show={showAlteraCarteira} handleClick={handleCardCarteira}/>
              <CardDatePicker
               show={showDatePicker}
               handleClick={handleCardDatePicker}
               />
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
  alteraViewMode: (mode) => dispatch(alteraViewMode(mode)),
  logout: () => dispatch(logout())
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