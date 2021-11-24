import feedback from './modules/feedback';
import app from './modules/app';
import myAuth from './modules/myAuth';

const state = () => ({});

const modules = {
  feedback,
  app,
  myAuth,
};

const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    // Load appVars out of cookie
    if (this.$cookie.get('app')) {
      const cookieRes = this.$cookie.get('app');
      if (cookieRes.darkMode) dispatch('app/initDarkMode');
    }

    // Load token out of cookie
    if (this.$cookie.get('token')) {
      const token = this.$cookie.get('token');
      if (token) await dispatch('myAuth/loadToken', token);
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
