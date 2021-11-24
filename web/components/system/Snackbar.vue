<template lang="pug">
  v-snackbar( top :color="color" :value="message" :timeout="snackTimeout")
    .white--text {{ message }}
    template(v-slot:action='{ attrs }')
      v-btn(dark icon @click="dismissError")
        v-icon mdi-close
</template>

<script lang="ts">
import { mapState } from 'vuex';
export default {
  name: 'Snackbar',
  data() {
    return {
      snackTimeout: 3000,
    };
  },
  computed: {
    ...mapState('feedback', ['message', 'color']),
  },
  watch: {
    message() {
      setTimeout(() => {
        this.dismissError();
      }, this.snackTimeout);
    },
  },
  methods: {
    async dismissError() {
      await this.$store.commit('feedback/resetMessage', {
        root: true,
      });
    },
  },
};
</script>
