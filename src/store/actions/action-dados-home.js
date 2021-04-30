import { put, call } from 'redux-saga/effects';

import fetchDadosHomePage from '../../dados/home/dadosHomePage';


export const pegarDadosHomePage = (comparador = '') => ({
    type: 'GET_DADOS_HOME_PAGE_APP',
    comparador,
});

//-------------------------------------------------

export function* asyncPegarDadosHomePage(action){
    try {
      let response = yield call(fetchDadosHomePage, action.comparador);
      yield put({ type: 'SUCCESS_GET_DADOS_HOME_PAGE_APP',  data: response});
    } catch (err) {
      yield put({ type: 'FAILURE_GET_DADOS_HOME_PAGE_APP' });
    }  
}