<template>
  <div>
    <Logo/>
    <Splash v-if="showSplashScreen"/>
    <Question v-if="showQuestionScreen"/>
    <QuestionResults v-if="showQuestionResultsScreen"/>
    <GameResults v-if="showGameResultsScreen"/>
  </div>
</template>

<script>
import { getItemById } from '~/plugins/game'

import Logo from '~/components/Logo'
import Splash from '~/components/screens/Splash'
import Question from '~/components/screens/Question'
import QuestionResults from '~/components/screens/QuestionResults'
import GameResults from '~/components/screens/GameResults'

export default {
  components: {
    Logo,
    Splash,
    Question,
    QuestionResults,
    GameResults
  },
  created() {
    // Dispatch hydrate() to update near real time
    this.$store.dispatch('hydrate')
  },
  computed: {
    step() {
      const { activeStepId, steps } = this.$store.state.game

      return getItemById(activeStepId, steps)
    },
    question() {
      const { activeQuestionId, questions } = this.$store.state.game

      return getItemById(activeQuestionId, questions)
    },
    showSplashScreen() {
      return 1 === this.$store.state.game.activeStepId
    },
    showQuestionScreen() {
      return (this.question && this.step && this.step.type === 'STEP_ASK_QUESTION')
    },
    showQuestionResultsScreen() {
      return (this.step && this.step.type === 'STEP_SHOW_RESULT')
    },
    showGameResultsScreen() {
      return (this.step && this.step.type === 'STEP_SHOW_END_SCREEN')
    }
  }
};
</script>
