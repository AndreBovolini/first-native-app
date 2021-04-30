import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleWare from 'redux-saga'

import dates from './reducers/infos-gerais';
import * as homePage from './reducers/reducer-dados-home';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(combineReducers({
    dates: dates,
    dadosHomePage: homePage.dadosHomePage
}),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga)

export default store;