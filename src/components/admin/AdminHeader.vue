<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <v-list-item @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-for="link in links" :key="link.title">
        <v-list-item :to="link.url">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="black" dark height="70">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/admin" tag="span" class="pointer">
          <h1 class="black white--text pointer">Admin Panel</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        class="hidden-md-and-down"
        app
        color="orange accent-2 mr-5 black--text"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>
      <v-btn
        class="hidden-md-and-down"
        color="orange accent-2 mr-5 black--text"
        @click="onLogout"
      >
        <v-icon left>mdi-exit-to-app</v-icon>Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data: () => ({
    drawer: null,
    loggedIn: false,
  }),
  computed: {
    links() {
      return [
        { title: "Cars", icon: "mdi-taxi", url: "/admin" },
        { title: "Add car", icon: "mdi-car", url: "/add" },
        { title: "Add user", icon: "mdi-account", url: "/adminregistration" },
        { title: "Orders", icon: "mdi-alarm-panel", url: "/orders" },
        { title: "Comments", icon: "mdi-comment", url: "/admincomments" },
      ];
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("adminLogout");
      this.$router.push("/adminlogin");
      this.loggedIn = false;
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
