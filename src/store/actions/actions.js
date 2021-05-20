import { put, call } from 'redux-saga/effects';

export function newDataInicial(data) {
    return {
      type: 'ASYNC_SET_DATA_INICIAL',
      data
    }
};

export function newDataFinal(data) {
    return {
        type: 'ASYNC_SET_DATA_FINAL',
        data
      }
};

export function alteraCarteira(carteira) {
  return {
    type: 'ASYNC_SET_CARTEIRA',
    carteira
  }
}


export function alteraDataMaisAntiga(dataMaisAntiga) {
  return {
    type: 'ASYNC_SET_DATA_MAIS_ANTIGA',
    dataMaisAntiga
  }
}

export function alteraDataMaisRecente(dataMaisRecente) {
  return {
    type: 'ASYNC_SET_DATA_MAIS_RECENTE',
    dataMaisRecente
  }
}


function apiGet(data) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(data)
      }, 200)
  })
};


export function* asyncSetDataInicial(action) {
 const response = yield call(apiGet, action.data)
 yield put({
     type: 'SET_DATA_INICIAL',
      data: response,
 }); 
}

export function* asyncSetDataFinal(action) {
  const response = yield call(apiGet, action.data)
  yield put({
      type: 'SET_DATA_FINAL',
       data: response,
  });
}

export function* asyncAlteraCarteira(action) {
  yield put({
    type: 'SET_CARTEIRA',
    carteira: action.carteira
  })
}

export function* asyncAlteraDataMaisAntiga(action) {
  yield put({
    type: 'SET_DATA_MAIS_ANTIGA',
    dataMaisAntiga: action.dataMaisAntiga
  })
}

export function* asyncAlteraDataMaisRecente(action) {
  yield put({
    type: 'SET_DATA_MAIS_RECENTE',
    dataMaisRecente: action.dataMaisRecente
  })
}
