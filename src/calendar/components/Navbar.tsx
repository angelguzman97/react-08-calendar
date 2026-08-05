
export const Navbar = () => {
    return (
        <div className="navbar navbat-dark bg-dark mb-4 px-4">
            <span className="navbar-brand text-light">
                <i className="fas fa-calendar-alt" />
                &nbsp;
                Angel
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt" />
                <span>Salir</span>
            </button>

        </div>
    )
}
