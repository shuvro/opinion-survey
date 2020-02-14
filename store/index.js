import _ from 'lodash'

import { db } from '~/plugins/firebase.js'

import {
  getItemById,
  getItemByProp,
  getItemIndexById
 } from '~/plugins/game'

export const state = () => ({
  user: {
    votes: []
  },
  game: {
    activeStepId: 0,
    activeQuestionId: 0,
    steps: [],
    questions: [],
  }
})

export const mutations = {
  setGame(state, game) {
    state.game = game
  },

  resetGame(state) {
    const delta = {
      activeStepId: 1,
      activeQuestionId: 1,
      questions: state.game.questions.map(q => {
        q.votes = {a: 0, b: 0}

        return q
      })
    };

    db.collection('game')
      .doc('conf')
      .set(delta, { merge: true })
      .then(() => console.log('Reset Step:', delta))
      .catch(error => console.error(error))
  },
  incrementVotes(state, side) {
    if (side !== 'a' && side !== 'b') {
      return console.error(new Error('Not a valid side to increment votes'))
    }

    const questions = state.game.questions.map(question => {
      if (question.id === state.game.activeQuestionId) {
        question.votes[side] = question.votes[side] + 1
      }

      return question
    })

    db.collection('game')
      .doc('conf')
      .set({ questions }, { merge: true })
      .then(() => console.log('Updated votes for active question'))
      .catch(error => console.error(error))
  },
  userHasVoted(state, { voted, side }) {
    const vote = {
      id: state.game.activeQuestionId,
      side: side
    };

    const item = getItemById(state.game.activeQuestionId, state.user.votes)

    if (!item) {
      state.user.votes.push(vote);
    }
  },
  resetUserVotes(state) {
    state.user.votes = []
  },
  moveToNextTask(state) {
    // Grab game data from Firestore,
    // which was previously fetched to hydrate the store.
    const { activeStepId, activeQuestionId, steps, questions } = state.game

    // Each steps and question has an "id" property,
    // grab a step and question where their "id" matches the game active state.
    const activeStep = getItemById(activeStepId, steps)
    const activeQuestion = getItemById(activeQuestionId, questions)

    // Set the nextStep and nextQuestion to current ones by default
    let nextStep = activeStep
    let nextQuestion = activeQuestion

    // Determine how the game needs to be updated,
    // based on the active step type.
    switch (activeStep.type) {
      case 'STEP_SHOW_SPLASH_SCREEN': {
        // Get a step to be set as the next step,
        // by fetching it based on the step type.
        nextStep = getItemByProp('type', 'STEP_ASK_QUESTION', steps)

        // If the game is starting,
        // we can assume the the first question is the one with "id" of 1
        nextQuestion = getItemById(1, questions)

        // The next question should be available,
        // but if anyone deleted the questions (fatal) it won't be.
        if (nextQuestion) {
          nextQuestion.votes = {a: 0, b: 0}
        }

        break
      }
      case 'STEP_ASK_QUESTION': {
        // If we are about to show the results screen for a given question,
        // we don't need to increment the question, just the step.
        nextStep = getItemByProp('type', 'STEP_SHOW_RESULT', steps)

        break
      }
      case 'STEP_SHOW_RESULT': {
        // Since we're showing results for a previous question,
        // we need to make sure that we only loop back to "ask another question",
        // if we have more questions to ask
        const lastQuestion = _.last(questions)

        if (lastQuestion.id === activeQuestion.id) {
          // We've already asked the last question,
          // let's show the "end screen"
          nextStep = getItemByProp('type', 'STEP_SHOW_END_SCREEN', steps)
        } else {
          // We have more questions to ask
          nextStep = getItemByProp('type', 'STEP_ASK_QUESTION', steps)
          nextQuestion = getItemById(activeQuestion.id + 1, questions)

        // The next question should be available,
        // but if the question id + 1 does not match the place in the questions array (fatal),
        // we won't be able to match it
          if (nextQuestion) {
            nextQuestion.votes = {a: 0, b: 0}
          }
        }

        break
      }
    }

    // Let's figure out the next question index in the questions array,
    // so that we can replace it if it already exists.
    let nextQuestionIndex = getItemIndexById(nextQuestion.id, questions)

    if (nextQuestionIndex === -1) {
      // We should never be here,
      // because it would mean that someone (or something)
      // is deleting questions.
      questions.push(nextQuestion);
    } else {
      // We want to be here
      questions[nextQuestionIndex] = nextQuestion
    }

    // Update the game state and replace questions with an updated collection
    const delta = {
      activeStepId: nextStep.id,
      activeQuestionId: nextQuestion.id,
      questions
    }

    db.collection('game')
      .doc('conf')
        .set(delta, { merge: true })
        .then(() => console.log('Moved to next step:', delta))
        .catch(error => console.error(error))
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    // Dispatch here to fetch server side once
    return dispatch('hydrate')
  },
  async hydrate({ dispatch }) {
    return new Promise((resolve) => {
      db.collection('game').doc('conf')
        .onSnapshot({ includeMetadataChanges: true }, async game => {
          if (!game.metadata.hasPendingWrites) {
            return resolve(await dispatch('update', game.data()))
          } else {
            return resolve()
          }
        })
    })
  },
  async next({ commit }) {
    await commit('moveToNextTask')
  },
  async reset({ commit }) {
    await commit('resetGame')
    await commit('resetUserVotes')
  },
  async update({ commit, state }, game) {
    await commit('setGame', game)

    const vote = getItemById(state.game.activeQuestionId, state.user.votes)

    if (state.game.activeStepId === 2 && !vote) {
      commit('resetUserVotes')
    }
  },
}
