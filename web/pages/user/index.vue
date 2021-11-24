<template lang="pug">
  v-main
    v-row(justify="center")
      v-col(cols="10" align="center")
        h1.font-weight-light.text-uppercase.mb-2.mr-4 Test
        v-btn(color="primary" @click="testUser").mr-3 User
</template>

<script>
export default {
  name: 'userIndex',
  middleware: 'auth',
  data() {
    return {};
  },
  methods: {
    async testUser() {
      try {
        await this.$axios.$get('/test/credentials/user');
      } catch (error) {
        if (error.response.status === 403) {
          this.$store.commit('feedback/setMessage', {
            message: 'Unzureichende Berechtigungen',
            color: 'warning',
          });
        } else {
          this.$store.commit('feedback/setMessage', {
            message: 'Ihre Anfrage konnte nicht bearbeitet werden',
            color: 'error',
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
