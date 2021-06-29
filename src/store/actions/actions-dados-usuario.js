import { put, call } from 'redux-saga/effects';

import fetchComAppCarteiras from '../../dados/conta/Carteiras';
import fetchComAppInfosCarteiras from '../../dados/conta/infosCarteiras';
import fetchComAppDatasCarteiras from '../../dados/conta/datasCarteiras'
import { alteraDataLimite, newData, logout } from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../navigation/RootNavigation';
import { pegarDadosPosicaoConsolidada } from './action-posicao-consolidada';




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

  //console.log('CCCCCCCCCCC' + action.dados.nomeCarteira)
    try {
      let response = yield call(fetchComAppDatasCarteiras, action.dados);
      if (response.msg === 'Expired token') {
        yield put(logout())
      }
      yield put({ type: 'SUCCESS_GET_DATAS_CARTEIRAS',  data: response});
      let dataAntiga = '';
      let dataRecente = '';
      dataAntiga = response["data_mais_antiga"]
          if (dataAntiga) {
              //console.log('xxxxxxxxxxxxxxx' + dataAntiga)
              const diaA = dataAntiga.substr(0,2);
              const mesA = dataAntiga.substr(3,2)
              const anoA = dataAntiga.substr(6,4)
              //console.log(diaA,mesA,anoA)
              let timestamp = new Date(`${anoA}-${mesA}-${diaA}`).getTime()
              //console.log('aaaaaa'+timestamp)
              
              dataRecente = response["data_mais_recente"]
              const diaR = dataRecente.substr(0,2);
              const mesR = dataRecente.substr(3,2)
              const anoR = dataRecente.substr(6,4)
              //console.log('bbbb'+diaR,mesR,anoR)
              let timestampR = new Date(`${anoR}-${mesR}-${diaR}`).getTime()
              yield put(alteraDataLimite(timestamp, timestampR))
              yield put(pegarDadosPosicaoConsolidada(action.dados.nomeCarteira))
              yield put(newData(timestamp, timestampR))
          }
      
    } catch (err) {
        //console.log(err)
      yield put({ type: 'FAILURE_GET_DATAS_CARTEIRAS' });
    }  
}

export function* asyncPegarInfosCarteiras(action){
    try {
      let response = yield call(fetchComAppInfosCarteiras, action.token);
      //console.log(response)
      yield put({ type: 'SUCCESS_GET_INFOS_CARTEIRAS',  data: response});
    } catch (err) {
        //console.log(err)
      yield put({ type: 'FAILURE_GET_INFOS_CARTEIRAS' });
    }  
}