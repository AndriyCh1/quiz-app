import { AnyAction, combineReducers, Reducer } from 'redux';
import { AuthAction } from './auth/common';

import { authReducer } from './auth';
import { quizzesReducer } from './quizzes';
import { takeReducer } from './take';
import { profileReducer } from './profile';

export const combinedReducer = combineReducers({
  auth: authReducer,
  quizzes: quizzesReducer,
  take: takeReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // TODO: find another way to clean store when user is logging out
  if (action.type === `${AuthAction.LOGOUT}/fulfilled`) {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};
