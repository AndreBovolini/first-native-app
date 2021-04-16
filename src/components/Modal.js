import React from 'react';

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

const CustomModal = props => {
  return (
    <View style={styles.container}>
      <Modal isVisible={props.visible}>
        <View
          style={[styles.modal, {backgroundColor: globalStyles.colors.firstLayer, height: props.height, width: props.width}]}>
          <Text style={{marginHorizontal: 20, marginVertical: 20, fontSize: 25, color: globalStyles.colors.fontColor, textAlign: 'center'}}>Uma nova senha foi enviada para o seu e-mail!</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={props.buttonAction}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Enviar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
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
});
