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
    background-color: ${props => props.theme.colors.tableColor};
`;

export const Button = styled.View`
  margin-top: 20px;
  height: 50px;
  width: ${globalStyles.dimensions.width * 0.4}px;
  background-color: #1A0873;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.tableColor};
  font-size: 20px;
`;