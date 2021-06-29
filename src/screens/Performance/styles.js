import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles'

export const Title = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 40px;
    font-weight: 300;
    align-self: flex-start;
    margin-vertical: 10px; 
    margin-left: 10px;
`;

export const ChartContainer = styled.View`
    width: ${globalStyles.dimensions.width}px;
    height: 430px;
`;

export const ContainerSelector = styled.View`
    height: 30px;
    width: ${(globalStyles.dimensions.width *4)/5}px;
    margin-right: 30px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const ContainerTable = styled.View`
  width: ${globalStyles.dimensions.width *0.90}px;
  height: 500px;
  margin-vertical: 5px;
  margin-horizontal: 0px;
  background-color: ${props => props.theme.colors.firstLayer};
  border-radius: 20px;
`;

export const ContainerTableLandscape = styled.View`
  width: ${globalStyles.dimensions.height * 0.9}px;
  height: ${globalStyles.dimensions.width * 0.9}px;
  margin-vertical: 10px;
  margin-horizontal: ${globalStyles.dimensions.height * 0.05}px;
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
    color: ${props => props.theme.colors.secondLayer};
`;


export const ContainerSelectorTable = styled.View`
    height: 50px;
    width: ${globalStyles.dimensions.width *0.9}px;
    background-color: ${props => props.theme.colors.firstLayer};
    margin-top: 20px;
    border-radius: 10px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const LoadingView = styled.View`
  width: 100%;
  height: ${globalStyles.dimensions.width}px;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;
