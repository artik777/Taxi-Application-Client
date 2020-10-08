<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg4 xl4 v-for="ad in items" :key="ad.id">
        <ItemCard
          :id="ad.id"
          :key="ad.id"
          :imageSrc="ad.imageSrc"
          :category="ad.category"
          :price="ad.price"
          :carModel="ad.carModel"
          :quantity="ad.quantity"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ItemCard from "./HomeItemCard";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      items: "ads",
    }),
  },
  components: { ItemCard },
};
</script>
