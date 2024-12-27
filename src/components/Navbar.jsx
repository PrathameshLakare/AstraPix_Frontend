import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const Navbar = () => {
  const logoutHandler = () => {
    Cookies.remove("access_token");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/home">
            KaviosPix
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/albums"
              >
                Albums
              </Link>
              <Link className="nav-link text-light" to="/albums/shared">
                Shared Albums
              </Link>
              <Link
                className="nav-link text-danger fw-semibold"
                to="/"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
