import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
    const authStatus = 'checking';

    return (
        <Routes>
            {
                (authStatus === 'checking')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
            <Route path="/*" element={<Navigate to={'/auth/login'} />} />

        </Routes>
    )
}
