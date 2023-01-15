import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISendAnswerRequest } from '../../common/interfaces';
import { TakeAction } from './common';
import { takeService } from '../../services';
import { IFinishRequest } from '../../common/interfaces/take';

export const start = createAsyncThunk(
  TakeAction.START,
  async (quizId: string, { rejectWithValue }) => {
    try {
      return await takeService.start(quizId);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const sendAnswer = createAsyncThunk(
  TakeAction.SEND_ANSWER,
  async (data: ISendAnswerRequest, { rejectWithValue }) => {
    try {
      await takeService.sendAnswer(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const finish = createAsyncThunk(
  TakeAction.FINISH,
  async (data: IFinishRequest, { rejectWithValue }) => {
    try {
      return await takeService.finish(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
