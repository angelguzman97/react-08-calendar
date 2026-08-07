import { useSelector } from "react-redux";
import { useAppDispatch } from "./";
import type { RootState } from "../store";

export const useCalendarStore = () => {

    const dispatch = useAppDispatch();

    const { events } = useSelector((state: RootState) => state.calendar);

    return {
        // Propiedades
        events,

    }
};
