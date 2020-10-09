<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="180px" :src="imageSrc">
      <p v-if="quantity == 0" class="reserved">All Cars Reserved</p>
      <v-card-title>{{ category }}</v-card-title>
    </v-img>
    <v-card-title>
      {{
        new Intl.NumberFormat("lt", {
          style: "currency",
          currency: "EUR",
          maximumDecimalPlaces: 0,
        }).format(price) + " per hour"
      }}
    </v-card-title>
    <v-card-subtitle>{{ "Total cars available: " + quantity }}</v-card-subtitle>
    <v-chip v-if="quantity == 0" color="orange" class="white--text ma-2">{{
      statusReserved
    }}</v-chip>
    <v-chip v-else color="green" class="white--text ma-2">{{
      statusAvailable
    }}</v-chip>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange accent-2 "
            dark
            class="black--text mb-2"
            v-bind="attrs"
            v-on="on"
            >Order</v-btn
          >
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="imageSrc"
                  ></v-img>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="d-flex align-center justify-space-between">
                      <v-card-title class="pa-0 ma-0">Price:</v-card-title>
                      <v-card-title class="pa-0 ma-0">{{
                        (price * orderQuantity).toFixed(2) + "€ per hour"
                      }}</v-card-title>
                    </div>

                    <div class="d-flex align-center justify-space-between">
                      <v-card-title class="pa-0">{{
                        "Quantity:" + orderQuantity
                      }}</v-card-title>
                      <div class="d-flex">
                        <v-btn
                          class="orange accent-2 mr-3 pointer"
                          @click="inc()"
                        >
                          +
                        </v-btn>
                        <v-btn class="orange accent-2  pointer" @click="dec()">
                          -
                        </v-btn>
                      </div>
                    </div>
                    <v-text-field
                      v-model="phone"
                      label="Your phone number "
                      :rules="phoneRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="name"
                      label="Your name"
                      :rules="textRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="surname"
                      label="Your surname"
                      :rules="textRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="pickupAddress"
                      label="Pickup Location"
                      :rules="addressRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="destinationAddress"
                      label="Set Destination"
                      :rules="addressRules"
                    ></v-text-field>
                    <v-date-picker
                      v-model="picker"
                      :min="nowDate"
                      :max="getEndDate"
                      full-width
                      color="orange"
                      header-color="orange"
                    ></v-date-picker>
                    <v-time-picker
                      format="24hr"
                      v-model="e7"
                      color="orange"
                    ></v-time-picker>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" @click="close">Cancel</v-btn>
            <v-btn
              :disabled="
                !loggedIn ||
                  quantity <= 0 ||
                  !valid ||
                  orderQuantity <= 0 ||
                  phone === '' ||
                  name === '' ||
                  surname === '' ||
                  pickupAddress === '' ||
                  destinationAddress === ''
              "
              class="orange accent-2 mr-5 black--text"
              @click="buy"
              >order</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  props: ["id", "imageSrc", "category", "price", "carModel", "quantity"],
  data: () => ({
    nowDate: new Date().toISOString().slice(0, 10),
    date: new Date(),
    picker: new Date().toISOString().substr(0, 10),
    e7: new Intl.DateTimeFormat("lt", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(new Date()),
    dialog: false,
    valid: true,
    phone: "",
    name: "",
    surname: "",
    pickupAddress: "",
    destinationAddress: "",
    orderQuantity: 0,
    statusAvailable: "Available",
    statusReserved: "Reserved",
    status: "New",
    timearrived: "",
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
    disabled: false,
    loggedIn: false,
    textRules: [
      (v) => !!v || "Field is required",
      (v) =>
        (v && v.length >= 2 && v.length <= 40) ||
        "Must have 2 and more characters, but less than 40 characters ",
    ],
    addressRules: [
      (v) => !!v || "Field is required",
      (v) =>
        (v && v.length >= 5 && v.length <= 50) ||
        "Must have 5 and more characters, but less than 50 characters ",
    ],
    phoneRules: [
      (v) =>
        (v && v.length >= 9 && v.length <= 12) ||
        "Must have 9 or 12 characters ",
      (v) => /(86|\+3706)\d{7}$/.test(v) || "Must have valid Lithuanian number",
    ],
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  computed: {
    getEndDate() {
      const endDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        5
      );
      return endDate.toISOString().slice(0, 10);
    },
    ...mapGetters({
      ads: "ads",
    }),
    ...mapGetters({
      token: "getToken",
    }),
    ...mapGetters({
      email: "getUserEmail",
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
  methods: {
    inc() {
      const itemIndex = this.ads.findIndex((el) => el.id == this.id);
      const DiffItemsHaveAndOrdered =
        this.ads[itemIndex].quantity - this.orderQuantity;
      if (DiffItemsHaveAndOrdered >= 1) {
        this.orderQuantity++;
      }
    },
    dec() {
      if (this.orderQuantity > 0) {
        this.orderQuantity--;
      }
    },
    close() {
      this.dialog = false;
    },
    async buy() {
      const itemIndex = this.ads.findIndex((el) => el.id == this.id);
      const quantity = this.ads[itemIndex].quantity - this.orderQuantity;
      const id = this.id;
      const payload = {
        id: id,
        quantity: quantity,
      };
      const formData = {
        name: this.name,
        surname: this.surname,
        category: this.category,
        carModel: this.carModel,
        orderQuantity: Number(this.orderQuantity),
        price: Number(this.price),
        timespent: 0,
        ordernr: this.id,
        phone: this.phone,
        pickupAddress: this.pickupAddress,
        destinationAddress: this.destinationAddress,
        time: this.e7,
        timearrived: this.e7,
        date: this.picker,
        email: this.email,
        timestamp: new Intl.DateTimeFormat("lt", this.options).format(
          this.timestamp
        ),
        computer: navigator.userAgent,
        status: this.status,
      };
      try {
        const res = await axios.post(
          "https://taxicodeacademy.herokuapp.com/api/orders",
          formData,
          {
            headers: {
              "auth-token": this.token,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) {
          firebase
            .database()
            .ref("cars")
            .child(this.id)
            .update({
              quantity: quantity,
            });
          this.$store.dispatch("updateQuantity", payload);
          this.$store.dispatch("setError", "You have successfully ordered");
          this.name = "";
          this.surname = "";
          this.phone = "";
          this.orderQuantity = 0;
          this.pickupAddress = "";
          this.destinationAddress = "";
          this.e7 = null;
          this.picker = null;
        }
        this.close();
      } catch (error) {
        this.$store.dispatch("setError", error.response.data);
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.reserved {
  top: 2em;
  left: -4em;
  color: #fff;
  display: block;
  position: absolute;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.06em;
  background-color: #a00;
  padding: 0.5em 5em 0.4em 5em;
  text-shadow: 0 0 0.75em #444;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
  font: bold 16px/1.2em Arial, Sans-Serif;
  transform: rotate(-30deg) scale(0.75, 1);
  z-index: 10;
}
.reserved:before {
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: -0.3em -5em;
  transform: scale(0.7);
  border: 2px rgba(255, 255, 255, 0.7) dashed;
}
button {
  font-size: 20px !important;
}
::v-deep .v-card__text,
::v-deep .v-card__actions {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
::v-deep .v-card__text {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
</style>
