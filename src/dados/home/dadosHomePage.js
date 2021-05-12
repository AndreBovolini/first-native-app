import endpoint from '../endpoint/endpoint';

async function fetchDadosHomePage(token) {
    console.log(token+'hghghghg')
    const URL = encodeURIComponent('FundScreener001.php?&relat=&data_rr=07/05/2021&data_cart=01/03/2021&variaveis=cnpj_fundo+nome_fundo+classe+taxa_administracao+aplic_min+&agrupar=&gr_classe=FI&cl_cvm=FIA&cl_anb=todos&admin=&gestor=&situacao=4&cotas=7&quali=7&exclu=7&forma=3&largura=960&truncar=200&casas=2&salve=&filtro=&join=inner&overwrite=0&minha_variavel=&transpor=0&salve_obs=&relat_alias_automatico=&flag_tab_carteira=0&periodos=0&periodicidade=mensal&formato_data=1');
  const apiTeste = 'token=' + token + '&format=json&URL=' + URL;
  const requestOptions = {
    method: 'POST',
    headers:  {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept':'/',
    },
    body:
    apiTeste,

  };
  const result = await fetch(endpoint + "code=import_data", requestOptions)
  console.log(result)
  let blob = (result["_bodyBlob"])
  let data = (blob["_data"])
  return result.json()
}

export default fetchDadosHomePage;


