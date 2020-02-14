<template>
  <div class="has-text-centered">
    <button
      @click.prevent="next()"
      class="button is-white is-large is-rounded has-box-shadow"
      :disabled="busy"
    >{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {
      busy: false
    }
  },
  methods: {
    next() {
      this.busy = true;

      this.$store.dispatch('next');

      setInterval(() => {
        this.busy = false
      }, 2500);
    }
  }
};
</script>
