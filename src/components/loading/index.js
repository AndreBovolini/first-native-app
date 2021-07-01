import React from 'react';

import LottieView from 'lottie-react-native'

import loadingDark from '../../assets/loadingDarkTheme.json';
import loadingLight from '../../assets/loadingLightTheme.json';

import {
Container
} from './styles';
import { useTheme } from 'styled-components';

export function LoadAnimation() {

    const theme = useTheme();

return (
    <Container>
        <LottieView 
        source={theme.colors.background === '#000' ? loadingDark : loadingLight}
        style={{height: 100}}
        resizeMode="contain"
        autoPlay
        loop
        />
    </Container>
  );
}