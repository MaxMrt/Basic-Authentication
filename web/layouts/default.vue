<template lang="pug">
v-app(:style="{background: $vuetify.theme.themes[theme].cardBackground}")
  Snackbar
  v-main
    nuxt
</template>

<script lang="ts">
import Snackbar from '../components/system/Snackbar.vue';
export default {
  auth: false,
  components: {
    Snackbar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  data() {
    return {};
  },

  beforeCreate() {
    this.$vuetify.theme.dark = this.$store.state.app.darkMode;
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
