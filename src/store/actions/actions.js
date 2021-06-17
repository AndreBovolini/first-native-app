import { put, call } from 'redux-saga/effects';
import { pegarDadosHomePage } from './action-dados-home'


export function newData(dataInicial, dataFinal) {
  return {
    type: 'ASYNC_SET_DATA',
    dataInicial,
    dataFinal
  }
}

export function alteraCarteira(carteira) {
  return {
    type: 'ASYNC_SET_CARTEIRA',
    carteira
  }
}


export function alteraDataLimite(dataMaisAntiga, dataMaisRecente) {
  return {
    type: 'ASYNC_SET_DATA_LIMITE',
    dataMaisAntiga,
    dataMaisRecente
  }
}

export function alteraViewMode(mode) {
  return {
    type: 'ASYNC_SET_VIEW_MODE',
    mode
  }
}

export const logout = () => ({
    type: 'USER_LOGOUT'
})


function apiGet(data) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(data)
      }, 200)
  })
};

export function* asyncSetDatas(action) {
  yield put({
    type: 'SET_DATA',
    dataInicial: action.dataInicial,
    dataFinal: action.dataFinal
  })
  yield put(pegarDadosHomePage())
}

export function* asyncAlteraCarteira(action) {
  yield put({
    type: 'SET_CARTEIRA',
    carteira: action.carteira
  })
}

export function* asyncAlteraDataLimite(action) {
  yield put({
    type: 'SET_DATA_LIMITE',
    dataMaisAntiga: action.dataMaisAntiga,
    dataMaisRecente: action.dataMaisRecente
  })
}

export function* asyncAlteraViewMode(action) {
  yield put({
    type: 'SET_VIEW_MODE',
    mode: action.mode
  })
}
