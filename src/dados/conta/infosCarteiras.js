import { pathCMD } from '../endpoint/endpoint';

async function fetchComAppInfosCarteiras(token) {
    console.log(token)
  const apiTeste = 'token=' + token;
  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
            apiTeste,

  };
  const result = await fetch(pathCMD + 'ListaCarteiras001.php', requestOptions);
  return result.json();
}

export default fetchComAppInfosCarteiras;
