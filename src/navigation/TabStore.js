import React from 'react'
import { Provider } from 'react-redux';
import store from '../store';

import Navigation from './TabNavigation'

const ProviderNavigator = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};

export default ProviderNavigator