import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import apiClient from "../../api/apiClient";
import { useState } from "react";
import { useEffect } from "react";

export const Profile = () => {
  const { session, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const getProfile = async () => {
    try {
      const response = await apiClient.get("/auth/profile");
      const data = response.data.data;
      setProfile(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              Welcome, {session.name || "User"}!
            </h1>
            <p className="text-gray-600">
              Here are your profile details. You can update your information or log out.
            </p>
          </div>

          {/* Profile Details */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-800 font-medium">
                  {profile.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800 font-medium">
                  {profile.email || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Joined On:</span>
                <span className="text-gray-800 font-medium">
                  {new Date(profile.created_at).toLocaleDateString() || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/profile/edit")}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/profile/password")}
              className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
