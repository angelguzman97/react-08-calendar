import { useSelector } from "react-redux";
import { useAppDispatch } from "./";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, type RootState } from "../store";
import type { CalendarEvent } from "../interfaces";

export const useCalendarStore = () => {

    const dispatch = useAppDispatch();

    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = (calendarEvent: CalendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent: CalendarEvent) => {
        // TODO: llegar al back

        //todo bien
        if (calendarEvent._id) {
            // actualizando
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            // creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getDate() }));
        }
    }



    return {
        // Propiedades
        activeEvent,
        events,

        // Metodos
        setActiveEvent,
        startSavingEvent,

    }
};
