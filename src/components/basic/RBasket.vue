<template>
  <div class="basket-container">
    <r-select
      v-for="(item, index) in format"
      :key="index"
      :players="players"
      :index="index"
      @change-player="selPlayer"
    ></r-select>
  </div>
</template>
<script>
import RSelect from "./RSelect.vue";
export default {
  components: { RSelect },
  methods: {
    selPlayer(currentObject, currentObjectIndex) {
      this.$emit(
        "change-basket",
        currentObject,
        this.index,
        currentObjectIndex
      );
    },
  },
  mounted() {
    console.log(this.format, this.players);
  },
  props: {
    format: {
      type: Array,
      default() {
        return [];
      },
    },
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
};
</script>
