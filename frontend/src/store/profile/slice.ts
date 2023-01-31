import { createSlice } from '@reduxjs/toolkit';
import { IProfileState } from './common';
import { profileReducer } from './reducer';

const initialState: IProfileState = {
  userGeneralData: null,
  isLoadingUserGeneralData: false,
  failedToLoadUserGeneralData: false,
  userQuizzesSummaryData: [],
  isLoadingQuizzesSummaryData: false,
  failedToLoadQuizzesSummaryData: false,
};

const { reducer, actions } = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: profileReducer,
});

export { reducer, actions };
