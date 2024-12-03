import { useState } from "react";
import apiClient from "../../api/apiClient";

const EditProfileForm = ({ profile, onClose, refreshProfile }) => {
  const [mode, setMode] = useState("editProfile"); // Modes: 'editProfile', 'changePassword'
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "editProfile") {
        await apiClient.put("/auth/profile", { name, email, phone });
        refreshProfile(); // Refresh the profile details
      } else if (mode === "changePassword") {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await apiClient.put("/auth/profile", { password, password_confirmation: confirmPassword });
      }
      onClose(); // Close the modal
    } catch (error) {
      console.error(`Error updating ${mode}:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {mode === "editProfile" ? "Edit Profile" : "Change Password"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "editProfile" ? (
            <>
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone</label>
                <input
                  type="email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() =>
                setMode((prevMode) => (prevMode === "editProfile" ? "changePassword" : "editProfile"))
              }
              className="text-blue-500 hover:underline text-sm"
            >
              {mode === "editProfile" ? "Change Password Instead" : "Edit Profile Instead"}
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {mode === "editProfile" ? "Save Changes" : "Update Password"}
            </button>   
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
