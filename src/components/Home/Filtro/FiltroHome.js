import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import Modal from 'react-native-modal';
import globalStyles from '../../../styles/globalStyles';
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
