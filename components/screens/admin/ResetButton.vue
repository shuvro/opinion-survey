<template>
  <div class="has-text-centered">
    <button
      @click="reset()"
      class="button is-primary is-large is-rounded has-box-shadow"
      style="margin: 5px;"
      >Reset Game 🔥</button>
  </div>
</template>

<script>
export default {
  methods: {
    reset() {
      this.$store.dispatch("reset");
    }
  }
}
</script>
