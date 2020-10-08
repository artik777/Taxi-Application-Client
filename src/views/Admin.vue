<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="orange accent-2 black--text">
          <v-toolbar-title>All taxi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="onRefresh">refresh</v-btn>
        </v-toolbar>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit order</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.carModel"
                      label="Car model"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                      :rules="numberRules"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                      :rules="numberRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
            </v-card-actions>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item, item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item, item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.imageSrc`]="{ item }">
        <v-img
          class="white--text align-end"
          height="70px"
          width="70px"
          :src="item.imageSrc"
        ></v-img>
      </template>
      <template v-slot:[`item.price`]="{ item }">
        {{
          new Intl.NumberFormat("lt", {
            style: "currency",
            currency: "EUR",
            maximumDecimalPlaces: 0,
          }).format(item.price)
        }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item, item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import "firebase/database";

import { mapGetters } from "vuex";
export default {
  name: "Orders",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        { text: "Category", sortable: false, value: "category" },
        { text: "Image", sortable: false, value: "imageSrc" },
        { text: "Car model", sortable: false, value: "carModel" },
        { text: "Price per hour", sortable: false, value: "price" },
        { text: "Quantity", sortable: false, value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: "",
        carModel: "",
        price: 0,
        count: 0,
      },
      numberRules: [
        (v) => !!v || "Field is required",
        (v) => /^\d+$/.test(v) || "Must be a number",
      ],
    };
  },
  computed: {
    ...mapGetters({
      items: "ads",
    }),
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item); // surandam indexa
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item, id) {
      console.log(id);
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1) &&
        firebase
          .database()
          .ref("cars")
          .child(id)
          .remove();
    },
    onRefresh() {
      this.$store.dispatch("fetchAds");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
      });
    },

    save() {
      let id = this.items[this.editedIndex].id;
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
        firebase
          .database()
          .ref("cars")
          .child(id)
          .update({
            category: this.editedItem.category,
            carModel: this.editedItem.carModel,
            price: this.editedItem.price,
            quantity: this.editedItem.quantity,
          });
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>
