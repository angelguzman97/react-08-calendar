import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch"
import { clearErrorMessage, onChecking, onLogin, onLogout, type RootState } from "../store";
import type { User } from "../interfaces/User.interface";
import { calendarApi } from "../api";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const startLogin = async ({ email, password }: User) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.id }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async ({ name, email, password }: User) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.id }));

        } catch (error: any) {
            dispatch(onLogout(error.response.data.msg || ""));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(null));
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.id }));

        } catch (error: any) {
            localStorage.clear();
            dispatch(onLogout(null));
        }
    };

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onLogout(null));
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,


        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}