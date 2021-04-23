import React, {useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

import CustomInput from '../components/CustomInput';

import globalStyles from '../styles/globalStyles';
import profile from '../../assets/images/profile.png';

import CardAlteraSenha from '../components/CardAlterarSenha';
import CardDatePicker from  '../components/CardDatePicker';
import CardAlteraCarteira from '../components/CardAlteraCarteira'

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Profile = ({navigation}) => {
    const [showAlteraSenha, setShowAlteraSenha] = useState(false);
    const [showAlteraCarteira, setShowAlteraCarteira] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dataInicial, setDataInicial] = useState(new Date('2017-08-03'));
    const [dataFinal, setDataFinal] = useState(new Date());
    const [height, setHeight] = useState(620);

    useEffect(() => {
        let increment = 0;
        if (showDatePicker) {
            increment = increment + 80
        }
        if(showAlteraSenha) {
            increment = increment + 320
        }
        if(showAlteraCarteira){
            increment += 80
        }

        setHeight(620 + increment);
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

    const handleAlteraDataInicial = (data) => {
        setDataInicial(data.nativeEvent.timestamp);
    };

    const handleAlteraDataFinal = (data) => {
        setDataFinal(data.nativeEvent.timestamp);
    };

    const handleClickLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login', {
          credentials: false
        })
    }

  return (
    <View style={{flex: 1, backgroundColor: globalStyles.colors.backGround}}>
    <ScrollView contentContainerStyle={[styles.container, {height: height}]}>
        <View style={styles.containerInfos}>
            <Image source={profile} style={styles.profileImage}/>
            <Text style={styles.textUser}>Olá, Usuário</Text>
        </View>
        {/* <Text>Período de Análise:</Text>
        <View style={styles.containerDatas}>
        <Ionicons name={'calendar'} size={20} color={globalStyles.colors.fontColor} />
            <View>
                <Text style={styles.textLabelData}>Data inicial:</Text>
                <Text style={styles.textData}>{dataInicial.toLocaleDateString()}</Text>
            </View>
            <View>
                <Text style={styles.textLabelData}>Data Final:</Text>
                <Text style={styles.textData}>{dataFinal.toLocaleDateString()}</Text> 
            </View>
        </View> */}
        <View>
              <CardAlteraCarteira show={showAlteraCarteira} handleClick={handleCardCarteira}/>
              <CardDatePicker
               show={showDatePicker}
               handleClick={handleCardDatePicker}
               dataInicial={dataInicial}
               dataFinal={dataFinal}
               handleAlteraDataFinal={handleAlteraDataFinal} 
               handleAlteraDataInicial={handleAlteraDataInicial} />
              <CardAlteraSenha show={showAlteraSenha} handleClick={handleCardSenha}/>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleClickLogout}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default Profile;

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
    resizeMode: 'stretch'
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