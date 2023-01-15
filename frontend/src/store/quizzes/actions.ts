import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizzesAction } from './common';
import { ICheckAnswerRequest, IDeepQuiz, IQuiz } from '../../common/interfaces';
import { quizzesService } from '../../services';

export const getAll = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All,
  async (_, { rejectWithValue }) => {
    try {
      return await quizzesService.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOneById = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      return await quizzesService.getOneById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const create = createAsyncThunk<IQuiz, IDeepQuiz>(
  QuizzesAction.CREATE,
  async (quiz: IDeepQuiz, { rejectWithValue }) => {
    try {
      return await quizzesService.create(quiz);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteById = createAsyncThunk<IQuiz['id'], IQuiz['id']>(
  QuizzesAction.DELETE,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      await quizzesService.deleteById(id);
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const update = createAsyncThunk(
  QuizzesAction.UPDATE,
  async (data: any, { rejectWithValue }) => {
    try {
      await quizzesService.update(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const checkAnswer = createAsyncThunk(
  QuizzesAction.CHECK_ANSWER,
  async (data: ICheckAnswerRequest, { rejectWithValue }) => {
    try {
      return await quizzesService.checkAnswer(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
