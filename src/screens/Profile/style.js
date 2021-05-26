import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles';

export const SafeArea = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
`
export const ContainerInfos = styled.View`
    margin-horizontal: 20px;
    margin-vertical: 20px;
    flex-direction: row;
    background-color: ${props => props.theme.colors.firstLayer};
    border-radius: 20px;
    width: ${globalStyles.dimensions.width * 0.9}px;
    height: 150px;
    align-items: center;
`
export const TextUser = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 30px;
    margin-left: 20px;
`