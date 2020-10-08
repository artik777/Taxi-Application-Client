import axios from "axios";

export default {
  state: {
    orders: [],
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const res = await axios.get(
          "https://taxicodeacademy.herokuapp.com/api/orders"
        );
        const data = res.data;
        commit("loadOrders", data);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.response.data);
        throw error;
      }
    },
  },
  getters: {
    getOrders: ({ orders }) => orders,
  },
};
