import AsyncStorage from '@react-native-async-storage/async-storage';
import endPoint from '../endpoint/endpoint';

async function fetchComAppInfosCarteiras(antigo_token) {

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

  const result = await fetch(endPoint + 'code=ComApp001&service=ListaCarteiras002', requestOptions);
  return result.json();
}

export default fetchComAppInfosCarteiras;
