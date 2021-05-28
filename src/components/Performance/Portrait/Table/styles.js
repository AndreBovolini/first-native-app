import styled from 'styled-components/native';

import globalStyles from '../../../../styles/globalStyles';

export const ContainerTable = styled.View`
    width: ${globalStyles.dimensions.width *0.90}px;
    height: 500px;
    margin-vertical: 5px;
    margin-horizontal: 0px;
    background-color: ${props => props.theme.colors.firstLayer};
    border-radius: 20px;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    height: 35px;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme.colors.secondLayer};
    margin-top: 10px;
    margin-horizontal: 10px;
    border-radius: 5px;
`;

export const TextoHeader = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.colors.firstLayer};
`;

export const ContainerRow = styled.View`
    flex-direction: row;
    height: 40px;
    justify-content: space-around;
    align-items: center;
    border-bottom-color: ${props => props.theme.colors.secondLayer};
    border-bottom-width: 0.5px;
`;

export const TextoTable = styled.Text`
    font-size: 18px;
    font-weight: 300;
    color: ${props => props.theme.colors.tableText};
`;