import { UserAction } from './common';
import { IUser } from '../../common/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';

export const getAllUsers = createAsyncThunk<IUser[]>(
  UserAction.GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers();
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
