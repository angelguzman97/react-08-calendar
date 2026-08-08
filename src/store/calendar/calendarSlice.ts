import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import type { CalendarEvent } from "../../interfaces";
// import type { CalendarEventProps } from "../../interfaces";

const events: CalendarEvent[] = [
    {
        _id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        note: 'Hay que comprar pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Angel'
        }
    },
];

interface CalendarState {
    events: CalendarEvent[];
    activeEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
    events: events,
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
                if (event._id === payload._id) {
                    return payload; // evento actualizado
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;