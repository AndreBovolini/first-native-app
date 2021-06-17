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
    margin: 5px 10px;
    margin-top: 0px;
    font-size: 18px; 
    color: ${props => props.theme.colors.fontColor};
    text-align: center;
`;

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

export const ToggleView = styled.View`
    flex-direction: row;
    align-self: flex-start;
    margin-left: 7px;
    margin-bottom: 5px;
`;

export const Percent = styled.View`
    background-color: ${props => props.theme.colors.background};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

 export const PercentPress = styled.View`
    background-color: ${props => props.theme.colors.invertedBackground};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export const Currency = styled.View`
    background-color: ${props => props.theme.colors.background};
    width: 48px;
    align-items:center;
    padding: 1px 0;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;

export const CurrencyPress = styled.View`
    background-color: ${props => props.theme.colors.invertedBackground};
    width: 48px;
    padding: 1px 0;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;

export const LeftCard = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const RightCard = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SelectPeriodView = styled.View`
    flex-direction: row;

    justify-content: space-between;
`;

export const ToggleLabelText = styled.Text`
  font-size: 15px;
  margin: 0px 5px;
`;

export const DatesView = styled.View`
  
`;

export const FirstLastDateView = styled.View`

  flex-direction: row;
 
`;

export const DateButtonText = styled.Text`
  color: #FFF;
  font-size: 15px;
`;

export const DateButtonView = styled.View`
  height: 35px;
  width: 140px;
  background-color: #2A0DB8;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`