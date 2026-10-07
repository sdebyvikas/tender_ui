import React from "react";
import { Routes, Route } from "react-router-dom";
import { appRoutesConfig } from "./routesConfig";

export default function AppRoutes() {
  return (
    <Routes>
      {appRoutesConfig.flatMap((routeGroup) => {
        const paths = Array.isArray(routeGroup.path)
          ? routeGroup.path
          : [routeGroup.path];
        return paths.map((path) => (
          <Route key={path} path={path} element={routeGroup.element} />
        ));
      })}
    </Routes>
  );
}
