import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, type RootState } from "../store";
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
    };

    const startDeletingEvent = async () => {
        // todo: llegar al back

        //
        dispatch(onDeleteEvent());
    }



    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
};
