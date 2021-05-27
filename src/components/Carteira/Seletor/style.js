import styled from 'styled-components/native';

import globalStyles from '../../../styles/globalStyles'

export const ButtonView = styled.View`
    flex-direction: row;
    margin-left: 7px;
    margin-bottom: 5px;
`;
export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const AtivosPress = styled.View`
    background-color:${props => props.theme.colors.invertedBackground};
    padding-vertical: 2px;
    padding-horizontal: 5px;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;
export const Ativos = styled.View`
    background-color: ${props => props.theme.colors.firstLayer};
    padding-vertical: 2px;
    padding-horizontal: 5px;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;
export const TextPress = styled.Text`
    color: ${props => props.theme.colors.firstLayer};
    font-size: 25px;
    margin-right: 4px;
`;
export const TextUnpress = styled.Text`
    color: ${props => props.theme.colors.invertedBackground};
    font-size: 25px;
    margin-right: 4px;
`;
export const CustodiantePress = styled.View`
    background-color:${props => props.theme.colors.invertedBackground};
    padding-vertical: 2px;
    border-top-right-radius: 5px;
    padding-horizontal: 5px;
    border-bottom-right-radius: 5px;
`;
export const Custodiante = styled.View`
    background-color: ${props => props.theme.colors.firstLayer};
    padding-vertical: 2px;
    border-top-right-radius: 5px;
    padding-horizontal: 5px;
    border-bottom-right-radius: 5px;    
`