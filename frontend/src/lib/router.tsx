import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import Register from "../pages/Register";

// import Register from "@/pages/Register";
// import Home from "@/pages/Home";
// import User from "@/pages/User";
// import NotFound from "@/pages/NotFound";
// import PublicRoute from "@/routes/PublicRoute";
// import ProtectedRoute from "@/routes/ProtectedRoute";

export const router = createBrowserRouter([
  // {
  //   element: <PublicRoute />,
  //   children: [
  //     { path: "/login", element: <Login /> },
  //     { path: "/register", element: <Register /> },
  //   ],
  // },
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  //     { path: "/", element: <Home /> },
  //     { path: "/user", element: <User /> },
  //     { path: "*", element: <NotFound /> },
  //   ],
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
