import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import globalStyles from '../../../styles/globalStyles';
import { Container, Title, Value } from './styles';

const ValueBox = (props) => {
    return (
        <Container>
            <Title>{props.title}</Title>
            <Value>{props.value}</Value>
        </Container>
    )
}

export default ValueBox


