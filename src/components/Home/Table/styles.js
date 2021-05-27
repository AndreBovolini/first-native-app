import styled from 'styled-components/native';

import globalStyles from '../../../styles/globalStyles'

export const Header = styled.View`
    flex-direction: row;  
    background-color: ${props => props.theme.colors.background};
    align-items: center;
    height: 50px;
    margin-bottom: -15px;
    width: ${globalStyles.dimensions.width / 1.15}px;
    justify-content: space-between;
`;

export const Wrapper = styled.View`
    flex-direction: row;  
    background-color: ${props => props.theme.colors.background};
    align-items: center;
    padding: 5px;
    height: 30px;
    width: ${globalStyles.dimensions.width / 1.15}px;
    border-bottom-width: 1px;
    border-color: ${props => props.theme.colors.firstLayer};
`;

export const BlocoTitulo = styled.View`
    flex-direction: row;  
    background-color: ${props => props.theme.colors.background};
    align-items: center;
    justify-content: space-between;
`;

export const BlocoValor = styled.View`
    flex-direction: row;
    background-color: ${props => props.theme.colors.background};
    align-items: center;
`;

export const Line = styled.View`
    height: 14px;
    width: 3px;
    margin-top: 2px;
    margin-bottom: -5px;
    margin-right: 6px;
`;

export const TextHeader = styled.Text`
    font-size: 15px; 
    color: ${props => props.theme.colors.fontColor};
    margin-bottom: -5px;
`;

export const TextLabelHeader = styled.Text`
    font-size: 11px; 
    color: ${props => props.theme.colors.fontColor};
    margin-bottom: -5px;
`;
