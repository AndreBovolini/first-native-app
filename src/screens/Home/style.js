import styled from 'styled-components/native';

import globalStyles from '../../styles/globalStyles'

export const LargeContainer = styled.View`
    background-color: ${props => props.theme.colors.background};
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${globalStyles.dimensions.width / 1.15}px;
`;

export const LeftCard = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const RightCard = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const SettingsButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`

export const Title = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 40px;
    font-weight: 300;
    align-self: flex-start;
    margin-vertical: 10px;
`;

export const ButtonView = styled.View`
    flex-direction: row;
    align-self: flex-start;
    margin-left: 7px;
    margin-bottom: 5px;
`;

export const Currency = styled.View`
    background-color: ${props => props.theme.colors.firstLayer};
    width: 48px;
    align-items:center;
    padding-vertical: 2px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;

export const CurrencyPress = styled.View`
    background-color: ${props => props.theme.colors.invertedBackground};
    width: 48px;
    padding-vertical: 2px;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
`;

export const ValueBoxContainer = styled.View`
    height: 191px;
    width: ${globalStyles.dimensions.width}px;
`;

export const ValueBoxContainerRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    margin-vertical: 5px;
`;

export const Percent = styled.View`
    background-color: ${props => props.theme.colors.firstLayer};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

 export const PercentPress = styled.View`
    background-color: ${props => props.theme.colors.invertedBackground};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export const BenchmarksButton = styled.View`
    margin-top: 10px;
    flex-direction: row;
    align-self: center;
    background-color: ${props => props.theme.colors.firstLayer};
    padding: 5px;
    border-radius: 10px;
    padding-right: 8px;
`;

export const TitleNavigationContainer = styled.View`
    flex-direction: row;
    align-self: flex-start;
    margin-left: 20px;
`;

export const TitleNavigation = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 30px;
    font-weight: 300;
`;

export const ChartContainer = styled.View`
      width: ${globalStyles.dimensions.width}px;
      height: 433px;
      margin-top: 0px; 
`;

export const LineChartContainer = styled.View`
      width: ${globalStyles.dimensions.width}px;
      height: 230px;
      margin-top: -5px; 
`;

