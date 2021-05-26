import styled from 'styled-components/native';

import globalStyles from '../../../styles/globalStyles'


export const Container = styled.View`
    height: 30px;
    width: 60px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const AnoText = styled.Text`
    color: ${props => props.theme.colors.secondLayer};
    font-size: 20px;
    font-weight: 700;
`;