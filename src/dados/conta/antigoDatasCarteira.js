import {pathCMD} from '../endpoint/endpoint';

async function fetchAntigoComAppDatasCarteiras(dados) {
  console.log('dados ' + dados.nomeCarteira)
  //const apiURL = encodeURIComponent('Clientes/ComApp/ListaCarteiras002.php?');
    const apiTeste = 'token=' + dados.token + '&nome_carteira=' + dados.nomeCarteira + '&format=json2'
  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
            apiTeste,

  };
  const result = await fetch(pathCMD + 'ListaDatasCarteira001.php', requestOptions);
  return result.json();
}

export default fetchAntigoComAppDatasCarteiras;
