import {ILoginUser, ILoginResponse, IAuthResponse} from "../../common/interfaces";
import { AuthAction } from "./common";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService, storageService} from "../../services";
import {ILogoutResponse, ISignupUser} from "../../common/interfaces/user";

export const login = createAsyncThunk<ILoginResponse, ILoginUser>(
    AuthAction.LOGIN,
    async (userData: ILoginUser, {rejectWithValue}) => {
        try {
            const response = await authService.login(userData);
            storageService.setItem('token', response.accessToken);
            return response;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const signup = createAsyncThunk<IAuthResponse, ISignupUser>(
    AuthAction.SIGNUP,
    async(userData: ISignupUser, {rejectWithValue}) => {
        try {
            const response = await authService.signup(userData);
            storageService.setItem('token', response.accessToken);
            return response;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk<ILogoutResponse>(
    AuthAction.LOGOUT,
    async (_, {rejectWithValue}) => {
        try {
            const response = await authService.logout();
            storageService.removeItem('token');
            return response;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const checkAuth = createAsyncThunk<IAuthResponse>(
    AuthAction.CHECK_AUTH,
    async (_, {rejectWithValue}) => {
    try {
        const response = await authService.refresh();
        storageService.setItem("token", response.accessToken);
        return response;
    } catch (e) {
        return rejectWithValue(e);
    }
})