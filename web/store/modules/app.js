const state = () => ({
  darkMode: false,
});

const mutations = {
  changeDarkMode(state) {
    state.darkMode = !state.darkMode;

    // Save current status in cookie
    const appVars = { darkMode: state.darkMode };
    var date = new Date();
    date.setDate(date.getDate() + 30);
    this.$cookie.set('app', appVars, { expires: date });
  },
  initDarkMode(state) {
    state.darkMode = !state.darkMode;
  },
};

const getters = {
  darkMode(state) {
    return state.darkMode;
  },
};

const actions = {
  initDarkMode(context) {
    context.commit('initDarkMode');
  },
};

export default {
  name: 'app',
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
