import {createSlice} from "@reduxjs/toolkit";
import {IAuthState} from "./common";
import {authReducer} from "./reducer";

const initialState: IAuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
}

const { reducer, actions } = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: authReducer,
});

export { reducer, actions };