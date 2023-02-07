<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div id="app">
          <h1>Гравці</h1>
          <div class="players" v-for="player in players" :key="player.id">
            {{ player.name }}
          </div>
          <newPlayer></newPlayer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import newPlayer from "@/components/NewPlayer.vue";

export default {
  components: { newPlayer },
  data() {
    return {
      players: [],
    };
  },
  created() {
    this.$store.dispatch("loadPlayers");
    this.players = this.playersLoaded;
  },
  computed: {
    playersLoaded() {
      return this.$store.getters.getPlayersAdded;
    },
    // проблема, прогружається після переходу на якусь сторінку
  },
};
</script>

<style lang="scss"></style>
