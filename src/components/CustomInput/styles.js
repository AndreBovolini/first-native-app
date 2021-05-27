import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles'

export const Container = styled.View`
    height: 80px;
`;

export const Label = styled.Text`
    color: ${props => props.theme.colors.fontColor};
`;


export const ContainerInput = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.invertedBackground};
    border-radius: 10px;
`;