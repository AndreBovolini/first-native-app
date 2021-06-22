import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleWare from 'redux-saga'

import dates from './reducers/infos-gerais';
import * as homePage from './reducers/reducer-dados-home';
import * as dadosUsuario from './reducers/reducer-dados-usuario';
import * as posicaoConsolidada from './reducers/reducer-posicao-consolidada'
import * as RootNavigation from '../navigation/RootNavigation';

import rootSaga from './sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleWare();


const appReducer = combineReducers({
    dates: dates,
    dadosHomePage: homePage.dadosHomePage,
    dadosCarteiras: dadosUsuario.dadosCarteiras,
    infosCarteiras: dadosUsuario.infosCarteiras,
    datasCarteiras: dadosUsuario.datasCarteiras,
    dadosPosicaoConsolidada: posicaoConsolidada.dadosPosicaoConsolidada
  })
  
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      console.log(action.type)
        state = undefined;
        AsyncStorage.removeItem('token')
        RootNavigation.navigate('Login', {
          credentials: false
        })
        
    }
  
    return appReducer(state, action)
  }

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga)

export default store;