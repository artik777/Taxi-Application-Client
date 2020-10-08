<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app>
      <span v-if="token != ''">
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
      </span>

      <span v-else>
        <v-list dense>
          <v-list-item to="/login">
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense>
          <v-list-item to="/register">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </span>

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
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          <h1 @click="onRefresh" class="white--text pointer">Taxi</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="hidden-sm-and-down"
        app
        color="orange accent-2  mr-5 black--text"
        v-for="link in links"
        :key="link.title"
        :to="link.url"
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>
      <span v-if="token != ''">
        <v-btn
          class="hidden-sm-and-down"
          color="orange accent-2  mr-5 black--text"
          @click="onLogout"
        >
          <v-icon left>mdi-exit-to-app</v-icon>Logout
        </v-btn>
      </span>

      <span v-else>
        <router-link to="/login">
          <v-btn
            class="hidden-sm-and-down"
            app
            color="orange accent-2  mr-5 black--text"
            ><v-icon left>mdi-login</v-icon>Login</v-btn
          >
        </router-link>
        <router-link to="/register">
          <v-btn
            class="hidden-sm-and-down"
            app
            color="orange accent-2  mr-5 black--text"
          >
            <v-icon left>mdi-account</v-icon>Register</v-btn
          >
        </router-link>
      </span>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    links() {
      return [
        { title: "Taxi", icon: "mdi-taxi", url: "/" },
        { title: "Feedback", icon: "mdi-comment", url: "/comments" },
      ];
    },
    ...mapGetters({
      token: "getToken",
    }),
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.loggedIn = false;
    },
    onRefresh() {
      this.$store.dispatch("fetchAds");
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
