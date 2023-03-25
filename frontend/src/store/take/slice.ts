import { ITakeState } from './common';
import { createSlice } from '@reduxjs/toolkit';
import { takeReducer } from './reducer';

const initialState: ITakeState = {
  take: null,
  isLoadingTake: false,
  failedToLoadTake: false,
  isFinished: false,
  results: null,
  isLoadingResults: false,
  failedToLoadResults: false,
};

const { reducer, actions } = createSlice({
  name: 'take',
  initialState,
  reducers: {},
  extraReducers: takeReducer,
});

export { reducer, actions };
