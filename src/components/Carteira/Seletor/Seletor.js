import React, { useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import{
  ButtonView,
  Button,
  Ativos,
  AtivosPress,
  TextPress,
  TextUnpress,
  Custodiante,
  CustodiantePress
} from '../Seletor/style'

import Icon from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../../styles/globalStyles';

import { ThemeContext } from 'styled-components';

const Seletor = props => {
  const [ativos, setAtivo] = useState (true)
  const [custodiante, setCustodiante] = useState (false)

  const StyledTheme = useContext(ThemeContext)


  const handleAtivos = () => {
    props.handleSelectorAtivos()
    setAtivo(true)
    setCustodiante(false)
  }
  const handleCustodiante = () => {
    props.handleSelectorCustodiante()
    setCustodiante(true)
    setAtivo(false)
   
  }

    return(

    <ButtonView>
              <Button onPress={handleAtivos} activeOpacity={1} pressDuration={0.5}>
                {ativos?
                (<AtivosPress>
                  <TextPress>
                    Ativos
                  </TextPress>
                </AtivosPress>)
                :
                (<Ativos>
                  <TextUnpress>
                    Ativos
                  </TextUnpress>
                </Ativos>)}
              </Button>
              <Button onPress={handleCustodiante} activeOpacity={1} pressDuration={0.5}>
                {custodiante ?
                (<CustodiantePress>
                  <TextPress>
                    Custodiante
                  </TextPress>
                </CustodiantePress>)
                :
                (<Custodiante>
                  <TextUnpress>
                    Custodiante
                  </TextUnpress>
                </Custodiante>)}
              </Button>
            </ButtonView>
    )
}

export default Seletor;
