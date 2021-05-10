const INITIAL_STATE = {
    dataInicial: new Date('2017-08-03'),
    dataFinal: new Date(),
    carteira: '',
}

export default function dates(state= INITIAL_STATE, action) {
   switch (action.type) {
       case 'SET_DATA_INICIAL':
                    return {
                        ...state,
                        dataInicial: action.data.nativeEvent.timestamp
                    };
                    break;
       case 'SET_DATA_FINAL':
                return {
                    ...state,
                    dataFinal: action.data.nativeEvent.timestamp
                };
                break;
        case 'SET_CARTEIRA':
                return {
                    ...state,
                    carteira: action.carteira
                }
        default:
            return state
   }
}