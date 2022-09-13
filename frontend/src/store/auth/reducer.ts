import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { IAuthState } from './common';
import { authActions } from './index';

export const authReducer = (builder: ActionReducerMapBuilder<IAuthState>): void => {
  builder.addCase(authActions.logout.fulfilled, (state: IAuthState) => {
    state.user = null;
    state.isAuth = false;
    state.isLoading = false;
  });
  builder.addCase(authActions.checkAuth.rejected, (state: IAuthState, payload) => {
    state.isLoading = false;
  });
  builder.addCase(authActions.checkAuth.pending, (state: IAuthState, payload) => {
    state.isLoading = true;
  });
  builder.addCase(authActions.checkAuth.fulfilled, (state: IAuthState, payload) => {
    state.user = payload.payload.user;
    state.isAuth = true;
    state.isLoading = false;
  });
  builder.addMatcher(
    isAnyOf(authActions.login.fulfilled, authActions.signup.fulfilled),
    (state: IAuthState, payload) => {
      state.user = payload.payload.user;
      state.isAuth = true;
    },
  );
};
