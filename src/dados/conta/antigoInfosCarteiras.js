import {pathCMD} from '../endpoint/endpoint';

async function fetchAntigoComAppInfosCarteiras(token) {
  //const apiURL = encodeURIComponent('Clientes/ComApp/ListaCarteiras002.php?');
    const apiTeste = 'token=' + token +  '&format=json2';
  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
            apiTeste,

  };
  const result = await fetch(pathCMD + 'ListaCarteiras002.php', requestOptions);
  return result.json();
}

export default fetchAntigoComAppInfosCarteiras;
