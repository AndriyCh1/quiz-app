import { AnyAction, combineReducers, Reducer } from 'redux';

import { authReducer } from './auth';
import { quizzesReducer } from './quizzes';

import { AuthAction } from './auth/common';
import { takeReducer } from './take';

export const combinedReducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
  take: takeReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // TODO: find another way to clean store when user is logging out
  if (action.type === `${AuthAction.LOGOUT}/fulfilled`) {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};
