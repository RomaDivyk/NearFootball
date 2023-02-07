<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="random-form">
          <h1 class="title">Randomize</h1>
          <h2 class="headTwo">Select randomize</h2>
          <select class="selectR" v-model="selectType" @change="changeType">
            <option>Дві по 5</option>
            <option>Три по 5</option>
            <option>Дві по 6</option>
            <option>Три по 6</option>
          </select>
          <h2 class="headTwo">Select players</h2>
          <r-basket
            v-for="(item, index) in type"
            :key="index"
            :format="item"
            :players="playersLoaded"
            :index="index"
            @change-basket="selBasket"
          >
          </r-basket>

          <button class="btn" @click="randomS">Go randomize</button>
          <div class="first-team">
            <h2>Перша тіма</h2>
            <div v-for="(player, index) in firstTeam">
              <p v-for="pl in player" :key="pl.id">
                {{ pl.name }}
              </p>
            </div>
          </div>
          <div class="second-team">
            <h2>Друга тіма</h2>
            <div v-for="(player, index) in secondTeam">
              <p v-for="pl in player" :key="pl.id">
                {{ pl.name }}
              </p>
            </div>
          </div>
          <div class="third-team" v-if="show">
            <h2>Третя тіма</h2>
            <div v-for="(player, index) in thirdTeam">
              <p v-for="pl in player" :key="pl.id">
                {{ pl.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RSelect from "@/components/basic/RSelect.vue";
import RBasket from "@/components/basic/RBasket.vue";

export default {
  components: { RSelect, RBasket },

  data() {
    return {
      defaultType: {
        twoFive: [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
          [9, 10],
        ],
        threeFive: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
          [13, 14, 15],
        ],
        twoSix: [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
          [9, 10],
          [11, 12],
        ],

        threeSix: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
          [13, 14, 15],
          [16, 17, 18],
        ],
      },
      type: [],
      selectType: null,
      players: [],
      selected: [],

      selectedPlayers: [],

      firstTeam: [],
      secondTeam: [],
      thirdTeam: [],

      show: true,
    };
  },

  methods: {
    changeType() {
      if (this.selectType === "Дві по 5") {
        this.type = this.defaultType.twoFive;
        this.show = false;
      }
      if (this.selectType === "Три по 5") {
        this.type = this.defaultType.threeFive;
        this.show = true;
      }
      if (this.selectType === "Дві по 6") {
        this.type = this.defaultType.twoSix;
        this.show = false;
      }
      if (this.selectType === "Три по 6") {
        this.type = this.defaultType.threeSix;
        this.show = true;
      }

      this.selected = this.type;
    },

    randomS() {
      let teamCount = this.type[0].length;
      let basketCount = this.type.length;
      let result = [];

      for (let i = 0; i < teamCount; i++) {
        result.push([]);
      }

      this.type.forEach((el) => {
        let shuffledArray = el.sort((a, b) => 0.5 - Math.random());
        console.log(shuffledArray, "shuffle arr");

        const splitArr = (arr, chunks) =>
          arr.reduce(
            (acc, n, i) => (
              (acc[i % chunks] = acc[i % chunks] || []).push(n), acc
            ),
            []
          );

        let newArr = splitArr(shuffledArray, teamCount);
        console.log(newArr, "new arr");

        result[0].push(newArr[0]);
        result[1].push(newArr[1]);
        if (teamCount == 3) {
          result[2].push(newArr[2]);
        }
      });

      console.log(result, "result");
      this.firstTeam = result[0];
      this.secondTeam = result[1];
      this.thirdTeam = result[2];
      console.log(this.firstTeam);
      console.log(this.secondTeam);
      console.log(this.thirdTeam);
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    selBasket(player, basketIndex, playerIndex) {
      console.log(player, basketIndex, playerIndex);
      this.selected[basketIndex][playerIndex] = player;
      console.log(this.selected);
    },
  },
  mounted() {
    this.$store.dispatch("loadPlayers");
  },

  computed: {
    playersLoaded() {
      return this.$store.getters.getPlayersAdded;
    },
  },
};
</script>

<style lang="scss" scoped>
.random-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    margin-top: 20px;
  }
}
.basket {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
h2 {
  font-weight: 800;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
