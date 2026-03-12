import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router";
import "./App.css";

export const App = () => <RouterProvider router={router} />;
