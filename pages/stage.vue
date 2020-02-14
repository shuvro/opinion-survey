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
import Question from '~/components/screens/stage/Question'
import QuestionResults from '~/components/screens/stage/QuestionResults'
import GameResults from '~/components/screens/stage/GameResults'

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

      let step = getItemById(activeStepId, steps)

      return step
    },
    question() {
      const { activeQuestionId, questions } = this.$store.state.game

      let question = getItemById(activeQuestionId, questions)

      return question
    },
    showAdminSection() {
      return (this.$route.hash === '#noafyenlmcjhtpdwdkewujadphplpnmvecqmceabgexlqnblvyfdyyihpnwg')
    },
    showSplashScreen() {
      const { activeStepId } = this.$store.state.game

      return activeStepId === 1
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
