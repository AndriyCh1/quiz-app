import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizzesAction } from './common';
import { IDeepQuiz, IQuiz } from '../../common/interfaces';
import { userQuizzesService, visitorQuizzesService } from '../../services';

export const getAllPublic = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All_PUBLIC,
  async (_, { rejectWithValue }) => {
    try {
      return await visitorQuizzesService.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOnePublicById = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE_PUBLIC,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      return await visitorQuizzesService.getOneById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getAllForUser = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All_FOR_USER,
  async (_, { rejectWithValue }) => {
    try {
      return await userQuizzesService.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOneForUserById = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE_FOR_USER,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      return await userQuizzesService.getOneById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const create = createAsyncThunk<IQuiz, IDeepQuiz>(
  QuizzesAction.CREATE,
  async (quiz: IDeepQuiz, { rejectWithValue }) => {
    try {
      return await userQuizzesService.create(quiz);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteById = createAsyncThunk<IQuiz['id'], IQuiz['id']>(
  QuizzesAction.DELETE,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      await userQuizzesService.deleteById(id);
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
      await userQuizzesService.update(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
