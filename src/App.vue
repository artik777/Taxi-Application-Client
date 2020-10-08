<template>
  <v-app id="inspire">
    <div :is="layout">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
import MainLayout from "@/layouts/MainLayout";
import EmptyLayout from "@/layouts/EmptyLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "main" || "empty") + "-layout";
    },
  },
  components: {
    AdminLayout,
    MainLayout,
    EmptyLayout,
  },
};
</script>
