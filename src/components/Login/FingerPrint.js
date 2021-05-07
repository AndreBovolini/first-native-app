import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native';

import TouchID from 'react-native-touch-id'
import globalStyles from '../../styles/globalStyles';

const FingerPrint = (props) => {
	
  //config is optional to be passed in on Android
	
    return (
      <View>
        <TouchableHighlight onPress={props.pressHandler}>
          <Text style={styles.text}>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </View>
    );
};

export default FingerPrint;

const styles = StyleSheet.create({
    text: {
        color:globalStyles.colors.fontColor
    }
})