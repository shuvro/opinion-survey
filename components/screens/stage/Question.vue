<template>
  <section class="flex flex-column flex-center">
    <header class="animated slideInDown" style="height: 20vh; margin-top: 30vh;">
      <h1 class="title is-4 has-text-centered has-text-shadow text--question">{{ question.text }}</h1>
    </header>
    <main class="flex" style="min-height: 50vh; width: 100vw;">
        <!-- Left answer tile -->
        <a
          class="
            flex-item flex flex-column flex-around
            bg-yellow has-text-white has-text-shadow
            animated slideInLeft
          "
          style="min-height: 50vh;"
          v-bind:style="stylesForAnswerA"
        >
          <h2 class="title is-4 has-text-white has-text-centered text--answer">
            {{ question.answers.a }}
          </h2>
          <h2 class="title is-2 has-text-white has-text-centered text--answer">
            <span>{{ votesForA }}&percnt;</span>
          </h2>
        </a>

        <!-- Right answer tile -->
        <a
          class="
            flex-item flex flex-column flex-around
            bg-orange has-text-white has-text-shadow
            animated slideInRight
          "
          style="min-height: 50vh;"
          v-bind:style="stylesForAnswerB"
        >
          <h2 class="title is-4 has-text-white has-text-centered text--answer">
            {{ question.answers.b }}
          </h2>
          <h2 class="title is-2 has-text-white has-text-centered text--answer">
            <span>{{ votesForB }}&percnt;</span>
          </h2>
        </a>
    </main>
  </section>
</template>

<script>
import { getItemById } from '~/plugins/game'

export default {
  computed: {
    stylesForAnswerA() {
      return {
        background: `linear-gradient(to top, rgba(226, 202, 64, 1) ${this.votesForA}%, rgba(226, 202, 64, .25) ${this.votesForA}%)`
      }
    },
    stylesForAnswerB() {
      return {
        background: `linear-gradient(to top, rgba(241, 98, 96, 1) ${this.votesForB}%, rgba(241, 98, 96, .25) ${this.votesForB}%)`
      }
    },
    question() {
      const { activeQuestionId, questions } = this.$store.state.game

      return getItemById(activeQuestionId, questions)
    },
    votes() {
      return this.question.votes.a + this.question.votes.b;
    },
    votesForA() {
      const percentage = (this.question.votes.a / this.votes) * 100;

      return percentage ? Math.round(percentage) : 0;
    },
    votesForB() {
      const percentage = (this.question.votes.b / this.votes) * 100;

      return percentage ? Math.round(percentage) : 0;
    },
    votingHasEnded() {
      return this.$store.state.user.votingHasEnded;
    },
  },
}
</script>
