<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--black mb-3">Add new car</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Category"
            filled
            name="category"
            color="orange"
            type="text"
            v-model="category"
            required
            :rules="[(v) => !!v || 'Category is required']"
          ></v-text-field>
          <v-text-field
            label="Car model"
            filled
            name="carModel"
            color="orange"
            type="text"
            v-model="carModel"
            required
            :rules="[(v) => !!v || 'Name is required']"
          ></v-text-field>
          <v-text-field
            label="Price per hour"
            name="price"
            filled
            color="orange"
            type="text"
            v-model="price"
            required
            :rules="[
              (v) => !!v || 'Price is required',
              (v) => /^\d+$/.test(v) || 'Not a number',
            ]"
          ></v-text-field>
          <v-text-field
            label="Quantity"
            name="quantity"
            filled
            color="orange"
            type="text"
            v-model="quantity"
            required
            :rules="[
              (v) => !!v || 'Quantity is required',
              (v) => /^\d+$/.test(v) || 'Not a number',
            ]"
          ></v-text-field>
        </v-form>
        <v-layout class="mb-5">
          <v-btn class="orange--text" color="black" @click="triggerUpload">
            <v-icon left>mdi-cloud-upload</v-icon>Upload
          </v-btn>
          <input
            ref="fileInput"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFileChange"
          />
        </v-layout>
        <v-layout class="mb-5">
          <v-flex xs12>
            <img :src="imageSrc" height="100" v-if="imageSrc" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            class="orange black--text"
            :disabled="!valid || !image || loading"
            @click="createAd"
            >Add</v-btn
          >
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category: "",
      carModel: "",
      image: null,
      price: "",
      quantity: "",
      imageSrc: "",
      valid: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          category: this.category,
          carModel: this.carModel,
          image: this.image,
          price: this.price,
          quantity: this.quantity,
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/admin");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file; // perduodam i image pati faila
    },
  },
};
</script>
