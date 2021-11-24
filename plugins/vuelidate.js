import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor';
Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  i18n: 'validation', // Path to validation messages. Can be deeply.nested.property.
});
