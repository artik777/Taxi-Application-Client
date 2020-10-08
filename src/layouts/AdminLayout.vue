<template>
  <v-container class="fill-height" fluid>
    <AdminHeader />
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
  </v-container>
</template>

<script>
import AdminHeader from "../components/admin/AdminHeader.vue";

export default {
  mounted() {
    this.$store.dispatch("fetchAds");
    this.$store.dispatch("fetchOrders");
    
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
  components: { AdminHeader },
};
</script>
