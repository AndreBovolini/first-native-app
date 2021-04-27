import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleWare from 'redux-saga'

import dates from './reducers/dates';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(combineReducers({
    dates,
}),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga)

export default store;