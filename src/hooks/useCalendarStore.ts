import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, type RootState } from "../store";
import type { CalendarEventPayload, CalendarEventResponse, GetCalendarEvents, GetCalendarEventsResponse } from "../interfaces";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

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
        try {
            if (calendarEventPayload.id) {
                // actualizando
                await calendarApi.put(`/events/${calendarEventPayload.id}`, calendarEventPayload);
                dispatch(onUpdateEvent({ ...calendarEventPayload, user }));
                return;
            }
            // creando
            const { data } = await calendarApi.post<CalendarEventResponse>('/events', calendarEventPayload);

            dispatch(onAddNewEvent({ ...calendarEventPayload, id: data.evento.id, user }));
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }


    };

    const startDeletingEvent = async () => {
        // todo: llegar al back
        try {
            await calendarApi.delete(`/events/${activeEvent?.id}`);
            //
            dispatch(onDeleteEvent());
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
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
