import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';

import globalStyles from '../../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalEscolheCarteira = ({ visible, onSelectCarteira}) => {
  const [carteiras, setCarteiras] = useState(['Carteira 1', 'Carteira 2', 'Carteira 3'])
  const [modalHeight, setModalHeight] = useState(200)

  useState(() => {
    let height = 200 + (carteiras.length * 40);
    setModalHeight(height);
  }, [])
  
  return (
    <View style={styles.container}>
      <Modal isVisible={visible}>
        <View
          style={[styles.modal, { height: modalHeight}]}>
          <Text style={styles.titleText}>Escolha uma carteira padrão:</Text>
            {
              carteiras.map((el, i) => {
                return (
                  <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => onSelectCarteira(el)}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{el}</Text>
                        <Ionicons name={'wallet'} size={18} color={globalStyles.colors.fontColor} />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
        </View>
      </Modal>
    </View>
  );
};

export default ModalEscolheCarteira;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalStyles.colors.firstLayer, 
        width: globalStyles.dimensions.width *0.9, 
        borderRadius: 20,
    },
    titleText: {
       marginHorizontal: 20, 
       marginVertical: 20, 
       fontSize: 25, 
       color: globalStyles.colors.fontColor, 
       textAlign: 'center'
    },
    buttonView: {
        height: 40,
        width: 170,
        backgroundColor: '#2A0DB8',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
      },
      buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 18,
        marginRight: 20,
  
      }
});
