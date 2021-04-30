import { put, call } from 'redux-saga/effects';

export function newDataInicial(datas, data) {
    return {
      type: 'ASYNC_SET_DATA_INICIAL',
      datas,
      data
    }
};

export function newDataFinal(datas, data) {
    return {
        type: 'ASYNC_SET_DATA_FINAL',
        datas,
        data
      }
};

export function alteraCarteira(carteira) {
  return {
    type: 'ASYNC_SET_CARTEIRA',
    carteira
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
      datas: action.datas,
      data: response,
 }); 
}

export function* asyncSetDataFinal(action) {
  const response = yield call(apiGet, action.data)
  yield put({
      type: 'SET_DATA_FINAL',
       datas: action.datas,
       data: response,
  });
}

export function* asyncAlteraCarteira(action) {
  yield put({
    type: 'SET_CARTEIRA',
    carteira: action.carteira
  })
}
