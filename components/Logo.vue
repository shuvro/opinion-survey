<template>
  <section></section>
</template>

<style scoped>
section {
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 25vh;
  position: absolute;
  background: transparent url(~assets/images/bg-header.svg) no-repeat top left;
  background-size: cover;
}
@media screen
  and (min-width: 460px) {
  section {
    min-height: 30vh;
  }
}
@media screen
  and (min-width: 640px) {
  section {
    min-height: 40vh;
  }
}
</style>
