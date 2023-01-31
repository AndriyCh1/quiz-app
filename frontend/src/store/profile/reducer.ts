import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IProfileState } from './common';
import { profileActions } from './index';

export const profileReducer = (builder: ActionReducerMapBuilder<IProfileState>): void => {
  builder.addCase(profileActions.getUserGeneralData.pending, (state: IProfileState) => {
    state.isLoadingUserGeneralData = true;
  });
  builder.addCase(profileActions.getUserGeneralData.rejected, (state: IProfileState) => {
    state.isLoadingUserGeneralData = false;
    state.failedToLoadUserGeneralData = true;
  });
  builder.addCase(profileActions.getUserGeneralData.fulfilled, (state: IProfileState, payload) => {
    state.userGeneralData = payload.payload;
    state.isLoadingUserGeneralData = false;
    state.failedToLoadUserGeneralData = false;
  });
  builder.addCase(profileActions.getUserQuizzesSummary.pending, (state: IProfileState) => {
    state.isLoadingQuizzesSummaryData = true;
  });
  builder.addCase(profileActions.getUserQuizzesSummary.rejected, (state: IProfileState) => {
    state.isLoadingQuizzesSummaryData = false;
    state.failedToLoadQuizzesSummaryData = true;
  });
  builder.addCase(
    profileActions.getUserQuizzesSummary.fulfilled,
    (state: IProfileState, payload) => {
      state.userQuizzesSummaryData = payload.payload;
      state.isLoadingQuizzesSummaryData = false;
      state.failedToLoadQuizzesSummaryData = false;
    },
  );
};
