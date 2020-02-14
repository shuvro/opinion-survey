<template>
  <div>
    <div class="for-header-clearance" style="min-height: 160px;"></div>
    <section>
      <h1 class="title is-4 has-text-shadow has-text-centered animated slideInDown">
        Thank you for&nbsp;playing&nbsp;🎉
      </h1>
      <h2 class="subtitle is-6 has-text-shadow has-text-centered animated slideInUp">Final game results are&nbsp;below&nbsp;👇</h2>
    </section>
    <div class="section">
      <main class="columns is-mobile is-multiline is-centered">
        <div
          class="column is-8-desktop is-10-tablet is-12 has-box-shadow animated slideInLeft"
          style="background-color: rgba(0, 0, 0, .5); margin: 20px 0; padding: 25px;"
          v-for="question in questions" :key="question.id"
        >
          <h2 class="title is-6 has-text-shadow">({{ question.id }}) {{ question.text }}</h2>
          <div class="results">
            <div class="result" style="margin-top: 10px;">
              <h3 class="title is-7 text--normal">{{ question.answers.a }}</h3>
              <h4
                class="subtitle is-6 bg-yellow"
                style="background: rgba(226, 202, 64, .25)"
                :style="stylesForAnswerA(question.votes, question.votes.a)"
              >
                <span>
                  &nbsp;
                  {{ format(question.votes, question.votes.a) }}&percnt;
                </span>
              </h4>
            </div>
            <div class="result" style="margin-top: 20px;">
              <h3 class="title is-7 text--normal">{{ question.answers.b }}</h3>
              <h4
                class="subtitle is-6 bg-orange"
                style="background: rgba(241, 98, 96, .25);"
                :style="stylesForAnswerB(question.votes, question.votes.b)"
              >
                <span>
                  &nbsp;
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
import { getItemById } from "~/plugins/game";

export default {
  computed: {
    votes(activeQuestionId) {
      return getItemById(activeQuestionId, this.$store.state.game.votes);
    },
    questions() {
      return this.$store.state.game.questions
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
};
</script>
