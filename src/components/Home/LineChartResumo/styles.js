import styled from 'styled-components/native';

import globalStyles from '../../../styles/globalStyles'

export const Container = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.colors.background};
    padding: 20px;
`;
