// import { createBrowserRouter, Navigate } from "react-router-dom";

// import DashboardLayout from "../../layout/Dashboardlayout";
// import Dashboard from "../../pages/Dashboard";
// import ApprovedFiles from "../../pages/ApprovedFiles";
// import PendingFiles from "../../pages/PendingFiles";
// import RejectedFiles from "../../pages/RejectedFiles";
// import Login from "../../pages/auth/Login";
// import Register from "../../pages/auth/Register";
// import ForgotPassword from "../../pages/auth/ForgotPassword";

// const router = createBrowserRouter([
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/",
//     element: <Navigate to="/dashboard" replace />,
//   },

//   {
//     element: <DashboardLayout />,

//     children: [
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },

//       {
//         path: "/approved-files",
//         element: <ApprovedFiles />,
//       },

//       {
//         path: "/pending-files",
//         element: <PendingFiles />,
//       },

//       {
//         path: "/rejected-files",
//         element: <RejectedFiles />,
//       },
//     ],
//   },

//   {
//     path: "*",
//     element: <Navigate to="/dashboard" replace />,
//   },
// ]);

// export default router;

import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import DashboardLayout from "../../layout/Dashboardlayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const ApprovedFiles = lazy(() => import("../../pages/ApprovedFiles"));
const PendingFiles = lazy(() => import("../../pages/PendingFiles"));
const RejectedFiles = lazy(() => import("../../pages/RejectedFiles"));
const Login = lazy(() => import("../../pages/auth/Login"));
const Register = lazy(() => import("../../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../../pages/auth/ResetPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    element: <PublicRoute />,
    children: [
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
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/approved-files",
            element: <ApprovedFiles />,
          },
          {
            path: "/pending-files",
            element: <PendingFiles />,
          },
          {
            path: "/rejected-files",
            element: <RejectedFiles />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
