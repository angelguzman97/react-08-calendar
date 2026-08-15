import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch"
import type { RootState } from "../store";
import type { User } from "../interfaces/User.interface";
import { calendarApi } from "../api";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const startLogin = async ({ email, password }: User) => {
        console.log({ email, password });
        try {
            const res = await calendarApi.post('/auth', { email, password });
            console.log({ res });

        } catch (error) {
            console.log({ error });

        }

    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,


        //* Métodos
        startLogin,
    }
}