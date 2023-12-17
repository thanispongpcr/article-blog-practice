import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../services/authorize";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
const NavbarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <ArticleRoundedIcon style={{ fontSize: "2em" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link pt-2 pb-2 ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Articles
                </Link>
              </li>

              {getUser() && (
                <li className="nav-item">
                  <Link
                    to="/create"
                    className={`nav-link ${
                      location.pathname === "/create" ? "active" : ""
                    }`}
                  >
                    Create an Article
                  </Link>
                </li>
              )}
            </ul>

            <ul class="navbar-nav ms-auto">
              {!getUser() && (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Log in
                  </Link>
                </li>
              )}
              {getUser() && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => logout(() => navigate("/login"))}
                  >
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavbarComponent;
