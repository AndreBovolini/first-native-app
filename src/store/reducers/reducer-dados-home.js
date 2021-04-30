const INITIAL_STATE_RESPONSE = {
    data: [],
    loading: false,
    error: false,
};

export function dadosHomePage(state= INITIAL_STATE_RESPONSE, action) {
   switch (action.type) {
    case 'GET_DADOS_HOME_PAGE_APP':
        return { ...state, loading: true };
      case 'SUCCESS_GET_DADOS_HOME_PAGE_APP':
        return { data: action.data, loading: false, error: false };
      case 'FAILURE_GET_DADOS_HOME_PAGE_APP':
        return { ...state, error: true };
      default:
        return state;
   }
}