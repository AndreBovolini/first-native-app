import styled from 'styled-components/native';

import globalStyles from '../../../styles/globalStyles'

export const Container = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ModalCustom = styled.View`
    justify-content: flex-start;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-bottom: 10px;
    padding-right: 5px;
    padding-left: 5px;
    background-color: ${props => props.theme.colors.firstLayer};
`;
export const TitleText = styled.Text`
    margin-horizontal: 10px; 
    margin-vertical: 5px; 
    margin-top: 0px;
    font-size: 18px; 
    color: ${props => props.theme.colors.fontColor};
    text-align: center
},
`

export const Button = styled.View`
  margin-top: 20px;
  height: 50px;
  width: ${globalStyles.dimensions.width * 0.4}px;
  background-color: #1A0263;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-size: 20px;
`;

export const ButtonView = styled.View`
  height: 40px;
  width: 170px;
  background-color: #2A0DB8;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`