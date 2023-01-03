import { IQuizzesState } from './common';
import { createSlice } from '@reduxjs/toolkit';
import { quizzesReducer } from './reducer';

const initialState: IQuizzesState = {
  chosenQuiz: null,
  quizzes: [],
  isLoadingQuizzes: false,
  isLoadingChosenQuiz: false,
};

const { reducer, actions } = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: quizzesReducer,
});

export { reducer, actions };
