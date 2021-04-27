import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'

function apiGet(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 3000)
    })
};


function* asyncSetDataInicial(action) {
   const response = yield call(apiGet, action.data)
   yield put({
       type: 'SET_DATA_INICIAL',
        datas: action.datas,
        data: response,
   });
}


export default function* root() {
    yield takeLatest('ASYNC_SET_DATA_INICIAL', asyncSetDataInicial);
};
