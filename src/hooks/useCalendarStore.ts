import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, type RootState } from "../store";
import type { CalendarEventPayload, CalendarEventResponse, GetCalendarEvents, GetCalendarEventsResponse } from "../interfaces";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useAppDispatch();

    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: GetCalendarEvents) => {
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

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get<GetCalendarEventsResponse>('/events');
            console.log(data);
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Error cargando evento');
            console.log(error);

        }
    }


    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
        startDeletingEvent,
    }
};
