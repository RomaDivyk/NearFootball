import axios from "axios";

export default {
  state: {
    token: null,
    playersAdded: [],
  },
  mutations: {
    setToken(state, token) {
      console.log(token);
      state.token = token;
    },

    destroyToken(state) {
      state.token = null;
    },

    setPlayers(state, playersArray) {
      console.log(playersArray);
      state.playersAdded = playersArray;
    },

    addNewPlayer(state, newPlayer) {
      state.playersAdded.push(newPlayer);
    },
  },
  actions: {
    authUser({ commit }, authData) {
      const key = "AIzaSyAOyTrULzGd7rbuhaDsFWIMR4V6hmdWV3A";
      return axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          let token = res.data.idToken;
          commit("setToken", token);
          localStorage.setItem("token", token);
        })
        .catch((e) => {
          console.log("Erron! Wrong email or password!");
          this.$router.push("/auth");
        });
    },

    initAuth({ commit }) {
      let token = localStorage.getItem("token");
      if (!token) {
        return false;
      } else {
        commit("setToken", token);
      }
    },

    logoutUser({ commit }) {
      commit("destroyToken");
      localStorage.removeItem("token");
    },

    loadPlayers({ commit }) {
      return axios
        .get(
          "https://okoloukola-13e0b-default-rtdb.firebaseio.com/players.json"
        )
        .then((res) => {
          const playersArray = [];
          for (let key in res.data) {
            playersArray.push({ ...res.data[key], id: key });
          }

          commit("setPlayers", playersArray);
        });
    },

    addNewPlayer({ commit }, newPlayer) {
      return axios
        .post(
          "https://okoloukola-13e0b-default-rtdb.firebaseio.com/players.json",
          newPlayer
        )
        .then((res) => {
          commit("addNewPlayer", newPlayer);
          /* console.log(res); */
        })
        .catch((e) => console.log(e));
    },
  },

  getters: {
    getPlayersAdded(state) {
      return state.playersAdded;
    },

    checkAuthUser(state) {
      return state.token != null;
    },
  },
};
