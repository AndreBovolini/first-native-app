import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import globalStyles from '../../../styles/globalStyles';


import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/actions';
import { bindActionCreators } from 'redux'



const CardDatePicker = (props) => {
  const [showSelectorInicial, setShowSelectorInicial] = useState(false)
  const [showSelectorFinal, setShowSelectorFinal] = useState(false)
  const [errorData, setErrorData] = useState(false)

  const showDateInicial = () => {
    setShowSelectorInicial(true)
  };

  const showDateFinal = () => {
    setShowSelectorFinal(true)
  };

  const selectNewDateInicial = (data) => {
   if (data.nativeEvent.timestamp.getTime() > props.dataMaisAntiga) {
    setShowSelectorInicial(false);
    props.newDataInicial(data.nativeEvent.timestamp.getTime());
   } else {
    setShowSelectorInicial(false);
    setErrorData(true)
    setTimeout(() => {
      setErrorData(false)
    }, 10*1000)
   }
  };

  const selectNewDateFinal = (data) => {
    if (data.nativeEvent.timestamp.getTime() < props.dataMaisRecente) {
      setShowSelectorFinal(false);
    props.newDataFinal(data.nativeEvent.timestamp.getTime());
    }
    else {
      setShowSelectorFinal(false);
      setErrorData(true)
      setTimeout(() => {
        setErrorData(false)
      }, 10*1000)
     }
  }

  


    return (
        <View>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
             <View style={styles.bloco}>
               <View style={styles.leftSide}>
                  <Icon name="circle" size={10} color={'#FFF'}/>
                  <Text style={styles.title}>Escolha o período</Text>
                </View>
                <TouchableOpacity style={styles.right}
                    onPress={()=> props.handleClick()}
                >
                    { props.show ?   <Icon name="chevron-up" size={20} color={globalStyles.colors.fontColor}/>
                    :  <Icon name="chevron-down" size={20} color={globalStyles.colors.fontColor}/>}
                </TouchableOpacity>
                </View>
             </View>
                { props.show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: '#2A0DB8'}]}>
                    <View style={{flexDirection: 'column'}}>
                    <View style={styles.blocoExpand}>
                      
                      <TouchableOpacity activeOpacity={0.7} onPress={showDateInicial}>
                            <View style={styles.buttonView}>
                                <Text style={styles.buttonText}>De: {(new Date(props.datas.dataInicial)).toLocaleDateString()}</Text>
                                <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={showDateFinal}>
                            <View style={styles.buttonView}>
                                <Text style={styles.buttonText}>Até: {(new Date(props.datas.dataFinal)).toLocaleDateString()}</Text>
                                <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                            </View>
                        </TouchableOpacity>
                        {showSelectorInicial && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(props.datas.dataInicial)}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={selectNewDateInicial}
                            />
                        )}
                        {showSelectorFinal && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(props.datas.dataFinal)}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={selectNewDateFinal}
                            />
                        )}
                        
                       </View> 
                       {
                          errorData ? (<Text style={{fontSize: 15, color: 'red'}}>Selecione uma data válida</Text>) : null
                        }
                    </View>
                    
                  </View>
                  
                )}
        </View>
    )
}

const mapStateToProps = state => ({
  datas: state.dates,
  dataMaisAntiga: state.dates.dataMaisAntiga,
  dataMaisRecente: state.dates.dataMaisRecente
});

const mapDispatchToProps = dispatch => 
  bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardDatePicker);

const styles = StyleSheet.create({
      text: {
        color: globalStyles.colors.fontColor,
        fontSize: 20,
        margin: 8
      },
      bloco: {
        flexDirection: 'row',  
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      },
      blocoCor: {
        flexDirection: 'row',  
        alignItems: 'center',
        marginTop: 20,
        padding: 5,
        height: 70,
        borderRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-between'
      
      },
      right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20

      },
      blocoExpand: {
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems: 'center',
        flexDirection: 'row',
        width: globalStyles.dimensions.width / 1.15,
        justifyContent: 'space-evenly',
        marginTop: -10,
        marginBottom: 0,
        padding: 5,
        paddingBottom: 20,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: globalStyles.dimensions.width / 1.15,
      },
      blocoExpandCor: {
        flexDirection: 'row',
        backgroundColor: globalStyles.colors.firstLayer,
        width: globalStyles.dimensions.width / 1.15,
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 5,
        padding: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
      },
      leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
      },
      title: {
        color: globalStyles.colors.fontColor,
        fontSize: 23,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginVertical: 5,
    },
      value: {
          color: globalStyles.colors.fontColor,
          fontSize: 25,
      },
      expandLeft:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonView: {
        height: 50,
        width: 150,
        backgroundColor: '#2A0DB8',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: globalStyles.colors.fontColor,
        fontSize: 18,
        marginRight: 10,
    }

    })