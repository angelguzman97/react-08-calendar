import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../interfaces/User.interface";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface AuthState {
    status: AuthStatus;
    user: User | null;
    errorMessage: string;
}

const initialState: AuthState = {
    status: "checking",
    user: null,
    errorMessage: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = null;
            state.errorMessage = "";
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = "";
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = null;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = "";
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;