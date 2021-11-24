const state = () => ({
  token: null,
  user: null,
  loggedIn: false,
  scope: [],
});

const mutations = {
  setToken(state, payload) {
    state.token = payload;
    // Save current status in cookie
    var date = new Date();
    date.setDate(date.getDate() + 30);
    this.$cookie.set('token', state.token, { expires: date });
  },
  deleteAuth(state) {
    state.token = null;
    state.user = null;
    state.loggedIn = false;
    state.scope = [];
    // Remove cookie
    this.$cookie.remove('token');
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setScope(state, payload) {
    state.scope = payload;
  },
  login(state) {
    state.loggedIn = true;
  },
};

const getters = {
  token(state) {
    return state.token;
  },
  user(state) {
    return state.user;
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    return await this.$axios
      .$post('/auth/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('IN VUEX');
        console.log(response);
        commit('setToken', response.token);
        commit('setUser', response.user);
        commit('setScope', response.user.scope);
        commit('login');
      });
  },
  async loadToken({ commit }, token) {
    return await this.$axios
      .$post('/auth/validate', {
        token: token,
      })
      .then((response) => {
        commit('setToken', response.token);
        commit('setUser', response.user);
        commit('setScope', response.user.scope);
        commit('login');
      })
      .catch((error) => {
        commit('deleteAuth');
      });
  },
  async logout({ commit }) {
    commit('deleteAuth');
  },
};

export default {
  name: 'auth',
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
