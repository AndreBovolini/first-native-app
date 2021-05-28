import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import globalStyles from '../../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome'

import TabChart from '../TabChart/TabChart';

import { ThemeContext } from 'styled-components/native';
import {
  BlocoCor,
  Bloco,
  LeftSide,
  Title,
  RightButton,
  BlocoExpand,
  TextCard,
  ChartContainer,
} from '../CardsCarteira/style'

const Cards = ({ id, title, value, show, handleClick, cor, data }) => {

  const StyledTheme = useContext(ThemeContext)

  function numberToReal(numeros) {
    let numero = numeros.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }
  const valor = numberToReal(value)

  return (
    <View>
      <View style={[styles.blocoCor, { backgroundColor: cor }]}>
        <Bloco onPress={() => handleClick(title)} activeOpacity={1}>
          <LeftSide>
            <Icon name="circle" size={10} color={cor}/>
            <Title>{title}</Title>
          </LeftSide>
          <RightButton>
            {show ? <Icon name="chevron-up" size={20} color={StyledTheme.colors.fontColor} />
              : <Icon name="chevron-down" size={20} color={StyledTheme.colors.fontColor} />}
          </RightButton>
        </Bloco>
      </View>
      { show && (
        <View style={[styles.blocoExpandCor, { backgroundColor: cor }]}>
          <BlocoExpand>
            <View style={{ justifyContent: 'space-between' }}>
              {data ?
                <TextCard>data: {data}</TextCard>
                : null}
              <TextCard>Valor: {valor}</TextCard>
              {title === 'Ações/ETFs' ?
                <ChartContainer>
                  <TabChart title={title} />
                </ChartContainer>
                : null
              }
            </View>
          </BlocoExpand>
        </View>
      )}
    </View>
  )
}

export default Cards

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
})