import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { IQuizzesState } from './common';
import { quizzesActions } from './index';

export const quizzesReducer = (builder: ActionReducerMapBuilder<IQuizzesState>): void => {
  builder.addCase(quizzesActions.deleteById.fulfilled, (state: IQuizzesState, payload) => {
    state.quizzes = state.quizzes.filter((item) => item.id !== payload.payload);
  });
  builder.addMatcher(
    isAnyOf(quizzesActions.getAllVisitor.pending, quizzesActions.getAllUser.pending),
    (state: IQuizzesState, payload) => {
      state.quizzes = [];
      state.isLoading = true;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getAllVisitor.fulfilled, quizzesActions.getAllUser.fulfilled),
    (state: IQuizzesState, payload) => {
      state.quizzes = payload.payload;
      state.isLoading = false;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getOneByIdVisitor.pending, quizzesActions.getOneByIdUser.pending),
    (state: IQuizzesState, payload) => {
      state.quiz = null;
      state.isLoadingQuiz = true;
    },
  );
  builder.addMatcher(
    isAnyOf(quizzesActions.getOneByIdVisitor.fulfilled, quizzesActions.getOneByIdUser.fulfilled),
    (state: IQuizzesState, payload) => {
      state.quiz = payload.payload;
      state.isLoadingQuiz = false;
    },
  );
};
