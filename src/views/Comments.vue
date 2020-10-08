<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="comments"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="orange accent-2 black--text">
          <v-toolbar-title>All comments</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" sm="8" md="5">
        <v-card v-if="loggedIn" class="elevation-12">
          <v-toolbar color="orange accent-2 black--text" flat>
            <v-toolbar-title>Write a comment</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                filled
                label="Your name"
                :rules="[
                  (v) =>
                    (v && v.length >= 2 && v.length <= 20) ||
                    'Name must have 2 and more characters, but less than 20 characters',
                ]"
              ></v-text-field>
              <v-textarea
                filled
                v-model="comment"
                :counter="500"
                label="Your comment"
                :rules="[
                  (v) =>
                    (v && v.length >= 5 && v.length <= 500) ||
                    'Comment must have 5 and more characters, but less than 500 characters',
                ]"
              ></v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  @click="send"
                  color="orange accent-2 black--text"
                  >Send</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
        <p v-else>If you want to add a comment, please login</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      comment: "",
      timestamp: new Date(),
      options: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      },
      items: [],
      loading: true,
      valid: true,
      headers: [
        { text: "Name", sortable: false, value: "name" },
        { text: "Comment", sortable: false, value: "comment" },
        { text: "Datetime", sortable: false, value: "timestamp" },
        { text: "Ip ", sortable: false, value: "ip" },
      ],
      ip: "",
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
    }),
    ...mapGetters({
      comments: "getComments",
    }),
    error() {
      return this.$store.getters.error;
    },
  },
  beforeMount() {
    if (this.token != "") {
      this.loggedIn = true;
    }
  },
  mounted() {
    fetch("https://api.ipify.org?format=json")
      .then((x) => x.json())
      .then(({ ip }) => {
        this.ip = ip;
      });
  },
  methods: {
    async send() {
      const formData = {
        name: this.name,
        comment: this.comment,
        timestamp: new Intl.DateTimeFormat("lt", this.options).format(
          this.timestamp
        ),
        ip: this.ip,
      };
      try {
        this.$store.dispatch("createComment", formData);
        this.name = "";
        this.comment = "";
        this.close();
      } catch (error) {
        this.$store.dispatch("setError", error.response.data);
        this.close();
      }
    },
  },
};
</script>
