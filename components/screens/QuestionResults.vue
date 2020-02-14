<template>
 <section>
    <header class="flex flex-center flex-end animated slideInRight">
      <div class="flex-item headline has-text-centered">
        <h1 class="h1 narrow m-auto has-text-shadow">
          Question&nbsp;{{ question.id }} Results
        </h1>
      </div>
    </header>
    <main class="flex animated slideInLeft">
      <div class="flex-item results">
        <h2 class="h2 has-text-white mb-20">{{ question.text }}</h2>
        <div class="result">
          <h3 class="h3 narrow">{{ question.answers.a }}</h3>
          <h4
            class="subtitle has-text-white has-text-shadow bg-yellow"
            style="background: rgba(226, 202, 64, .25); margin-top: 5px;"
            :style="stylesForAnswerA(question.votes, question.votes.a)"
          >
            <span>
              &nbsp;
              {{ format(question.votes, question.votes.a) }}&percnt;
            </span>
          </h4>
        </div>
        <div class="result">
          <h3 class="h3 narrow">{{ question.answers.b }}</h3>
          <h4
            class="subtitle has-text-white has-text-shadow bg-orange"
            style="background: rgba(241, 98, 96, .25); margin-top: 5px;"
            :style="stylesForAnswerB(question.votes, question.votes.b)"
          >
            <span>
              &nbsp;
              {{ format(question.votes, question.votes.b) }}&percnt;
            </span>
          </h4>
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>
section {
  min-height: 100vh;
}
header {
  min-height: 40vh;
}
main {
  width: 100vw;
  min-height: 50vh;
}
.results {
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, .5);
}
.result {
  padding-top: 10px;
}
.headline {
  padding: 40px;
}
.h1 {
  font-size: 1.4rem;
  line-height: 1;
}
.h2 {
  font-size: 1.2rem;
  line-height: 1;
}
.h3 {
  font-size: 1rem;
  line-height: 1.2;
}
.narrow {
  max-width: 460px;
}
.m-auto {
  margin: 0 auto;
}
</style>

<script>
import { getItemById } from '~/plugins/game'

export default {
  computed: {
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
  },
  methods: {
    format(votes, sideVotes) {
      const totalVotes = votes.a + votes.b
      const actualVotes = (sideVotes / totalVotes) * 100

      return actualVotes ? Math.round(actualVotes) : 0
    },
    stylesForAnswerA(votes, sideVotes) {
      const percentage = this.format(votes, sideVotes)

      return {
        background: `linear-gradient(to right, rgba(226, 202, 64, 1) ${percentage}%, rgba(226, 202, 64, .25) ${percentage}%)`
      }
    },
    stylesForAnswerB(votes, sideVotes) {
      const percentage = this.format(votes, sideVotes)

      return {
        background: `linear-gradient(to right, rgba(241, 98, 96, 1) ${percentage}%, rgba(241, 98, 96, .25) ${percentage}%)`
      }
    },
  }
}
</script>
