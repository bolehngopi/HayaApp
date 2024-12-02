import { Outlet, Navigate } from "react-router-dom"; // Added Navigate for redirection
import Sidebar from "../components/Admin/Sidebar";
import { useAuth } from "../context/useAuth"; // Assuming you have AuthContext for user session

export const AdminLayout = () => {
  // const { session, loading } = useAuth(); // Get session data from AuthContext

  // if (loading) return <div>Loading...</div>; // Optional: You can show a loading indicator while session is being checked

  // // If the user is not logged in or doesn't have admin privileges, redirect them to a different page
  // if (!session.token || !session.isAdmin) {
  //   return <Navigate to="/login" replace />; // Redirect to the login page if not authenticated or not an admin
  // }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <div className="bg-white p-4 rounded shadow">
          <Outlet /> {/* Render specific pages for CRUD here */}
        </div>
      </main>
    </div>
  );
};
