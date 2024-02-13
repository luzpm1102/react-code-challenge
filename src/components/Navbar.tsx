import { Link, NavLink } from "react-router-dom";
import { menuOptions } from "../data/menu";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Bootstrap"
            width="100"
          />
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
            {menuOptions.map((option, index) => (
              <li key={index} className="nav-item">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending nav-link" : isActive ? "active nav-link" : "nav-link"
                  }
                  aria-current="page"
                  to={option.path}
                >
                  {option.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
