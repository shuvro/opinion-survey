<template>
  <section>
    <header class="flex flex-center flex-end">
      <div class="flex-item has-text-centered headline">
        <h1 class="h1 narrow has-text-shadow animated slideInDown m-auto">{{ question.text }}</h1>
        <h2 class="has-text-shadow animated slideInUp">Tap tile to vote👇</h2>
      </div>
    </header>
    <main class="flex-item flex">
      <!-- Left answer tile -->
      <a
        class="flex-item flex flex-column flex-around bg-yellow has-text-white has-text-shadow animated slideInLeft"
        style="min-height: 50vh;"
        v-bind:style="stylesForAnswerA"
        @click.prevent="selectQuestionAnswer('a')"
      >
        <h2
          class="h2 has-text-centered px-10"
        >{{ question.answers.a }}</h2>
        <h2
          class="h1 has-text-centered"
          style="margin-bottom: -2px;"
          v-if="userHasVoted"
        >
          <span>{{ votesForA }}&percnt;</span>
        </h2>
        <div
          v-if="userHasVotedForA"
          class="checkmark animated rotatedInDownRight"
          style="display: block; position: absolute; right: 16px; bottom: 16px;"
        >
          <img src="~assets/images/icon-checkmark.svg" style="width: 32px; height: auto;">
        </div>
      </a>

      <!-- Right answer tile -->
      <!-- background colors could be RGBA and use alpha transparency -->
      <!-- when we go from asking question to showing results in real-time -->
      <a
        class="flex-item flex flex-column flex-around bg-orange has-text-white has-text-shadow animated slideInRight"
        style="min-height: 50vh;"
        v-bind:style="stylesForAnswerB"
        @click.prevent="selectQuestionAnswer('b')"
      >
        <h2
          class="h2 has-text-white has-text-centered text--answer px-10"
        >{{ question.answers.b }}</h2>
        <h2
          class="h1 has-text-white has-text-centered text--answer"
          v-if="userHasVoted"
          style="margin-bottom: -2px;"
        >
          <span>{{ votesForB }}&percnt;</span>
        </h2>
        <div
          v-if="userHasVotedForB"
          class="checkmark animated rotatedInDownRight"
          style="display: block; position: absolute; right: 16px; bottom: 16px;"
        >
          <img src="~assets/images/icon-checkmark.svg" style="width: 32px; height: auto;">
        </div>
      </a>
    </main>
  </section>
</template>

<style scoped>
a.has-text-white:hover {
  color: #fff !important;
}
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
import { getItemById } from "~/plugins/game";

export default {
  computed: {
    stylesForAnswerA() {
      if (this.userHasVoted) {
        return {
          background: `linear-gradient(to top, rgba(226, 202, 64, 1) ${
            this.votesForA
          }%, rgba(226, 202, 64, .25) ${this.votesForA}%)`
        };
      }
    },
    stylesForAnswerB() {
      if (this.userHasVoted) {
        return {
          background: `linear-gradient(to top, rgba(241, 98, 96, 1) ${
            this.votesForB
          }%, rgba(241, 98, 96, .25) ${this.votesForB}%)`
        };
      }
    },
    question() {
      const { activeQuestionId, questions } = this.$store.state.game;

      return getItemById(activeQuestionId, questions);
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
    userHasVoted() {
      const id = this.$store.state.game.activeQuestionId;
      const votes = this.$store.state.user.votes;

      return getItemById(id, votes) ? true : false;
    },
    userHasVotedForA() {
      const id = this.$store.state.game.activeQuestionId;
      const votes = this.$store.state.user.votes;

      const vote = getItemById(id, votes);

      return vote && vote.side == "a";
    },
    userHasVotedForB() {
      const id = this.$store.state.game.activeQuestionId;
      const votes = this.$store.state.user.votes;

      const vote = getItemById(id, votes);

      return vote && vote.side == "b";
    }
  },
  methods: {
    selectQuestionAnswer(answer) {
      if (!this.userHasVoted) {
        this.$store.commit("incrementVotes", answer);
        this.$store.commit("userHasVoted", { voted: true, side: answer });
      }
    }
  }
};
</script>
