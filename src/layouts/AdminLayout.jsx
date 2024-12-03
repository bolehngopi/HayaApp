import { Outlet, Navigate } from "react-router-dom"; // Added Navigate for redirection
import Sidebar from "../components/Admin/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";

export const AdminLayout = () => {
  const { session, loading } = useContext(AuthContext); // Get session data from AuthContext


  useEffect(() => {
    // console.log(session.isAdmin)

    if (!session.isAdmin) {
      <Navigate to="/login" replace />; // Redirect to the login page if not authenticated or not an admin
    }
  })
  // If the user is not logged in or doesn't have admin privileges, redirect them to a different page

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
          <Outlet /> {/* Render specific pages for CRUD here */}
      </main>
    </div>
  );
};
