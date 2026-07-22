import { createBrowserRouter } from "react-router";
import { App } from "./App.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LogInForm from "./pages/LogInForm.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: "sign-up", element: <SignUpForm /> },
          { path: "log-in", element: <LogInForm /> },
        ],
      },
    ],
  },
]);

export default router;
