<template>
  <div>
    <div v-if="!loading">
      <v-layout>
        <v-flex xs12>
          <v-carousel height="420px" class="mb-3">
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad"
              :src="ad"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      <HomeItems class="mb-3" />
      <!-- <HomeMap /> -->
    </div>
    <v-container class="h100" fill-height v-else>
      <v-layout align-center justify-center>
        <v-progress-circular
          indeterminate
          color="green"
          :width="4"
          :size="100"
        ></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import HomeItems from "../components/home/HomeItems";
// import HomeMap from "../components/home/HomeMap";

export default {
  data() {
    return {
      promoAds: [
        "https://wallpaperset.com/w/full/8/5/f/180997.jpg",
        "https://images5.alphacoders.com/958/thumb-1920-958461.jpg",
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  components: {
    HomeItems,
    // HomeMap,
  },
};
</script>

<style>
.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
