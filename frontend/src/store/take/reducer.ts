import { ITakeState } from './common';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { takeActions } from './index';

export const takeReducer = (builder: ActionReducerMapBuilder<ITakeState>) => {
  builder.addCase(takeActions.start.pending, (state) => {
    state.isFinished = false;
    state.isLoadingTake = true;
    state.take = null;
  });
  builder.addCase(takeActions.start.fulfilled, (state, payload) => {
    state.isFinished = false;
    state.isLoadingTake = false;
    state.take = payload.payload;
  });
  builder.addCase(takeActions.start.rejected, (state) => {
    state.isFinished = false;
    state.isLoadingTake = false;
    state.failedToLoadTake = true;
    state.take = null;
  });
  builder.addCase(takeActions.finish.pending, (state) => {
    state.isFinished = false;
    state.isLoadingResults = true;
  });
  builder.addCase(takeActions.finish.fulfilled, (state, payload) => {
    state.isFinished = true;
    state.isLoadingResults = false;
    state.results = payload.payload;
  });
  builder.addCase(takeActions.finish.rejected, (state) => {
    state.isFinished = false;
    state.isLoadingResults = false;
    state.failedToLoadResults = true;
  });
};
