import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IQuizzesState } from './common';
import { quizzesActions } from './index';

export const quizzesReducer = (builder: ActionReducerMapBuilder<IQuizzesState>): void => {
  builder.addCase(quizzesActions.getAll.pending, (state: IQuizzesState, payload) => {
    state.quizzes = [];
    state.isLoading = true;
  });
  builder.addCase(quizzesActions.getAll.fulfilled, (state: IQuizzesState, payload) => {
    state.quizzes = payload.payload;
    state.isLoading = false;
  });
  builder.addCase(quizzesActions.getOneById.fulfilled, (state: IQuizzesState, payload) => {
    state.quiz = payload.payload;
  });
};
