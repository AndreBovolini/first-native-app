import React, {useState, useContext} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import Modal from 'react-native-modal';
import globalStyles from '../../../styles/globalStyles';
import { ThemeContext } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardAlteraCarteira from '../../Perfil/Cards/CardAlteraCarteira/CardAlteraCarteira'
import CardDatePicker from  '../../../components/Perfil/Cards/CardDatePicker/CardDatePicker';
import { Container, ModalCustom, Button, ButtonText } from './styles';
const handleCardCarteira = () => {
    setShowAlteraCarteira(!showAlteraCarteira);
  };

const Filtro = props => {
    const [showAlteraCarteira, setShowAlteraCarteira] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dataInicial, setDataInicial] = useState(new Date('2017-08-03'));
    const [dataFinal, setDataFinal] = useState(new Date());
    
    const StyledTheme = useContext(ThemeContext)

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

    const handleAccept = () => {
      if (props.accepted === '') {
        props.handleAccept("acceptedNotify")
        console.warn('Recebimento ativado')
      } else {
         props.handleAccept("")
        console.warn('Recebimento desativado')
      }
    };
  
  
    return (
      
    <Container>
      
      <Modal isVisible={props.visible} 
        hasbackdrop={true} 
        backdropOpacity={0.8}
        onBackButtonPress={props.buttonAction}
        onBackdropPress={props.buttonAction}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onSwipeComplete={props.buttonAction}
        swipeDirection={['right']}
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 15
      }}
        useNativeDriverForBackdrop>

        
        <ModalCustom
          style={{height: props.height, width: props.width, marginTop: Platform.OS === 'ios' ? 30 : 0}}>
          <View style={{ flexDirection: 'row', backgroundColor: StyledTheme.colors.firstLayer, width: globalStyles.dimensions.width * 0.90, borderRadius: 10, height: 50, marginTop:10}}>
              <Text style={{ fontSize: 20, marginTop: 12, marginRight: 10, marginLeft: 40, color: StyledTheme.colors.fontColor }}>Notificações Push: </Text>
              <TouchableOpacity onPress={handleAccept}>
                {props.accepted === '' ?
                  (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 20, marginTop: 12, marginRight: 10, color: StyledTheme.colors.fontColor }}>Desativado</Text>
                      <Ionicons name="notifications-off-circle" size={30} color={StyledTheme.colors.fontColor} style={{ marginTop: 10, marginRight: 10, }} />
                    </View>
                  )
                  :
                  (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 20, marginTop: 12, marginRight: 10, color: StyledTheme.colors.fontColor }}>Ativado</Text>
                      <Ionicons name="notifications-circle" size={30} color={StyledTheme.colors.fontColor} style={{ marginTop: 10, marginRight: 10, }} />
                    </View>
                  )
                }

              </TouchableOpacity>
            </View>
          <CardAlteraCarteira show={showAlteraCarteira} handleClick={handleCardCarteira}/>
          <CardDatePicker
               show={showDatePicker}
               handleClick={handleCardDatePicker}
               dataInicial={dataInicial}
               dataFinal={dataFinal}
               handleAlteraDataFinal={handleAlteraDataFinal} 
               handleAlteraDataInicial={handleAlteraDataInicial} />
          <TouchableOpacity activeOpacity={0.7} onPress={props.buttonAction}>
            <Button>
              <ButtonText>Salvar</ButtonText>
            </Button>
          </TouchableOpacity>
        </ModalCustom>
      </Modal>
      
    </Container>
  );
};

export default Filtro;
