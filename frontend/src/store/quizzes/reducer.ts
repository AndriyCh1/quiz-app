import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { IQuizzesState } from './common';
import { quizzesActions } from './index';

export const quizzesReducer = (builder: ActionReducerMapBuilder<IQuizzesState>): void => {
  builder.addCase(quizzesActions.deleteById.fulfilled, (state: IQuizzesState, payload) => {
    state.quizzes = state.quizzes.filter((item) => item.id !== payload.payload);
  });
  builder.addMatcher(
    isAnyOf(quizzesActions.getAllPublic.pending, quizzesActions.getAllForUser.pending),
    (state: IQuizzesState, payload) => {
      state.quizzes = [];
      state.isLoadingQuizzes = true;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getAllPublic.fulfilled, quizzesActions.getAllForUser.fulfilled),
    (state: IQuizzesState, payload) => {
      state.quizzes = payload.payload;
      state.isLoadingQuizzes = false;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getOnePublicById.pending, quizzesActions.getOneForUserById.pending),
    (state: IQuizzesState, payload) => {
      state.chosenQuiz = null;
      state.isLoadingChosenQuiz = true;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getOnePublicById.fulfilled, quizzesActions.getOneForUserById.fulfilled),
    (state: IQuizzesState, payload) => {
      state.chosenQuiz = payload.payload;
      state.isLoadingChosenQuiz = false;
    },
  );
};
