import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
// import type { CalendarEventProps } from "../../interfaces";

const events = {
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Angel'
    }
};

const initialState = {
    events: [events],
    activeEvent: null
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {}
});