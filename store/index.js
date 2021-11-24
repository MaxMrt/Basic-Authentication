import feedback from './modules/feedback';
import app from './modules/app';

const state = () => ({});

const modules = {
  feedback,
  app,
};

const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    // Load appVars out of cookie
    if (this.$cookie.get('app')) {
      const cookieRes = this.$cookie.get('app');
      if (cookieRes.darkMode) dispatch('app/initDarkMode');
    }
  },
};

export default {
  namespaced: true,
  strict: false,
  modules,
  actions,
  state,
};
