import { createBrowserRouter } from "react-router-dom";

import { InitializerRoute } from "../routes/InitializerRoute";
import { PublicRoute } from "../routes/PublicRoutes";
import { ProtectedRoute } from "../routes/ProtectedRoutes";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Profile } from "../pages/Profile";

export const router = createBrowserRouter([
  {
    element: <InitializerRoute />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
