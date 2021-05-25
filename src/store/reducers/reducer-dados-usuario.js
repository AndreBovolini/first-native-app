const INITIAL_STATE_RESPONSE = {
    data: [],
    loading: false,
    error: false,
};

export function dadosCarteiras(state= INITIAL_STATE_RESPONSE, action) {
   switch (action.type) {
    case 'GET_DADOS_CARTEIRAS':
        return { ...state, loading: true };
      case 'SUCCESS_GET_DADOS_CARTEIRAS':
        return { data: action.data, loading: false, error: false };
      case 'FAILURE_GET_DADOS_CARTEIRAS':
        return { ...state, error: true };
      default:
        return state;
   }
}

export function datasCarteiras(state= INITIAL_STATE_RESPONSE, action) {
   switch (action.type) {
    case 'GET_DATAS_CARTEIRAS':
        return { ...state, loading: true };
      case 'SUCCESS_GET_DATAS_CARTEIRAS':
        return { data: action.data, loading: false, error: false };
      case 'FAILURE_GET_DATAS_CARTEIRAS':
        return { ...state, error: true };
      default:
        return state;
   }
   console.log(action.data)
}

export function infosCarteiras(state= INITIAL_STATE_RESPONSE, action) {
    switch (action.type) {
     case 'GET_INFOS_CARTEIRAS':
         return { ...state, loading: true };
       case 'SUCCESS_GET_INFOS_CARTEIRAS':
         return { data: action.data, loading: false, error: false };
       case 'FAILURE_GET_INFOS_CARTEIRAS':
         return { ...state, error: true };
       default:
         return state;
    }
 }

