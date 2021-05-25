import { put, call } from 'redux-saga/effects';

import fetchComAppCarteiras from '../../dados/conta/Carteiras';
import fetchComAppInfosCarteiras from '../../dados/conta/infosCarteiras';
import fetchComAppDatasCarteiras from '../../dados/conta/datasCarteiras'


export const pegarDadosCarteiras = (token) => ({
    type: 'GET_DADOS_CARTEIRAS',
    token
});

export const pegarInfosCarteiras = (token) => ({
    type: 'GET_INFOS_CARTEIRAS',
    token
});

export const pegarDatasCarteiras = (token, nomeCarteira) => ({
    type: 'GET_DATAS_CARTEIRAS',
    dados: {
      token,
      nomeCarteira
    }
  
});


//-------------------------------------------------

export function* asyncPegarDadosCarteiras(action){
    try {
      let response = yield call(fetchComAppCarteiras, action.token);
      yield put({ type: 'SUCCESS_GET_DADOS_CARTEIRAS',  data: response});
    } catch (err) {
      yield put({ type: 'FAILURE_GET_DADOS_CARTEIRAS' });
    }  
}

export function* asyncPegarDatasCarteiras(action){
  console.log('CCCCCCCCCCC' + action.dados.nomeCarteira)
    try {
      let response = yield call(fetchComAppDatasCarteiras, action.dados);
      console.log(response)
      yield put({ type: 'SUCCESS_GET_DATAS_CARTEIRAS',  data: response});
    } catch (err) {
        console.log(err)
      yield put({ type: 'FAILURE_GET_DATAS_CARTEIRAS' });
    }  
}

export function* asyncPegarInfosCarteiras(action){
    try {
      let response = yield call(fetchComAppInfosCarteiras, action.token);
      console.log(response)
      yield put({ type: 'SUCCESS_GET_INFOS_CARTEIRAS',  data: response});
    } catch (err) {
        console.log(err)
      yield put({ type: 'FAILURE_GET_INFOS_CARTEIRAS' });
    }  
}