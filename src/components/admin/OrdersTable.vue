<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      sort-by="priceSell"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn @click="onRefresh">refresh</v-btn>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit order</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.status"
                        :items="options"
                        label="Change status"
                      >
                      </v-select>
                    </v-col>
                    <v-col>
                      <v-time-picker
                        format="24hr"
                        v-model="editedItem.timearrived"
                        color="orange"
                      ></v-time-picker>
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
                <v-icon small class="mr-2" @click="editItem(item, item._id)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteItem(item, item._id)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.price`]="{ item }">
        <v-chip :color="priceColor(item.price)" dark>
          {{
            new Intl.NumberFormat("lt", {
              style: "currency",
              currency: "EUR",
              maximumDecimalPlaces: 0,
            }).format(item.price)
          }}
        </v-chip>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="statusColor(item.status)" dark>{{
          item.status
        }}</v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="(legalStatus = statusOrder(item.status))"
          small
          @click="editItem(item)"
          >mdi-pencil</v-icon
        >
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
  props: ["items", "loading"],
  data() {
    return {
      options: ["Completed", "Canceled"],
      dialog: false,
      search: "",
      headers: [
        { text: "Name", sortable: false, value: "name" },
        { text: "Surname", sortable: false, value: "surname" },
        { text: "Phone nr", sortable: false, value: "phone" },
        { text: "Category", sortable: false, value: "category" },
        { text: "Quantity", sortable: false, value: "orderQuantity" },
        { text: "Price per hour", sortable: false, value: "price" },
        { text: "Pickup Address", sortable: false, value: "pickupAddress" },
        {
          text: "Destination Address",
          sortable: false,
          value: "destinationAddress",
        },
        { text: "Email", sortable: false, value: "email" },
        { text: "Pickup time", sortable: false, value: "time" },
        { text: "Pickup date", sortable: false, value: "date" },
        { text: "Time ordered", sortable: false, value: "timestamp" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      selected: [],
      editedIndex: -1,
      editedItem: {
        status: "",
        timearrived: "",
      },
      numberRules: [
        (v) => !!v || "Field is required",
        (v) => /^\d+$/.test(v) || "Must be a number",
      ],
      legalStatus: false,
    };
  },
  computed: {
    ...mapGetters({
      ads: "ads",
    }),
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    onRefresh() {
      this.$store.dispatch("fetchOrders");
    },
    priceColor(price) {
      if (price >= 30) return "red";
      else if (price >= 20) return "orange";
      else return "green";
    },
    statusColor(status) {
      if (status === "Completed") return "green";
      else if (status === "Canceled") return "red";
      else return "orange";
    },
    statusOrder(status) {
      if (status === "Completed") return (this.legalStatus = false);
      else if (status === "Canceled") return (this.legalStatus = false);
      else return (this.legalStatus = true);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
      });
    },

    save() {
      if (this.editedIndex > -1) {
        const id = this.items[this.editedIndex]._id;
        const nr = this.items[this.editedIndex].ordernr;
        const orderQuantity = this.items[this.editedIndex].orderQuantity;
        const itemIndex = this.ads.findIndex((el) => el.id == nr);
        const quantity =
          Number(this.ads[itemIndex].quantity) + Number(orderQuantity);
        Object.assign(this.items[this.editedIndex], this.editedItem);
        fetch("https://taxicodeacademy.herokuapp.com/api/orders/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: this.editedItem.status,
            timearrived: this.editedItem.timearrived,
          }),
        }).then((response) => response.json());
        if (
          this.editedItem.status === "Completed" ||
          this.editedItem.status === "Canceled"
        ) {
          firebase
            .database()
            .ref("cars")
            .child(nr)
            .update({
              quantity: quantity,
            });
        }
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
