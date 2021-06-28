const INITIAL_STATE_RESPONSE = {
    data: [],
    loading: false,
    error: false,
};

export function dadosPosicaoConsolidada(state= INITIAL_STATE_RESPONSE, action) {
   switch (action.type) {
    case 'GET_DADOS_POSICAO_CONSOLIDADA':
        return { ...state, loading: true };
      case 'SUCCESS_GET_DADOS_POSICAO_CONSOLIDADA':
        return { data: action.data, loading: false, error: false };
      case 'FAILURE_GET_DADOS_POSICAO_CONSOLIDADA':
        return { ...state, error: true };
      default:
        return state;
   }
}