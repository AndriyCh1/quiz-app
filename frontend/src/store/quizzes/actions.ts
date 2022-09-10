import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizzesAction } from './common';
import { IQuiz } from '../../common/interfaces';
import { visitorQuizzesService } from '../../services';

export const getAll = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All,
  async (_, { rejectWithValue }) => {
    try {
      const quizzes = await visitorQuizzesService.getAll();
      console.log(quizzes, 'quizzes');
      return quizzes;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOneById = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      const quiz = await visitorQuizzesService.getOneById(id);
      console.log(quiz, 'quiz');
      return quiz;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
