import endPoint from '../endpoint/endpoint';


export const fetchDadosHomePage = (token) =>{

  const apiURL = encodeURIComponent('');
  const apiTeste = 'token=' + token +'&format=json2&URL='+apiURL;

  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
            apiTeste,

  };

  return fetch(EndPoint + 'code=import_data', requestOptions)
    .then(response => response.json())
    .then(response => response);
};

export default fetchDadosHomePage;



