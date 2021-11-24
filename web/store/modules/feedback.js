const state = () => ({
  message: null,
  color: null,
});

const mutations = {
  setMessage(state, {message, color}) {
    state.message = message;
    state.color = color;
  },
  resetMessage(state) {
    state.message = null;
    state.color = null;
  },
};

const getters = {
  message(state) {
    return state.message;
  },
  color(state) {
    return state.color;
  },
};

export default {
  name: 'feedback',
  namespaced: true,
  mutations,
  state,
  getters,
};
