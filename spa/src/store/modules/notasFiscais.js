export const GET_NOTAS_FISCAIS = "GET_NOTAS_FISCAIS";
export const ADD_NOTA_FISCAL = "ADD_NOTA_FISCAL";

const mock = [
  {
    id: 1,
    numero: 1,
    valor: 1200,
    mes: 8,
    dataRecebimento: "20/08/2021",
    descricaoServico:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis nulla, rutrum ut enim et, vehicula blandit urna. Ut blandit semper arcu in dictum. Donec finibus ligula justo, sed rutrum magna consectetur eu. Ut eleifend tincidunt nisl. Integer vehicula sem at ante aliquet, varius tincidunt lacus tristique. Praesent imperdiet rhoncus lobortis. Mauris dignissim, magna eu tempus bibendum, lacus ante semper diam, euismod sollicitudin leo urna in neque. In hac habitasse platea dictumst. Suspendisse tincidunt viverra lorem ac hendrerit.",
  },
  {
    id: 2,
    numero: 2,
    valor: 1600,
    mes: 9,
    dataRecebimento: "02/09/2021",
    descricaoServico:
      "Suspendisse in cursus purus. Fusce laoreet sapien nec magna gravida, et dictum magna vehicula. Donec porta nibh sed tincidunt faucibus. Suspendisse sed ornare turpis, nec fermentum enim. Suspendisse nec enim bibendum, ultricies arcu ut, finibus nulla. Mauris nec cursus orci, id dapibus mauris. Sed nec quam suscipit, blandit lectus id, eleifend magna. Fusce faucibus id felis vel sagittis. Mauris ornare velit a nulla venenatis laoreet. Praesent consequat justo metus, sit amet efficitur urna consequat non. Donec ac sapien quis lorem congue commodo in eu tortor. Cras iaculis ut nunc id feugiat. Ut sollicitudin at risus sed congue. Proin id erat at felis sodales convallis. Donec dictum sem sed est imperdiet congue. Praesent malesuada ligula sit amet accumsan iaculis.",
  },
  {
    id: 3,
    numero: 3,
    valor: 600,
    mes: 9,
    dataRecebimento: "10/09/2021",
    descricaoServico:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at lectus vel felis blandit mattis. Ut feugiat ex a elit viverra dapibus. Sed suscipit a tellus vel mollis. Morbi placerat cursus ante sed rutrum. In porttitor placerat neque eget vehicula. Pellentesque quis vestibulum velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam quis ante nisi.",
  },
  {
    id: 4,
    numero: 4,
    valor: 1980,
    mes: 9,
    dataRecebimento: "15/09/2021",
    descricaoServico:
      "Maecenas et faucibus felis. Nunc in congue odio. Phasellus luctus ex velit, sit amet condimentum eros commodo sed. Cras accumsan dolor at pretium malesuada. Ut tincidunt et enim ut vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse luctus ultrices dolor ac condimentum. Nunc sed pharetra quam. Curabitur dapibus eleifend magna vitae sodales.",
  },
];

const state = {
  notasFiscais: [],
};

const getters = {
  getNotasFiscais: (state) => state.notasFiscais,
  length: (state) => state.notasFiscais.length,
  getFaturamento: (state) => (ano) => {
    let filtered = state.notasFiscais;

    // enable filter by year
    // if (mes) filtered.filter((nota) => nota.mes === mes);

    return filtered.reduce((acc, obj) => acc + obj.valor, 0);
  },
};

const mutations = {
  [GET_NOTAS_FISCAIS](state, value) {
    state.notasFiscais = value;
  },
  [ADD_NOTA_FISCAL](state, value) {
    state.notasFiscais.push(value);
  },
};

const actions = {
  getNotasFiscais: ({ commit }) => {
    commit(GET_NOTAS_FISCAIS, mock);
  },
  clearNotasFiscais: ({ commit }) => {
    commit(GET_NOTAS_FISCAIS, []);
  },
  addNotaFiscal: ({ commit }, data) => {
    commit(ADD_NOTA_FISCAL, data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
