import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import globalStyles from '../../../../styles/globalStyles';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { connect } from 'react-redux';
import { alteraCarteira, alteraDataMaisAntiga, alteraDataMaisRecente } from '../../../../store/actions/actions';

import { ThemeContext } from 'styled-components/native';

import {
  Bloco,
  LeftSide,
  Title,
  RightButton,
  BlocoExpand,
  TextCard,
  ButtonText,
  ButtonView
} from './style'
const CardAlteraCarteira = (props) => {
  const [carteiras, setCarteiras] = useState(['Carteira 1', 'Carteira 2', 'Carteira 3'])

  const StyledTheme = useContext(ThemeContext)

  useEffect(() => {
    if (!props.isLoadingCarteirasUsuario && props.ResponseCarteirasUsuario !== []) {
      setCarteiras(props.ResponseCarteirasUsuario)
    }
  }, [props.isLoadingCarteirasUsuario, props.ResponseCarteirasUsuario])

  function selectNovaCarteira(carteira) {
    props.alteraCarteira(carteira)
    let dataAntiga = '';
    let dataRecente = '';
    props.responseInfosCarteiras.forEach(carteira => {
      if (carteira["Nome da Carteira"] === props.stateCarteira.carteira) {
        dataAntiga = carteira["Data da Primeira Operação"]
        props.alteraDataMaisAntiga(dataAntiga)
        dataRecente = carteira["Data da Cota mais Recente"]
        props.alteraDataMaisRecente(dataRecente)
      }
    });
  }


  return (
    <View>
      <View style={[styles.blocoCor, { backgroundColor: '#2A0DB8' }]}>
        <Bloco onPress={() => props.handleClick()} activeOpacity={1}>
          <LeftSide>
            <Icon name="circle" size={10} color={'#2A0DB8'} />
            <Title>{`Carteira Atual: ${props.stateCarteira.carteira}`}</Title>
          </LeftSide>
          <RightButton
          >
            {props.show ? <Icon name="chevron-up" size={20} color={StyledTheme.colors.fontColor} />
              : <Icon name="chevron-down" size={20} color={StyledTheme.colors.fontColor} />}
          </RightButton>
        </Bloco>
      </View>
      { props.show && (
        <View style={[styles.blocoExpandCor, { backgroundColor: '#2A0DB8' }]}>
          <BlocoExpand>
            <ScrollView style={{ marginLeft: globalStyles.dimensions.width / (1.15 * 4) }}>
              {
                carteiras.map((el, i) => {
                  return (
                    <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => selectNovaCarteira(el)} >
                      <ButtonView>
                        <ButtonText>{el}</ButtonText>
                        <Ionicons name={'wallet'} size={18} color={'#FFF'} />
                      </ButtonView>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </BlocoExpand>
        </View>
      )}
    </View>
  )
}

const mapStateToProps = state => ({
  stateCarteira: state.dates,
  isLoadingCarteirasUsuario: state.dadosCarteiras.loading,
  ResponseCarteirasUsuario: state.dadosCarteiras.data,
  responseInfosCarteiras: state.infosCarteiras.data,
  isLoadingInfosCarteiras: state.infosCarteiras.loading,
});

const mapDispatchToProps = dispatch => ({
  alteraCarteira: (carteira) => dispatch(alteraCarteira(carteira)),
  alteraDataMaisAntiga: (dataMaisAntiga) => dispatch(alteraDataMaisAntiga(dataMaisAntiga)),
  alteraDataMaisRecente: (dataMaisRecente) => dispatch(alteraDataMaisRecente(dataMaisRecente)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardAlteraCarteira);

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
    justifyContent: 'space-between',
    marginTop: -10,
    marginBottom: 0,
    padding: 5,
    paddingBottom: 10,
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
    padding: 5,
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
  expandLeft: {
    justifyContent: 'space-between'
  },
  expandRigh: {
    justifyContent: 'space-around'
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

})