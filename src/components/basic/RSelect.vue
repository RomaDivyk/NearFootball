<template>
  <select class="optionsR" v-model="currentPlayer">
    <option v-for="player in players" :key="player.id">
      {{ player.name }}
    </option>
  </select>
</template>
<script>
export default {
  props: {
    players: {
      type: Array,
      default() {
        return [];
      },
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      currentPlayer: "",
    };
  },
  watch: {
    currentPlayer: {
      handler() {
        this.$emit("change-player", this.currentObject, this.index);
      },
    },
  },
  computed: {
    currentObject() {
      let player = null;
      this.players.forEach((element) => {
        if (element.name === this.currentPlayer) {
          player = element;
        }
      });
      return player;
    },
  },
};
</script>

<style scoped></style>
