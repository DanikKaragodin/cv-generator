import { Routes } from "react-router";
import Navigation from "@common/components/Navigation/Navigation";
import { routes } from "@common/constants.tsx";
import { renderRoutes } from "@common/utils/renderRoutes";

function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>{renderRoutes(routes)}</Routes>
    </>
  );
}

export default App;
