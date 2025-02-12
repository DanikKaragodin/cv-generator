import Dashboard from "@pages/Dashboard/Dashboard.tsx";
import Generator from "@pages/Generator/Generator.tsx";
import Settings from "@pages/Settings/Settings.tsx";
import Login from "@pages/Login/Login.tsx";
import React from "react";
import { IRoute } from "@types/IRoute.tsx";

export const routes: IRoute[] = [
  { page: "Главная", href: "/", isSettings: false, component: <Dashboard /> },
  { page: "Создать резюме", href: "/create-cv", isSettings: false, component: <Generator/> },
  { page: "Настройки", href: "/user-settings", isSettings: true, component: <Settings/> },
  { page: "Выйти", href: "/login", isSettings: true, component: <Login /> },
];