import feedback from './modules/feedback';
import app from './modules/app';
import auth from './modules/auth';

const state = () => ({});

const modules = {
  feedback,
  app,
  auth,
};

const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    console.log('___ NUXT INIT');
    // Load appVars out of cookie
    if (this.$cookie.get('app')) {
      console.log('___');
      const cookieRes = this.$cookie.get('app');
      console.log('___');
      console.log(cookieRes);
      if (cookieRes.darkMode) dispatch('app/initDarkMode');
    }

    // Load token out of cookie
    if (this.$cookie.get('token')) {
      const token = this.$cookie.get('token');
      if (token) await dispatch('auth/loadToken', token);
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
