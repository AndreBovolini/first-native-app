import AsyncStorage from '@react-native-async-storage/async-storage';
import endPoint from '../endpoint/endpoint';

async function getDadosPosicaoConsolidada(dados) {
  //console.warn(dados)
  let token = await AsyncStorage.getItem('token')
  let tokenType = await AsyncStorage.getItem('token_type')
  //const apiURL = encodeURIComponent('Clientes/ComApp/ListaCarteiras002.php?');
  
  const requestOptions = {
    method: 'GET',
    headers:  {
      'Authorization': tokenType + ' ' + token,
    },
    redirect: 'follow',

  };

  let apiURL = 'code=ComApp001&service=PosicaoConsolidada&nome_portfolio='+dados.nomeCarteira;

  const result = await fetch(endPoint + apiURL, requestOptions);
  //console.warn(result)
  let formatted = await result.json();
  //console.warn(formatted)
  return formatted
}

export default getDadosPosicaoConsolidada;
