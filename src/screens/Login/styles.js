import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles'

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
    justify-content: flex-end;
    align-items: center;
    padding-top: ${globalStyles.dimensions.width / 2}px;
`;

export const ButtonView = styled.View`
    height: 50px;
    width: ${globalStyles.dimensions.width * 0.6}px;
    background-color: #1E90FF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const TextCustom = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 24px;
`;

export const ButtonText = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 20px;
`;

export const PasswordReset = styled.Text`
    color: ${props => props.theme.colors.fontColor};
`;