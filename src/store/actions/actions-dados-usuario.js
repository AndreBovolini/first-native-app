import { put, call } from 'redux-saga/effects';

import fetchComAppCarteiras from '../../dados/conta/Carteiras';
import fetchComAppInfosCarteiras from '../../dados/conta/infosCarteiras';


export const pegarDadosCarteiras = (token) => ({
    type: 'GET_DADOS_CARTEIRAS',
    token
});

export const pegarInfosCarteiras = (token) => ({
    type: 'GET_INFOS_CARTEIRAS',
    token
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