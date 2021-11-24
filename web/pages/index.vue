<template lang="pug">
  v-main
    v-footer(
      inset
      fixed
      color="transparent").d-md-none
      .container.text-center.white--text.mt-3(style="font-size:10px") &copy; Copyright {{year}}. Made with ♥ in Germany
    v-window(v-model='step')
      v-window-item(:value='1')
        v-row(
          dense
          no-gutters)
          v-col(
            cols="5"
            align-self='center').d-none.d-md-block
              v-container(
                fill-height
                fluid
                )
                v-row(justify="center")
                  v-card(
                    flat
                    color="transparent"
                    tile)
                    v-row(justify="center")
                      v-col(cols="8")
                        .text-h5.mb-1 {{$t('login.header')}}
                        .text-body-2.lightenText--text {{$t('login.text')}}
                      v-col(cols="8")
                        .text-caption.my-2 {{$t('login.email')}}
                        FormErrors(
                          :validator="$v.loginInput.email"
                          :label="$t('login.email')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="lando.norris@mail.com"
                            v-model='loginInput.email'
                            @input="$v.loginInput.email.$touch()"
                            @blur="$v.loginInput.email.$touch()"
                          )
                        .text-caption.my-2 {{$t('login.password')}}
                        FormErrors(
                          :validator="$v.loginInput.password"
                          :label="$t('login.password')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="******"
                            :type="showPw ? 'text' : 'password'"
                            :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPw = !showPw"
                            v-model='loginInput.password'
                            @input="$v.loginInput.password.$touch()"
                            @blur="$v.loginInput.password.$touch()"
                          )
                        v-btn(
                          color="primary"
                          width="100%"
                          @click="login"
                          :loading="loadingButton").mt-5  {{ $t('login.button') }}
                        v-divider.my-5
                        v-btn(
                          color="primary"
                          outlined
                          width="100%"
                          text
                          @click="step++")  {{ $t('register.button') }}
          v-col(
            cols="12" 
            align-self='center').d-md-none
            v-img(
              src="/login.jpg"
              :height="windowHeight"
              min-height="600px")
              v-container(
                fill-height
                fluid
                ).lightbox
                v-row(justify="center")
                  v-card(
                    flat
                    color="transparent"
                    tile)
                    v-row(justify="center")
                      v-col(cols="8")
                        .text-h5.white--text.mb-1 {{$t('login.header')}}
                        .text-body-2.white--text {{$t('login.text')}}
                      v-col(cols="8")
                        .text-caption.white--text.my-2 {{$t('login.email')}}
                        FormErrors(
                          :validator="$v.loginInput.email"
                          :label="$t('login.email')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="lando.norris@mail.com"
                            v-model='loginInput.email'
                            @input="$v.loginInput.email.$touch()"
                            @blur="$v.loginInput.email.$touch()"
                          )
                        .text-caption.white--text.my-2 {{$t('login.password')}}
                        FormErrors(
                          :validator="$v.loginInput.password"
                          :label="$t('login.password')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="******"
                            :type="showPw ? 'text' : 'password'"
                            :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPw = !showPw"
                            v-model='loginInput.password'
                            @input="$v.loginInput.password.$touch()"
                            @blur="$v.loginInput.password.$touch()"
                          )
                        v-btn(
                          color="primary"
                          width="100%"
                          @click="login"
                          :loading="loadingButton").mt-5  {{ $t('login.button') }}
                        v-divider.my-5
                        v-btn(
                          color="primary"
                          outlined
                          width="100%"
                          text
                          @click="step++")  {{ $t('register.button') }}
          v-col(
            cols="7"
            v-resize='onResize').d-none.d-md-block
            v-img(
              src="/login.jpg"
              :height="windowHeight")
              v-container(
                fill-height
                fluid).lightbox
              v-footer(
                absolute
                color="transparent")
                v-row(justify="center")
                  v-btn(
                    x-small
                    fab
                    @click="switchLang").mr-5
                    v-icon(dense :color="$vuetify.theme.themes[theme].primary") mdi-translate
                  v-btn(
                    x-small
                    fab
                    @click="toggleDarkMode").ml-5
                    v-icon(dense :color="$vuetify.theme.themes[theme].primary") mdi-theme-light-dark
                .container.text-center.white--text.mt-3(style="font-size:10px") &copy; Copyright {{year}}. Made with ♥ in Germany
      v-window-item(:value='2')
        v-row(
          dense
          no-gutters)
          v-col(
            cols="7"
            v-resize='onResize').d-none.d-md-block
            v-img(
              src="/register.jpg"
              :height="windowHeight")
              v-container(
                fill-height
                fluid).lightbox
              v-footer(
                absolute
                color="transparent")
                v-row(justify="center")
                  v-btn(
                    x-small
                    fab
                    @click="switchLang").mr-5
                    v-icon(dense :color="$vuetify.theme.themes[theme].primary") mdi-translate
                  v-btn(
                    x-small
                    fab
                    @click="toggleDarkMode").ml-5
                    v-icon(dense :color="$vuetify.theme.themes[theme].primary") mdi-theme-light-dark
                .container.text-center.white--text.mt-3(style="font-size:10px") &copy; Copyright {{year}}. Made with ♥ in Germany
          v-col(
            cols="5"
            align-self='center').d-none.d-md-block
              v-container(
                fill-height
                fluid)
                v-row(justify="center")
                  v-card(
                    flat
                    color="transparent"
                    tile)
                    v-row(justify="center")
                      v-col(cols="8")
                        .text-h5.mb-1 {{$t('register.header')}}
                        .text-body-2.lightenText--text {{$t('register.text')}}
                      v-col(cols="8")
                        .text-caption.my-2 {{$t('register.firstName')}}
                        FormErrors(
                          :validator="$v.registerInput.firstName"
                          :label="$t('register.firstName')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="Lando"
                            v-model='registerInput.firstName'
                            @input="$v.registerInput.firstName.$touch()"
                            @blur="$v.registerInput.firstName.$touch()"
                          )
                        .text-caption.my-2 {{$t('register.lastName')}}
                        FormErrors(
                          :validator="$v.registerInput.lastName"
                          :label="$t('register.lastName')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="Norris"
                            v-model='registerInput.lastName'
                            @input="$v.registerInput.lastName.$touch()"
                            @blur="$v.registerInput.lastName.$touch()"
                          )
                        .text-caption.my-2 {{$t('register.email')}}
                        FormErrors(
                          :validator="$v.registerInput.email"
                          :label="$t('register.email')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="lando.norris@mail.com"
                            v-model='registerInput.email'
                            @input="$v.registerInput.email.$touch()"
                            @blur="$v.registerInput.email.$touch()"
                          )
                        .text-caption.my-2 {{$t('register.password')}}
                        FormErrors(
                          :validator="$v.registerInput.password"
                          :label="$t('register.password')")          
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="******"
                            :type="showPw ? 'text' : 'password'"
                            :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPw = !showPw"
                            v-model='registerInput.password'
                            @input="$v.registerInput.password.$touch()"
                            @blur="$v.registerInput.password.$touch()"
                          )
                        v-btn(
                          color="primary"
                          width="100%"
                          @click="register"
                          :loading="loadingButton"
                          :disabled="loadingButton").mt-5 {{ $t('register.button') }}
                        v-divider.my-5
                        v-btn(
                          color="primary"
                          outlined
                          width="100%"
                          text
                          @click="step--")  {{ $t('login.button') }}
                    
          v-col(
            cols="12"
            align-self='center').d-md-none
            v-img(
              src="/register.jpg"
              :height="windowHeight")
              v-container(
                fill-height
                fluid).lightbox
                v-row(justify="center")
                  v-card(
                    flat
                    color="transparent"
                    tile)
                    v-row(justify="center")
                      v-col(cols="8")
                        .text-h5.white--text.mb-1 {{$t('register.header')}}
                        .text-body-2.white--text {{$t('register.text')}}
                      v-col(cols="8")
                        .text-caption.white--text.my-2 {{$t('register.firstName')}}
                        FormErrors(
                          :validator="$v.registerInput.firstName"
                          :label="$t('register.firstName')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="Lando"
                            v-model='registerInput.firstName'
                            @input="$v.registerInput.firstName.$touch()"
                            @blur="$v.registerInput.firstName.$touch()"
                          )
                        .text-caption.white--text.my-2 {{$t('register.lastName')}}
                        FormErrors(
                          :validator="$v.registerInput.lastName"
                          :label="$t('register.lastName')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="Norris"
                            v-model='registerInput.lastName'
                            @input="$v.registerInput.lastName.$touch()"
                            @blur="$v.registerInput.lastName.$touch()"
                          )
                        .text-caption.white--text.my-2 {{$t('register.email')}}
                        FormErrors(
                          :validator="$v.registerInput.email"
                          :label="$t('register.email')")
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="lando.norris@mail.com"
                            v-model='registerInput.email'
                            @input="$v.registerInput.email.$touch()"
                            @blur="$v.registerInput.email.$touch()"
                          )
                        .text-caption.white--text.my-2 {{$t('register.password')}}
                        FormErrors(
                          :validator="$v.registerInput.password"
                          :label="$t('register.password')")          
                          v-text-field(
                            slot-scope="{ attrs }"
                            v-bind="attrs"
                            solo
                            placeholder="******"
                            :type="showPw ? 'text' : 'password'"
                            :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPw = !showPw"
                            v-model='registerInput.password'
                            @input="$v.registerInput.password.$touch()"
                            @blur="$v.registerInput.password.$touch()"
                          )
                        v-btn(
                          color="primary"
                          width="100%"
                          @click="register"
                          :loading="loadingButton"
                          :disabled="loadingButton").mt-5 {{ $t('register.button') }}
                        v-divider.my-5
                        v-btn(
                          color="primary"
                          outlined
                          width="100%"
                          text
                          @click="step--")  {{ $t('login.button') }}
                    

</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  minLength,
  maxLength,
  required,
  email,
} from 'vuelidate/lib/validators';
import FormErrors from '../components/system/FormErrors.vue';
export default {
  name: 'login',
  components: {
    FormErrors,
  },
  mixins: [validationMixin],
  validations: {
    loginInput: {
      email: {
        required,
        validEmail: email,
      },
      password: {
        required,
      },
    },
    registerInput: {
      firstName: {
        minLength: minLength(3),
        maxLength: maxLength(30),
        required,
      },
      lastName: {
        minLength: minLength(3),
        maxLength: maxLength(30),
        required,
      },
      email: {
        required,
        validEmail: email,
      },
      password: {
        minLength: minLength(6),
        maxLength: maxLength(60),
        required,
      },
    },
  },
  data() {
    return {
      // #################################
      // Component-Variables
      // #################################
      loadingButton: false,
      showPw: false,
      windowHeight: 0,
      step: 1,

      // #################################
      // User-Input
      // #################################
      loginInput: {
        email: null,
        password: null,
      },
      defaultLogin: {
        email: null,
        password: null,
      },
      registerInput: {
        firstName: 'Manuel',
        lastName: 'Neuer',
        email: 'manuel.neuer@test.de',
        password: '12345678',
      },
      defaultRegister: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      },
    };
  },
  mounted() {
    this.onResize();
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    year() {
      return new Date().getUTCFullYear();
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('app/changeDarkMode');
      this.$vuetify.theme.dark = !this.$nuxt.$vuetify.theme.dark;
    },
    switchLang() {
      this.$i18n.getLocaleCookie() === 'de'
        ? this.$i18n.setLocale('en')
        : this.$i18n.setLocale('de');
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    close() {
      this.$v.$reset();
      this.loginInput = Object.assign({}, this.defaultLogin);
      this.registerInput = Object.assign({}, this.defaultRegister);
    },
    async register() {
      this.$v.registerInput.$touch();
      if (this.$v.registerInput.$invalid) {
        return;
      }
      this.loadingButton = true;

      // Create User
      try {
        await this.$axios.$post('/auth/register', this.registerInput);
      } catch (error) {
        if (error.response.status === 409) {
          this.$store.commit('feedback/setMessage', {
            message: 'E-Mail Adresse wird bereits verwendet',
            color: 'warning',
          });
          this.loadingButton = false;
          return;
        } else {
          this.$store.commit('feedback/setMessage', {
            message: 'Ihre Anfrage konnte nicht bearbeitet werden',
            color: 'error',
          });
          this.loadingButton = false;
          return;
        }
      }

      try {
        await this.$store.dispatch('myAuth/login', {
          email: this.registerInput.email,
          password: this.registerInput.password,
        });
        this.$store.commit('feedback/setMessage', {
          message: 'Erfolgreich eingeloggt',
          color: 'success',
        });
      } catch (error) {
        if (error.response.status === 409) {
          this.$store.commit('feedback/setMessage', {
            message: 'Keine Übereinstimmung aus Passwort und E-Mail gefunden',
            color: 'warning',
          });
        } else {
          this.$store.commit('feedback/setMessage', {
            message: 'Ihre Anfrage konnte nicht bearbeitet werden',
            color: 'error',
          });
        }
      }
      this.loadingButton = false;
    },
    async login() {
      this.$v.loginInput.$touch();
      if (this.$v.loginInput.$invalid) {
        return;
      }
      this.loadingButton = true;
      try {
        await this.$store.dispatch('myAuth/login', {
          email: this.loginInput.email,
          password: this.loginInput.password,
        });
        this.$store.commit('feedback/setMessage', {
          message: 'Erfolgreich eingeloggt',
          color: 'success',
        });
      } catch (error) {
        if (error.response.status === 409) {
          this.$store.commit('feedback/setMessage', {
            message: 'Keine Übereinstimmung aus Passwort und E-Mail gefunden',
            color: 'warning',
          });
        } else {
          this.$store.commit('feedback/setMessage', {
            message: 'Ihre Anfrage konnte nicht bearbeitet werden',
            color: 'error',
          });
        }
      }
      this.close();
      this.loadingButton = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.lightbox {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 100%,
    transparent 100%
  );
}
</style>
