import React, { ReactElement } from "react";
import { Route } from "react-router";
import { IRoute } from "@common/types/Route";

export const renderRoutes = (routes: IRoute[]): ReactElement[] => {
    return routes.map((route) => (
      <Route
        key={route.page}
        path={route.href}
        element={route.component}
        {...(route.props || {})} // Передаём дополнительные пропсы, если они есть
      />
    ));
  };