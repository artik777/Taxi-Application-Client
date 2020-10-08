import axios from "axios";

export default {
  state: {
    comments: [],
  },
  mutations: {
    loadComments(state, payload) {
      state.comments = payload;
    },
    createComment(state, payload) {
      state.comments.push(payload);
    },
  },
  actions: {
    async createComment({ commit }, payload) {
      try {
        await axios.post(
          "https://taxicodeacademy.herokuapp.com/api/comments",
          payload
        );
        commit("createComment", payload);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.response.data);
        throw error;
      }
    },
    async fetchComments({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const res = await axios.get(
          "https://taxicodeacademy.herokuapp.com/api/comments"
        );
        const data = res.data;
        commit("loadComments", data);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.response.data);
        throw error;
      }
    },
  },
  getters: {
    getComments: ({ comments }) => comments,
  },
};
