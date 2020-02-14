<template>
 <div>
    <div class="for-header-clearance" style="min-height: 128px;"></div>
    <section class="animated slideInRight">
      <h1 class="title is-5 has-text-centered has-text-shadow">Question {{ question.id }} Results</h1>
    </section>
    <div class="section animated slideInLeft">
      <main class="columns is-mobile is-multiline is-centered">
        <div
          class="column is-8-desktop is-10-tablet is-12 has-box-shadow"
          style="background-color: rgba(0, 0, 0, .5); margin: 20px 0; padding: 50px;"
        >
          <h2 class="title is-5 has-text-white">{{ question.text }}</h2>
          <div class="results">
            <div class="result" style="margin-top: 40px;">
              <h3 class="title is-6 text--normal">{{ question.answers.a }}</h3>
              <h4
                class="subtitle is-5 has-text-white has-text-shadow bg-yellow"
                style="background: rgba(226, 202, 64, .25)"
                :style="stylesForAnswerA(question.votes, question.votes.a)"
              >
                <span style="display: inline-block; padding: 5px 10px;">
                  {{ format(question.votes, question.votes.a) }}&percnt;
                </span>
              </h4>
            </div>
            <div class="result" style="margin-top: 40px;">
              <h3 class="title is-6 text--normal">{{ question.answers.b }}</h3>
              <h4
                class="subtitle is-5 has-text-white has-text-shadow bg-orange"
                style="background: rgba(241, 98, 96, .25);"
                :style="stylesForAnswerB(question.votes, question.votes.b)"
              >
                <span style="display: inline-block; padding: 5px 10px;">
                  {{ format(question.votes, question.votes.b) }}&percnt;
                </span>
              </h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

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
