<template>
  <v-container class="fill-height pa-0" fluid>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <template v-if="error">
      <v-snackbar
        :color="error"
        :multi-line="true"
        :timeout="5000"
        @click="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn class="ml-5" color="red darken-4" @click="closeError"
          >Close</v-btn
        >
      </v-snackbar>
    </template>
    <Footer />
  </v-container>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  mounted() {
    this.$store.dispatch("fetchAds");
    this.$store.dispatch("fetchComments");
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
  },
  components: { Header, Footer },
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
