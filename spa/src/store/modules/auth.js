const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const USER_REQUEST = 'USER_REQUEST';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

// initial state
const state = () => ({
  token: localStorage.getItem('user-token') || 'ok',
  status: '',
});

// getters
const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

// actions
const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    // return new Promise((resolve, reject) => {
    // The Promise used for router redirect in login
    commit(AUTH_REQUEST);
    commit(AUTH_SUCCESS, 'token');
    //   axios({ url: 'auth', data: user, method: 'POST' })
    //     .then((resp) => {
    //       const token = resp.data.token;
    //       localStorage.setItem('user-token', token); // store the token in localstorage
    //       commit(AUTH_SUCCESS, token);
    //       // you have your token, now log in your user :)
    //       dispatch(USER_REQUEST);
    //       resolve(resp);
    //     })
    //     .catch((err) => {
    //       commit(AUTH_ERROR, err);
    //       localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
    //       reject(err);
    //     });
    // });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token'); // clear your user's token from localstorage
      resolve();
    });
  },
};

// mutations
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
