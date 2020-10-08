<template>
  <v-container class="fill-height">
    <router-view></router-view>
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
export default {
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
};
</script>
