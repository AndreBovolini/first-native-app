import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles'


export const Title = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 40px;
    font-weight: 300;
    align-self: flex-start;
    margin-vertical: 10px;
    margin-left: 10px;
`

export const ChartContainer = styled.View`
    width: ${globalStyles.dimensions.width}px;
    height: 432px;
    margin-top: 20px;
`
export const ContainerCards = styled.View`
    flex:1;
    align-items: center;
`
export const LoadingView = styled.View`
  width: 100%;
  height: ${globalStyles.dimensions.width}px;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;