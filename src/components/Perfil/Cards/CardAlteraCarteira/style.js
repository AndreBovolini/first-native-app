import styled from 'styled-components/native';

import globalStyles from '../../../../styles/globalStyles'

export const BlocoCor = styled.View`
    flex-direction: row;  
    align-items: center;
    margin-top: 20px;
    padding: 5px;
    height: 70px;
    border-radius: 10px;
    width: ${globalStyles.dimensions.width / 1.15}px;
    justify-content: space-between;
`;
export const Bloco = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${props => props.theme.colors.firstLayer};
    align-items: center;
    padding: 5px;
    height: 70px;
    border-radius: 10px;
    width: ${globalStyles.dimensions.width / 1.15}px;
    justify-content: space-between;
`;
export const LeftSide = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 5px;
`;
export const Title = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 23px;
    align-self: flex-start;
    margin-left: 10px;
    margin-vertical: 5px
`;
export const RightButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-horizontal: 20px;
`;
export const BlocoExpandCor = styled.View`
    flex-direction: row;
    background-color: ${props => props.theme.colors.firstLayer};
    width: ${globalStyles.dimensions.width / 1.15}px,
    align-items: center;
    margin-top: -10px;
    margin-bottom: 5px;
    padding: 5px;
    border-bottom-end-radius: 10px;
    border-bottom-start-radius: 10px;
`;
export const BlocoExpand = styled.View`
    background-color: ${props => props.theme.colors.firstLayer};
    align-items: center;
    flex-direction: row;
    margin-top: -10px;
    margin-bottom: 0px;
    padding: 5px;
    border-bottom-end-radius: 10px;
    border-bottom-start-radius: 10px;
    width: ${globalStyles.dimensions.width / 1.15}px;
`;
export const TextCard = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 20px;
    margin: 8px;
`
export const ButtonView = styled.View`
    height: 40px;
    width: 170px;
    background-color: #2A0DB8;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin: 2px;
    margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 18px;
    margin-right: 20px;
`