import { useAuthStore } from "../../hooks"
import { Offline, Online } from 'react-detect-offline'

export const Navbar = () => {
    const { user, startLogout } = useAuthStore();

    return (
        <div className="navbar navbat-dark bg-dark mb-4 px-4">
            <span className="navbar-brand text-light">
                <i className="fas fa-calendar-alt" />
                &nbsp;
                {user?.name}
            </span>
            <Online><span className="text-success">Online</span></Online>
            <Offline><span className="text-danger">Offline - Peticiones serán guardadas</span></Offline>
            <button className="btn btn-outline-danger"
                onClick={startLogout}>
                <i className="fas fa-sign-out-alt" />
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    )
}
