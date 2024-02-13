import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="version">
        <h2>
          <NavLink to="/V1">
            V1
          </NavLink>
        </h2>
        <h2><NavLink to="/V2">
            V2
          </NavLink></h2>
          <h2><NavLink to="/V3">
            V3
          </NavLink></h2>
      </div>
      <NavLink to="/addPlace" className="addPlace">
        Ajouter un emplacement
      </NavLink>
    </div>
  );
}

export default Header;
