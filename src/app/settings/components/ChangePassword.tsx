"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Error messages
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Old password is required.";
      valid = false;
    }

    if (newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
      valid = false;
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Password updated:", { oldPassword, newPassword });
      // ✅ Make API call here
    }
  };

  return (
    <div className="w-[800px]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Old Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-deepblue mb-1">
              Old Password
            </label>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
                errors.oldPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowOld((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-deepblue mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-deepblue mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          className="bg-brightblue text-white rounded-[32px] text-[14px] h-[48px] w-[138px] flex items-center justify-center mt-4"
          type="submit"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
