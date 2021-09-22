const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
import authApi from "api/auth";

// initial state
const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
};

// getters
const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

// actions
const actions = {
  login: async ({ commit, dispatch }, data) => {
    const { token } = await authApi.login(data).then((res) => res.data);

    if (token) {
      localStorage.setItem("user-token", token); // store the token in localstorage
      commit(AUTH_SUCCESS, token);
    } else {
      commit(AUTH_ERROR, "err");
      localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
    }

    return token;
  },
  logout: ({ commit, dispatch }) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem("user-token"); // clear your user's token from localstorage
  },
};

// mutations
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "success";
    state.token = token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: () => {
    state.status = "";
    state.token = "";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
