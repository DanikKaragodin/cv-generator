import { NavLink } from "react-router";
import "./Settings.css";
function Settings() {
  return (
    <>
      <div className="logo_check"> Settings</div>
      <NavLink className="nav-link" to="/">
        <button> Press Here to link to main page</button>
      </NavLink>
      <NavLink className="nav-link" to="/create-cv">
        <button> Press Here to link to generator page</button>
      </NavLink>
      <NavLink className="nav-link" to="/login">
        <button> Press Here to link to login page</button>
      </NavLink>
      <NavLink className="nav-link" to="/user-settings">
        <button> Press Here to link to settings page</button>
      </NavLink>
    </>
  );
}

export default Settings;
