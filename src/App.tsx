import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import RootRedirect from "@/components/RootRedirect";

import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";

import UserList from "@/pages/Users/UserList";

import CallbackList from "./pages/CallbackRequests/CallbackList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Check */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route
            path="/signin"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <AdminLayout>
                <UserList />
              </AdminLayout>
            }
          />
          <Route
            path="/callback-requests"
            element={
              <AdminLayout>
                <CallbackList />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
