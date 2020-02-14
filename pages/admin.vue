<template>
  <section class="flex flex-column">
    <Logo/>
    <header class="flex-item" style="height: 20vh; margin-top: 30vh;"></header>
    <main class="flex-item" style="height: 50vh;">
      <div class="column">
        <next-button :text="text" v-if="!done"/>
        <h1 class="title has-text-centered has-text-shadow" v-else>We did it 🎉</h1>
        <reset-button v-if="done"/>
      </div>
    </main>
  </section>
</template>

<script>
import _ from 'lodash'
import { getItemById } from '~/plugins/game'

import Logo from '~/components/Logo'
import NextButton from '~/components/screens/admin/NextButton'
import ResetButton from '~/components/screens/admin/ResetButton'

export default {
  middleware: 'admin',
  components: {
    Logo,
    NextButton,
    ResetButton,
  },
  created() {
    // Dispatch hydrate() to update near real time
    this.$store.dispatch("hydrate");
  },
  computed: {
    done() {
      return this.$store.state.game.activeStepId === 4
    },
    text() {
      switch (this.$store.state.game.activeStepId) {
        case 1:
          return 'Start Game 🚀'
          break;
        case 2:
          return 'Show Results 👉'
          break;
        case 3:
          return this.lastQuestion ? 'End Game 🎉' : 'Next Question 👉'
          break
        default:
          return 'Next Step 👉'
          break;
      }
    },
    lastQuestion() {
      const { activeQuestionId , questions } = this.$store.state.game;
      const activeQuestion = getItemById(activeQuestionId, questions);
      const lastQuestion = _.last(questions);

      return (lastQuestion.id === activeQuestion.id)
    },
  }
};
</script>
