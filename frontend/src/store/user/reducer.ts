import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import { IUserState } from "./common";
import {userActions} from "./index";

export const userReducer = (builder: ActionReducerMapBuilder<IUserState>): void => {
    builder.addCase(userActions.getAllUsers.fulfilled, (state: IUserState, payload) => {
        state.users = payload.payload;
    });
}
