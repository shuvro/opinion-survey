<template>
  <section class="flex flex-column">
    <header class="flex-item" style="height: 20vh; margin-top: 30vh;"></header>
    <main class="flex-item" style="height: 50vh;">
      <h1 class="title has-text-centered">Thank you for&nbsp;playing🎉</h1>
      <img
        src="~assets/images/spinner-rings.svg"
        class="loader pt-20"
      >
    </main>
  </section>
</template>

<style lang="scss" scoped>
  .loader {
    display: block;
    width: 128px;
    height: auto;
    margin: 0 auto; // center horizontally
  }
</style>
