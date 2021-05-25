import styled from 'styled-components/native';


export const Container = styled.View`
    width: 47%;
    height: 100%;
    background-color: ${props => props.theme.colors.firstLayer};
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
`;

export const Title = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 15px;
    align-self: flex-start;
    margin-left: 10px;
    margin-vertical: 5px;
`;

export const Value = styled.Text`
    color: ${props => props.theme.colors.fontColor};
    font-size: 30px;
`;