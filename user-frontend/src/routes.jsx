import { createBrowserRouter } from "react-router";
import { App } from "./App.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LogInForm from "./pages/LogInForm.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: "sign-up", element: <SignUpForm /> },
          { path: "log-in", element: <LogInForm /> },
        ],
      },
      { path: "posts/:postId", element: <SingleArticlePage /> },
    ],
  },
]);

export default router;
