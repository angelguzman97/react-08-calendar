import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice } from "./";

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },

});

// Obtiene el tipo de objeto que devuelve store.getState() en JS no lo necesita.
// Ej. function sumar = () => {return 5}; -> Devuelve un number.
// Quiere decir -> "Así es exactamente mi estado global de Redux."
export type RootState = ReturnType<typeof store.getState>; // Es como decirle a TS "Apréndete cómo está estructurado mi estado global."

// Obtiene el tipo de variable -> con dispatch se sabe las acciones que se aceptan,
// los payload que se reciben y el tipo que devuelve.
// Quiere decir -> "Así es exactamente la función dispatch de mi store."
export type AppDispatch = typeof store.dispatch; // Es como decirle a TS "Apréndete cómo funciona la función dispatch."

// RootState → Describe la estructura del estado global.
// AppDispatch → Describe cómo es la función dispatch y qué acciones puede ejecutar.