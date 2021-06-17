import { put, call } from 'redux-saga/effects';

import fetchDadosHomePage from '../../dados/home/dadosHomePage';
import { resposta2 } from '../../data/dataTeste';




export const pegarDadosHomePage = (comparador = '') => ({
    type: 'GET_DADOS_HOME_PAGE_APP',
    comparador,
});

//-------------------------------------------------

function apiGet() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(resposta2)
      }, 1000)
  })
};


export function* asyncPegarDadosHomePage(action){
    try {
      let response = yield call(apiGet, action.comparador);
      yield put({ type: 'SUCCESS_GET_DADOS_HOME_PAGE_APP',  data: response});
    } catch (err) {
      console.log(err)
      yield put({ type: 'FAILURE_GET_DADOS_HOME_PAGE_APP' });
    }  
}