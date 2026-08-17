import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import type { GetCalendarEvent } from "../../interfaces";
// import type { CalendarEventProps } from "../../interfaces";


const event: GetCalendarEvent[] = [
    {
        id: "",
        title: "aaa",
        notes: "ssss",
        start: new Date(),
        end: addHours(new Date(), 2),
        user: {
            _id: "111",
            name: "angel",
        }
    }
]

interface CalendarState {
    events: GetCalendarEvent[];
    activeEvent: GetCalendarEvent | null;
}

const initialState: CalendarState = {
    events: event,
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload; // evento actualizado
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent?.id);
            }
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;