import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileAction } from './common';
import { IQuizzesSummary, IUserGeneralData } from '../../common/interfaces';
import { takeService, userService } from '../../services';

export const getUserGeneralData = createAsyncThunk<IUserGeneralData, void>(
  ProfileAction.GET_USER_DATA,
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUserGeneralData();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getUserQuizzesSummary = createAsyncThunk<IQuizzesSummary[], void>(
  ProfileAction.GET_USER_QUIZZES_SUMMARY,
  async (_, { rejectWithValue }) => {
    try {
      return await takeService.getUserQuizzesSummary();
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
