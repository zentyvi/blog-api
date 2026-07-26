import { createBrowserRouter } from "react-router";
import { App } from "./App.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LogInForm from "./pages/LogInForm.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage.jsx";
import UserProfile from "./pages/UserProfilePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NewPostForm from "./pages/NewPostForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: "sign-up", element: <SignUpForm /> },
          { path: "log-in", element: <LogInForm /> },
        ],
      },
      {
        element: <ProtectRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "posts/:postId", element: <SingleArticlePage /> },
          { path: "users/:userId", element: <UserProfile /> },
          { path: "new", element: <NewPostForm /> },
        ],
      },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

export default router;
