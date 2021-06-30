import { put, call } from 'redux-saga/effects';

import getDadosPosicaoConsolidada from '../../dados/dados/getDadosPosicaoConsolidada'




export const pegarDadosPosicaoConsolidada = (nomeCarteira) => ({
    type: 'GET_DADOS_POSICAO_CONSOLIDADA',
    dados: {
        nomeCarteira
      }
});

//-------------------------------------------------

export function* asyncPegarDadosPosicaoConsolidada(action){
    try {
      let response = yield call(getDadosPosicaoConsolidada, action.dados);
      //console.warn(response['saldo_por_classe'])
      yield put({ type: 'SUCCESS_GET_DADOS_POSICAO_CONSOLIDADA',  data: response['saldo_por_classe']});
    } catch (err) {
      //console.log(err)
      yield put({ type: 'FAILURE_GET_DADOS_POSICAO_CONSOLIDADA' });
    }  
}