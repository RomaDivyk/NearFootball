<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div id="app">
          <randomize></randomize>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import randomize from "@/components/Randomize.vue";
export default {
  components: { randomize },
};
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
