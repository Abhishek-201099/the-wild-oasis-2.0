import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import ErrorBoundaryLayout from "./ui/ErrorBoundaryLayout";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <Dashboard /> },
          {
            path: "/bookings",
            element: <Bookings />,
          },
          {
            path: "/bookings/:bookingId",
            element: <Booking />,
          },
          {
            path: "/checkin/:bookingId",
            element: <Checkin />,
          },
          {
            path: "/cabins",
            element: <Cabins />,
          },
          {
            path: "/account",
            element: <Account />,
          },

          { path: "/settings", element: <Settings /> },
          {
            path: "/users",
            element: <Users />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />;
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
