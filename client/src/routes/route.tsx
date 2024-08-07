import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import OAuthCallback from "../pages/OauthCallback";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:id",
    element: <ResetPassword />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail/>
  },
  {
    path: '/oauth-callback',
    element: <OAuthCallback/>
  },
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile/>
      }
    ],
  },
]);

export default router;
