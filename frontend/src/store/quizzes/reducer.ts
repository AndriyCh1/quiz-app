import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IQuizzesState } from './common';
import { quizzesActions } from './index';

export const quizzesReducer = (builder: ActionReducerMapBuilder<IQuizzesState>): void => {
  builder.addCase(quizzesActions.deleteById.fulfilled, (state: IQuizzesState, payload) => {
    state.quizzes = state.quizzes.filter((item) => item.id !== payload.payload);
  });
  builder.addCase(quizzesActions.getAll.pending, (state: IQuizzesState, payload) => {
    state.quizzes = [];
    state.isLoadingQuizzes = true;
  });
  builder.addCase(quizzesActions.getAll.fulfilled, (state: IQuizzesState, payload) => {
    state.quizzes = payload.payload;
    state.isLoadingQuizzes = false;
  });
  builder.addCase(quizzesActions.getOneById.pending, (state: IQuizzesState, payload) => {
    state.chosenQuiz = null;
    state.isLoadingChosenQuiz = true;
  });
  builder.addCase(quizzesActions.getOneById.fulfilled, (state: IQuizzesState, payload) => {
    state.chosenQuiz = payload.payload;
    state.isLoadingChosenQuiz = false;
  });
};
