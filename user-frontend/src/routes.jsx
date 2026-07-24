import { createBrowserRouter } from "react-router";
import { App } from "./App.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LogInForm from "./pages/LogInForm.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage.jsx";
import UserProfile from "./pages/UserProfilePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
      { path: "users/:userId", element: <UserProfile /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

export default router;
