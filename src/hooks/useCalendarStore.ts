import { useSelector } from "react-redux";
import { useAppDispatch } from "./";
import { onSetActiveEvent, type RootState } from "../store";
import type { CalendarEvent } from "../interfaces";

export const useCalendarStore = () => {

    const dispatch = useAppDispatch();

    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = (calendarEvent: CalendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };



    return {
        // Propiedades
        activeEvent,
        events,

        // Metodos
        setActiveEvent,

    }
};
