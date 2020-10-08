import firebase from "firebase/app";
import axios from "axios";
import jwt_decode from "jwt-decode";

const user = JSON.parse(localStorage.getItem("user"));
const userEmail = JSON.parse(localStorage.getItem("email"));
export default {
  state: {
    token: user || "",
    userEmail: userEmail || "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    deleteToken(state, payload) {
      state.userEmail = payload;
    },
    deleteEmail(state, payload) {
      state.token = payload;
    },
    setEmail(state, payload) {
      const decoded = jwt_decode(payload);
      let user = decoded;
      state.userEmail = user.email;
      localStorage.setItem("email", JSON.stringify(user.email));
    },
  },
  actions: {
    async adminLogin({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async adminRegister({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async adminLogout({ commit }) {
      await firebase.auth().signOut();
      commit("clearError");
    },

    async login({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const response = await axios.post(
          "https://taxicodeacademy.herokuapp.com/api/user/login",
          payload
        );
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          commit("setToken", response.data);
        }
        commit("setEmail", response.data);
        console.log(response.data);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.response.data);
        throw error;
      }
    },
    async register({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await axios.post(
          "https://taxicodeacademy.herokuapp.com/api/user/register",
          payload
        );
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.response.data);
        throw error;
      }
    },
    async logout({ commit }) {
      await localStorage.removeItem("user");
      await localStorage.removeItem("email");
      const empty = "";
      commit("deleteToken", empty);
      commit("deleteEmail", empty);
      commit("clearError");
    },
  },
  getters: {
    getToken: ({ token }) => token,
    getUserEmail: ({ userEmail }) => userEmail,
  },
};
