import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import globalStyles from '../../../../styles/globalStyles';


import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from '../Calendar/CalendarPicker'

import { connect } from 'react-redux';
import * as Actions from '../../../../store/actions/actions';
import { bindActionCreators } from 'redux'
import { ThemeContext } from 'styled-components/native';

import {
  Bloco,
  LeftSide,
  Title,
  RightButton,
  BlocoExpand,
  ButtonView,
  ButtonText
} from './style'

const CardDatePicker = (props) => {
  const [showSelectorInicial, setShowSelectorInicial] = useState(false)
  const [showSelectorFinal, setShowSelectorFinal] = useState(false)
  const [errorData, setErrorData] = useState(false)
  const [selectedInitialDate, setSelectedInitialDate] = useState('')
  const [selectedFinalDate, setSelectedFinalDate] = useState('')
  const [height, setHeight] = useState(200)

  const StyledTheme = useContext(ThemeContext)

  useEffect(() => {
    if (showSelectorInicial){
      setHeight(350)
      
    }else{
      setHeight(200)
    }
  },[showSelectorInicial, showSelectorFinal])

  const showDateInicial = () => {
    setShowSelectorInicial(true)
      
  };

  const showDateFinal = () => {
    setShowSelectorFinal(true)
  };

  const selectNewDateInicial = (data) => {
    //console.log('data format ', data)
   if (data > props.dataMaisAntiga) {
    // setShowSelectorInicial(false);
    //props.newDataInicial(data.getTime());
    setSelectedInitialDate(data)
   } else {
    // setShowSelectorInicial(false);
    setErrorData(true)
    setTimeout(() => {
      setErrorData(false)
    }, 10*1000)
   }
  };

  const selectNewDateFinal = (data) => {
    //console.log('data format ', props.dataMaisRecente)
    if (data < props.dataMaisRecente) {
      // setShowSelectorFinal(false);
    //props.newDataFinal(data.getTime());
    setSelectedFinalDate(data)
    }
    else {
      // setShowSelectorFinal(false);
      setErrorData(true)
      setTimeout(() => {
        setErrorData(false)
      }, 10*1000)
     }
  }

  const saveNewDates = () => {
    const initialDate = selectedInitialDate !== '' ? selectedInitialDate : props.datas.dataInicial
    const finalDate = selectedFinalDate !== '' ? selectedFinalDate : props.datas.dataFinal
    props.newData(initialDate, finalDate);
    setShowSelectorFinal(false)
    setShowSelectorInicial(false)
    
  }

  

  //console.log('props ' + props.datas.dataInicial)
    return (
        <View style={props.dadosHomePage.loading ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'} : null}>
        <View style={[styles.blocoCor, {backgroundColor: '#2A0DB8'}]}>
             <Bloco onPress={()=> props.handleClick()} activeOpacity={1}>
               <LeftSide>
                  <Icon name="circle" size={10} color={'#2A0DB8'}/>
                  <Title>Escolha o período</Title>
                </LeftSide>
                <RightButton
                >
                    { props.show ?   <Icon name="chevron-up" size={20} color={StyledTheme.colors.fontColor}/>
                    :  <Icon name="chevron-down" size={20} color={StyledTheme.colors.fontColor}/>}
                </RightButton>
                </Bloco>
             </View>
                { props.show && (
                  <View style={[styles.blocoExpandCor, {backgroundColor: '#2A0DB8'}]}>
                    <View style={{flexDirection: 'column'}}>
                    
                    <BlocoExpand>
                    <ScrollView style={{height: props.scroll ? null : height }} nestedScrollEnabled={true}>
                      <TouchableOpacity activeOpacity={0.7} onPress={showDateInicial} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                            <ButtonView>
                                <ButtonText>De: { selectedInitialDate === '' ?
                                 (new Date(props.datas.dataInicial)).toLocaleDateString('pt-br', {timeZone: 'UTC'})
                                : (new Date(selectedInitialDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'})
                                }
                                 </ButtonText>
                                <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                            </ButtonView>
                        </TouchableOpacity>
                        {showSelectorInicial ? (
                            // <DateTimePicker
                            // value={new Date(props.datas.dataInicial)}
                            // mode={'date'}
                            // onChange={(_,data) => selectNewDateInicial(data)}
                            // style={{marginLeft: globalStyles.dimensions.width * 0.2}}
                            // />
                            <CalendarPicker
                              minDate={new Date(props.datas.dataInicial)}
                              onChange={(data) => selectNewDateInicial(data)}
                              id={'inicial'}
                              // show={() =>showSelectorInicial}
                            />
                        ) 
                        : null}
                        <TouchableOpacity activeOpacity={0.7} onPress={showDateFinal} style={{marginLeft: globalStyles.dimensions.width * 0.2}}>
                            <ButtonView>
                                <ButtonText>Até: { selectedFinalDate === '' ?
                                (new Date(props.datas.dataFinal)).toLocaleDateString('pt-br',{timeZone: 'UTC'})
                                : (new Date(selectedFinalDate)).toLocaleDateString('pt-br', {timeZone: 'UTC'})
                                }
                                </ButtonText>
                                <Ionicons name={'calendar'} size={18} color={globalStyles.colors.fontColor} />
                            </ButtonView>
                        </TouchableOpacity>
                        {showSelectorFinal ?  (
                            // <DateTimePicker
                            // value={new Date(props.datas.dataFinal)}
                            // mode={'date'}
                            // onChange={(_,data) => selectNewDateFinal(data)}
                            // style={{marginLeft: globalStyles.dimensions.width * 0.2}}
                            // />
                            <CalendarPicker
                              maxDate={new Date(props.datas.dataFinal)}
                              onChange={(data) => selectNewDateFinal(data)}
                              id={'final'}
                              // show={() =>showSelectorInicial}
                            />
                        ) : null}
                        <TouchableOpacity activeOpacity={0.7} onPress={saveNewDates}>
                          <View style={styles.Button}>
                            <Text style={{color: '#FFF', fontSize: 20,}}>Salvar</Text>
                          </View>
                        </TouchableOpacity>
                        </ScrollView>
                        
                       </BlocoExpand> 
                       
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
  dataMaisRecente: state.dates.dataMaisRecente,
  dadosHomePage: state.dadosHomePage,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardDatePicker);

const styles = StyleSheet.create({
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
      Button :{
        marginTop: 20,
        height: 50,
        marginLeft: globalStyles.dimensions.width* 0.22,
        width: globalStyles.dimensions.width * 0.4,
        backgroundColor: '#1A0873',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }
    })