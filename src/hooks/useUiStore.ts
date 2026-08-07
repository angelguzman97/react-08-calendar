import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";
import type { AppDispatch, RootState } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    // Para tomar propiedades del store, se usa el useSelector
    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    return {
        // Propiedades
        isDateModalOpen,

        //Metodos
        openDateModal,
        closeDateModal,
    }
}