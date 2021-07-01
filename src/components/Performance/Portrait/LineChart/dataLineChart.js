export const dataLineChart = (response, periodoSelecionado) => {

    const keysDatas = Object.keys(response.grafico5.Carteira)
    const respostaDados = keysDatas.map((el, i) => {
        return {
            data: el,
            Carteira: response.grafico5.Carteira[el] ? response.grafico5.Carteira[el] : 0,
            CDI: response.grafico5.CDI[el] ? response.grafico5.CDI[el] : 0,
            PL: response.grafico5.PL[el] ? response.grafico5.PL[el] : 0,
            baseline: '0'
        }
    })

    const SiglaMes = () => ({
        '01': 'Jan',
        '02': 'Fev',
        '03': 'Mar',
        '04': 'Abr',
        '05': 'Mai',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Set',
        '10': 'Out',
        '11': 'Nov',
        '12': 'Dez',
    });

    const transformaClasseAtivo = (classe, tipoAtivo) => {
        let classAtivo = '';
        if (classe) {
            for (const [key, value] of Object.entries(classe)) {
                tipoAtivo === key ? (classAtivo = value) : null;
            }
        }
        return classAtivo;
    };

    const alteraDataPTParaEN = data => {
        data = data.split('/');
        data = data[2] + '-' + data[1] + '-' + data[0];
        return data;
    };

    function oneMonthPeriod(value) {
        let date = Date.parse(alteraDataPTParaEN(value.data));
        let dataAtual = new Date().getTime() - (1000 * 60 * 60 * 24 * 31);
        return date >= dataAtual
    }

    function threeMonthPeriod(value) {
        let date = Date.parse(alteraDataPTParaEN(value.data));
        let dataAtual = new Date().getTime() - (1000 * 60 * 60 * 24 * 92);
        return date >= dataAtual
    }

    function oneYearPeriod(value) {
        let date = Date.parse(alteraDataPTParaEN(value.data));
        let dataAtual = new Date().getTime() - (1000 * 60 * 60 * 24 * 365);
        return date >= dataAtual
    }

    function thisYear(value) {
        let year = value.data.slice(-4);
        return year === periodoSelecionado
    }

    let filteredData = [];
    switch (periodoSelecionado) {
        case '1m':
            filteredData = respostaDados.filter(oneMonthPeriod);
            break;
        case '3m':
            filteredData = respostaDados.filter(threeMonthPeriod);
            break;
        case '2021':
            filteredData = respostaDados.filter(thisYear);
            break;
        case '12m':
            filteredData = respostaDados.filter(oneYearPeriod);
            break;
        case 'Tudo':
            filteredData = respostaDados;
            break;
    };

    let keysAtivos = Object.keys(response.grafico5)

    const ativosRight = ['PL']
    ativosRight.forEach((el) => {
        keysAtivos.splice(keysAtivos.indexOf(el), 1);
    })

    let values = []
    let linelabes = []
    if (filteredData !== []) {
        values = keysAtivos.map((ativo, i) => {
            const valores = filteredData.map((el, i) => {
                if (ativo !== 'PL') {
                    return {
                        name: el.data,
                        value: el[ativo],
                        
                    }
                }
            })
            return {
                label: ativo,
                dataset: valores
            }
        })

        linelabes = filteredData.map((el, i) => {
            return el.data
        })
    }
    
    const labelTool = [...linelabes]
    const label = [...linelabes].reverse()
    let reverseArray = label.map((el) => {
        return transformaClasseAtivo(SiglaMes(), el.slice(3, 5)) + '/' + '20' + el.slice(8, 10)
    })
    let meuArray = []
    reverseArray.forEach((el) => {
        if (meuArray === []) {
            meuArray.push(el)
        } else if (meuArray.find(element => element === el)) {
            meuArray.push("")
        } else {
            meuArray.push(el)
        }
    })
    meuArray = meuArray.reverse()

    const labels = [...meuArray]

    const dataSets = values.map((el, i) => {
        return {
            symbol: 'none',
            data: el.dataset,
            name: el.label,
            type: 'line',
            smooth: true,
        }
    })

    
    return ({
        dataSets,
        labels,
        keysAtivos,
        labelTool
    })
}