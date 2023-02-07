<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="player-form">
          <form class="newPlayer-form" @submit.prevent="">
            <h1>Add new player</h1>
            <label>Ім'я:</label>
            <input
              type="text"
              placeholder="name"
              v-model="newPlayer.name"
              required
            />
            <label>Вік:</label>
            <input
              type="text"
              placeholder="age"
              v-model="newPlayer.age"
              required
            />
            <div class="player-skills">
              <h1>Скіли:</h1>
              <div class="player-skills-radio">
                <label>Швидкість:</label>
                <div class="player-skills-radio-check">
                  <select class="optionsR" v-model="newPlayer.skills.speed">
                    <option v-for="(number, index) in counter" :key="index">
                      {{ number }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="player-skills-radio">
                <label>Удар:</label>
                <div class="player-skills-radio-check">
                  <select class="optionsR" v-model="newPlayer.skills.kick">
                    <option v-for="(number, index) in counter" :key="index">
                      {{ number }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="player-skills-radio">
                <label>Захист:</label>
                <div class="player-skills-radio-check">
                  <select class="optionsR" v-model="newPlayer.skills.defense">
                    <option v-for="(number, index) in counter" :key="index">
                      {{ number }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="player-skills-radio">
                <label>На воротах:</label>
                <div class="player-skills-radio-check">
                  <select
                    class="optionsR"
                    v-model="newPlayer.skills.goalkeepery"
                  >
                    <option v-for="(number, index) in counter" :key="index">
                      {{ number }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="player-skills-radio">
                <label>Дриблінг:</label>
                <div class="player-skills-radio-check">
                  <select class="optionsR" v-model="newPlayer.skills.dribbling">
                    <option v-for="(number, index) in counter" :key="index">
                      {{ number }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="player-skills-error" v-if="showError">
              <p>Select all skills !</p>
            </div>
            <button class="btn btnPrimary" @click="confirmNewPlayer">
              Confirm new player
            </button>
            <div class="player-added" v-if="show">
              <p>Player added !</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPlayer: {
        id: null,
        name: "",
        age: null,
        skills: {
          speed: null,
          kick: null,
          defense: null,
          goalkeepery: null,
          dribbling: null,
        },
      },
      counter: [1, 2, 3, 4, 5],
      playersArray: [],
      show: false,
      showError: false,
    };
  },
  methods: {
    confirmNewPlayer() {
      const newPlayer = {
        id: null,
        name: this.newPlayer.name,
        age: this.newPlayer.age,
        skills: {
          speed: this.newPlayer.skills.speed,
          kick: this.newPlayer.skills.kick,
          defense: this.newPlayer.skills.defense,
          goalkeepery: this.newPlayer.skills.goalkeepery,
          dribbling: this.newPlayer.skills.dribbling,
        },
      };
      console.log(newPlayer);

      if (
        // Wha's wrong?????
        /*  newPlayer.skills.speed &&
        newPlayer.skills.kick &&
        newPlayer.skills.defense &&
        newPlayer.skills.goalkeepery && */
        newPlayer.skills.dribbling == null
      ) {
        this.showError = true;
        console.log("Error, check all skills!");
      } else {
        this.$store.dispatch("addNewPlayer", newPlayer);

        this.newPlayer = {
          id: null,
          name: "",
          age: null,
          skills: {
            speed: null,
            kick: null,
            defense: null,
            goalkeepery: null,
            dribbling: null,
          },
        };
        this.show = true;
        this.showError = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
  font-weight: 800;
  font-size: 20px;
}
.newPlayer-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  button {
    margin-top: 20px;
  }
}
.player-skills {
  width: 50%;
}
.player-skills-radio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.player-skills-radio-check {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}
.player-added {
  margin-top: 20px;
  font-size: 30px;
}
.player-skills-error {
  margin-top: 10px;
  font-size: 20px;
  color: red;
}
</style>
