// import { useState } from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NavLink } from "react-router";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
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
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
