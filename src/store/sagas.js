import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';

import * as homePage from './actions/action-dados-home';
import * as dadosUsuario from './actions/actions-dados-usuario';
import * as datas from './actions/actions' 


export default function* root() {
    yield takeLatest('ASYNC_SET_DATA_INICIAL', datas.asyncSetDataInicial);
    yield takeLatest('ASYNC_SET_DATA_FINAL', datas.asyncSetDataFinal);
    yield takeLatest('ASYNC_SET_CARTEIRA', datas.asyncAlteraCarteira);
    yield takeLatest('ASYNC_SET_DATA_MAIS_ANTIGA', datas.asyncAlteraDataMaisAntiga);
    yield takeLatest('ASYNC_SET_DATA_MAIS_RECENTE', datas.asyncAlteraDataMaisRecente);
    yield takeLatest('GET_DADOS_HOME_PAGE_APP', homePage.asyncPegarDadosHomePage);
    yield takeLatest('GET_DADOS_CARTEIRAS', dadosUsuario.asyncPegarDadosCarteiras);
    yield takeLatest('GET_INFOS_CARTEIRAS', dadosUsuario.asyncPegarInfosCarteiras);
};
