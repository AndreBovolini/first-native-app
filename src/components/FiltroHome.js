import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';
import CardAlteraCarteira from '../components/CardAlteraCarteira'
import CardDatePicker from  '../components/CardDatePicker';
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
      
    <View style={styles.container}>
      
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
          marginTop: 1
      }}
        useNativeDriverForBackdrop>

        
        <View
          style={[styles.modal, {backgroundColor:'#252525', height: props.height, width: props.width}]}>
          <CardAlteraCarteira show={showAlteraCarteira} handleClick={handleCardCarteira}/>
          <CardDatePicker
               show={showDatePicker}
               handleClick={handleCardDatePicker}
               dataInicial={dataInicial}
               dataFinal={dataFinal}
               handleAlteraDataFinal={handleAlteraDataFinal} 
               handleAlteraDataInicial={handleAlteraDataInicial} />
          <TouchableOpacity activeOpacity={0.7} onPress={props.buttonAction}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      
    </View>
  );
};

export default Filtro;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingBottom: 10,
        paddingRight: 5,
      
        
        
    },
  button: {
    marginTop:20,
    height: 50,
    width: globalStyles.dimensions.width * 0.4,
    backgroundColor: '#1A0873',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: globalStyles.colors.fontColor,
    fontSize: 20,
  },
});
