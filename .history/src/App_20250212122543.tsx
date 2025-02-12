import { Routes } from "react-router";
import Navigation from "@components/Navigation/Navigation";
import { routes } from "@commons/constants.tsx";
import { renderRoutes } from "@utils/renderRoutes";

function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>{renderRoutes(routes)}</Routes>
    </>
  );
}

export default App;