import { createSlice } from "@reduxjs/toolkit";
interface UiState {
    isDateModalOpen: boolean
}

const initialState: UiState = {
    isDateModalOpen: false
}


export const uiSlice = createSlice({
    name: 'ui',
    initialState, // Inicializaciones
    reducers: { // Acciones/metodos
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onClosenDateModal: (state) => {
            state.isDateModalOpen = false;
        },
    }
});

export const { onOpenDateModal, onClosenDateModal } = uiSlice.actions;