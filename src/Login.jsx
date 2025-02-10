import { NavLink } from "react-router";
import "./Login.css";
function Login() {
  return (
    <>
      <div className="logo_check"> Login</div>
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

export default Login;
