import AsyncStorage from '@react-native-async-storage/async-storage';
import endPoint from '../endpoint/endpoint';


async function fetchComAppCarteiras(token_antigo) {
  let token = await AsyncStorage.getItem('token')
  let tokenType = await AsyncStorage.getItem('token_type')
  

  const requestOptions = {
    method: 'GET',
    headers:  {
      'Authorization': tokenType + ' ' + token,
    },
    redirect: 'follow',

  };
  const result = await fetch(endPoint+ 'code=ComApp001&service=ListaCarteiras001', requestOptions);
  return result.json();
}

export default fetchComAppCarteiras;
