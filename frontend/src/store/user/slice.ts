import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "./common";
import {userReducer} from "./reducer";

const initialState: IUserState = {
    users: [],
}

const { reducer, actions } = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: userReducer,
});

export { reducer, actions };