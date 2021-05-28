const INITIAL_STATE = {
    dataInicial: 0,
    dataFinal: 0,
    carteira: '',
    dataMaisAntiga: 0,
    dataMaisRecente: 0,
    mode: 'dark'
}

export default function dates(state= INITIAL_STATE, action) {
   switch (action.type) {
       case 'SET_DATA_INICIAL':
                    return {
                        ...state,
                        dataInicial: action.data
                    };
                    break;
       case 'SET_DATA_FINAL':
                return {
                    ...state,
                    dataFinal: action.data
                };
                break;
        case 'SET_CARTEIRA':
                return {
                    ...state,
                    carteira: action.carteira 
                }
                break;
        case 'SET_DATA_MAIS_ANTIGA':
                return {
                    ...state,
                    dataMaisAntiga: action.dataMaisAntiga
                }
                break;
        case 'SET_DATA_MAIS_RECENTE':
                return {
                    ...state,
                    dataMaisRecente: action.dataMaisRecente
                }
                break;
        case 'SET_VIEW_MODE':
                return {
                    ...state,
                    mode: action.mode
                }   
                break;
        default:
            return state
   }
}