import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';

import * as homePage from './actions/action-dados-home';
import * as dadosUsuario from './actions/actions-dados-usuario';
import * as datas from './actions/actions' 


export default function* root() {
    yield takeLatest('ASYNC_SET_DATA', datas.asyncSetDatas);
    yield takeLatest('ASYNC_SET_CARTEIRA', datas.asyncAlteraCarteira);
    yield takeLatest('ASYNC_SET_DATA_LIMITE', datas.asyncAlteraDataLimite);
    yield takeLatest('GET_DADOS_HOME_PAGE_APP', homePage.asyncPegarDadosHomePage);
    yield takeLatest('GET_DADOS_CARTEIRAS', dadosUsuario.asyncPegarDadosCarteiras);
    yield takeLatest('GET_INFOS_CARTEIRAS', dadosUsuario.asyncPegarInfosCarteiras);
    yield takeLatest('ASYNC_SET_VIEW_MODE', datas.asyncAlteraViewMode);
    yield takeLatest('GET_DATAS_CARTEIRAS', dadosUsuario.asyncPegarDatasCarteiras)
};  
