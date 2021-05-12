import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleWare from 'redux-saga'

import dates from './reducers/infos-gerais';
import * as homePage from './reducers/reducer-dados-home';
import * as dadosUsuario from './reducers/reducer-dados-usuario';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(combineReducers({
    dates: dates,
    dadosHomePage: homePage.dadosHomePage,
    dadosCarteiras: dadosUsuario.dadosCarteiras,
    infosCarteiras: dadosUsuario.infosCarteiras,
}),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga)

export default store;