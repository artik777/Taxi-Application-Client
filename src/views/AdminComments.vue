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
          <v-spacer></v-spacer>
          <v-btn @click="onRefresh">refresh</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item, item._id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
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
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      comments: "getComments",
    }),
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    deleteItem(item, _id) {
      const index = this.comments.indexOf(item);
      console.log(index);
      confirm("Are you sure you want to delete this item?") &&
        this.comments.splice(index, 1) &&
        fetch("https://taxicodeacademy.herokuapp.com/api/comments/" + _id, {
          method: "DELETE",
        }).then((response) => response.json());
    },
    onRefresh() {
      this.$store.dispatch("fetchComments");
    },
  },
};
</script>
