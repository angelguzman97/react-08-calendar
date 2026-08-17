import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, type RootState } from "../store";
import type { CalendarEventPayload, CalendarEventResponse, GetCalendarEvent } from "../interfaces";
import { calendarApi } from "../api";

export const useCalendarStore = () => {

    const dispatch = useAppDispatch();

    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: GetCalendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEventPayload: CalendarEventPayload) => {

        // TODO: llegar al back. Update Event
        //todo bien
        if (calendarEventPayload.id) {
            // actualizando
            dispatch(onUpdateEvent({ ...calendarEventPayload }));
        } else {
            // creando
            const { data } = await calendarApi.post<CalendarEventResponse>('/events', calendarEventPayload);

            dispatch(onAddNewEvent({ ...calendarEventPayload, id: data.evento.id, user }));
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
