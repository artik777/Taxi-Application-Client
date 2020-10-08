import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default {
  state: {
    ads: [],
  },
  actions: {
    updateQuantity({ commit }, payload) {
      commit("UPDATEQUANTITY", payload);
    },
    async createAd({ commit }, payload) {
      commit("clearError");
      const newAd = {
        category: payload.category,
        carModel: payload.carModel,
        imageSrc: "",
        price: payload.price,
        quantity: payload.quantity,
      };
      try {
        const key = await firebase
          .database()
          .ref("cars")
          .push(newAd)
          .then((data) => data.key);
        const filename = payload.image.name; // nuotraukos pavadinimas jpg formatu
        const ext = filename.slice(filename.lastIndexOf(".")); //nuotraukos pavadinimo galune .jpg, .png
        await firebase // put to storage
          .storage()
          .ref("cars/" + key + ext)
          .put(payload.image);
        const imgRef = firebase
          .storage()
          .ref()
          .child("cars/" + key + ext);
        const imageSrc = await imgRef.getDownloadURL();
        firebase
          .database()
          .ref("cars")
          .child(key)
          .update({ imageSrc });
        commit("createAd", {
          ...newAd,
          imageSrc,
          id: key,
        });
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
      }
    },
    async fetchAds({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const cars =
          (
            await firebase
              .database()
              .ref("cars")
              .once("value")
          ).val() || {};
        const array = [];
        Object.keys(cars).forEach((id) => {
          const ad = cars[id];
          array.push({ ...ad, id }); // naudojam spread operatoriu tam kad gautume visas reiskmes is masyvo, viska idedam i objekta ir pridadam, id
        });
        commit("loadAds", array);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
      }
    },
  },
  mutations: {
    UPDATEQUANTITY({ ads }, payload) {
      const id = payload.id;
      const itemIndex = ads.findIndex((el) => el.id == id);
      ads[itemIndex].quantity = payload.quantity;
    },
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAds(state, array) {
      state.ads = array;
    },
  },
  getters: {
    ads: ({ ads }) => ads,
  },
};
