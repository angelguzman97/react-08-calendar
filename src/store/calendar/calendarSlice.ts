import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";
import type { GetCalendarEvents } from "../../interfaces";
// import type { CalendarEventProps } from "../../interfaces";


// const event: GetCalendarEvents[] = [
//     {
//         id: "",
//         title: "aaa",
//         notes: "ssss",
//         start: new Date(),
//         end: addHours(new Date(), 2),
//         user: {
//             _id: "111",
//             name: "angel",
//         }
//     }
// ]

interface CalendarState {
    isLoadingEvents: boolean;
    events: GetCalendarEvents[];
    activeEvent: GetCalendarEvents | null;
}

const initialState: CalendarState = {
    isLoadingEvents: true,
    events: [],
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
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach((event: any) => {
                const exist = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exist) {
                    state.events.push(event);
                }
            });
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;