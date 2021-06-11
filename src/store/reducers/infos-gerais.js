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
        case 'SET_DATA':
            return {
                ...state,
                dataInicial: action.dataInicial,
                dataFinal: action.dataFinal
            }
        case 'SET_CARTEIRA':
                return {
                    ...state,
                    carteira: action.carteira 
                }
                break;
        case 'SET_DATA_LIMITE':
            return {
                ...state,
                dataMaisAntiga: action.dataMaisAntiga,
                dataMaisRecente: action.dataMaisRecente
            }
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