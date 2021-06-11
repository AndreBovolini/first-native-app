import endPoint from '../endpoint/endpoint';

async function comdadoAntigoLogin(apiUsername, apiPassword) {
  const apiTeste = 'username=' + apiUsername + '&password=' + apiPassword;
  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
            apiTeste,

  };
  const result = await fetch(endPoint + 'code=get_token', requestOptions);
  return result.json();
}

export default comdadoAntigoLogin;
