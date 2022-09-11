import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizzesAction } from './common';
import { IQuiz } from '../../common/interfaces';
import { userQuizzesService, visitorQuizzesService } from '../../services';

export const getAllVisitor = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All_VISITOR,
  async (_, { rejectWithValue }) => {
    try {
      return await visitorQuizzesService.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOneByIdVisitor = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE_VISITOR,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      return await visitorQuizzesService.getOneById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getAllUser = createAsyncThunk<IQuiz[]>(
  QuizzesAction.GET_All_USER,
  async (_, { rejectWithValue }) => {
    try {
      return await userQuizzesService.getAll();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getOneByIdUser = createAsyncThunk<IQuiz, IQuiz['id']>(
  QuizzesAction.GET_ONE_USER,
  async (id: IQuiz['id'], { rejectWithValue }) => {
    try {
      return await userQuizzesService.getOneById(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
