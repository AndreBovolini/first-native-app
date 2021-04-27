export function newDataInicial(datas, data) {
    return {
      type: 'ASYNC_SET_DATA_INICIAL',
      datas,
      data
    }
};

export function newDataFinal(datas, data) {
    return {
        type: 'ASYNC_SET_DATA_FINAL',
        datas,
        data
      }
}