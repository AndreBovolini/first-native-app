import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../styles/globalStyles';

const Seletor = props => {
  const [ativos, setAtivo] = useState (true)
  const [custodiante, setCustodiante] = useState (false)


  const handleAtivos = () => {
    setAtivo(true)
    setCustodiante(false)
  }
  const handleCustodiante = () => {
    setCustodiante(true)
    setAtivo(false)
   
  }

    return(

    <View style={styles.buttonView}>
              <TouchableOpacity style={styles.right} onPress={handleAtivos} activeOpacity={1} pressDuration={0.5}>
                <View style={ativos ? styles.ativosPress : styles.ativos}>
                  <Text style={
                    ativos ? {color:globalStyles.colors.firstLayer, fontSize:25, marginRight: 4} :
                    {color:'#FFF', fontSize:25, marginRight: 4} 
                    }>Ativos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.right} onPress={handleCustodiante} activeOpacity={1} pressDuration={0.5}>
                <View style={custodiante ? styles.custodiantePress : styles.custodiante}>
                  <Text style={
                    custodiante ? {color:globalStyles.colors.firstLayer, fontSize:25, marginRight: 4} :
                    {color:'#FFF', fontSize:25, marginRight: 4} 
                    }>Custodiante</Text>
                </View>
              </TouchableOpacity>
              {/* <View  style={custodiante ? styles.custodiantePress : styles.custodiante}>
                {custodiante ? <Icon.Button
                  name="percent"
                  color={globalStyles.colors.firstLayer}
                  backgroundColor="#FFF"
                  iconStyle={{
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8}
                  }
                  onPress={handleCustodiante}
                />
                  :
                <Icon.Button
                  name="percent"
                  color='#FFF'
                  backgroundColor={globalStyles.colors.firstLayer}
                  iconStyle={{
                    alignItems:'center',
                    alignSelf:'center',
                  marginLeft:8
                }}
                  onPress={handleCustodiante}
                />}
                </View> */}
            </View>
    )
}

export default Seletor;

const styles = StyleSheet.create({
      right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
  
      },
    buttonView:{
        flexDirection: 'row',
        marginLeft: 7,
        marginBottom: 5
      },
      ativos:{
        backgroundColor: globalStyles.colors.firstLayer,
        alignItems:'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
      },
      ativosPress:{
        backgroundColor:'#FFF',
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignItems:'center',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
      },
     custodiante:{
        backgroundColor: globalStyles.colors.firstLayer,
        paddingVertical: 2,
        borderTopRightRadius: 5,
        paddingHorizontal: 5,
        borderBottomRightRadius: 5
  
      },
     custodiantePress:{
        backgroundColor:'#FFF',
        paddingVertical: 2,
        borderTopRightRadius: 5,
        paddingHorizontal: 5,
        borderBottomRightRadius: 5
  
      },
})