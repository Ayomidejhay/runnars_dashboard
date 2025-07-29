"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ProfileDetails from "./components/ProfileDetails";
import ChangePassword from "./components/ChangePassword";
import User from "./components/User";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Profile details");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // --- Render content based on active tab ---
  const renderContent = () => {
    switch (activeTab) {
      case "Profile details":
        return (
        <ProfileDetails />
        );

      case "Change Password":
        return (
          <ChangePassword />
        );

      case "Users":
        return (
          <User />
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-10">
      <h1 className="capitalize text-[34px] font-bold text-deepblue">
        Settings
      </h1>

      <div className="mt-6">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-4 px-5">
            {["Profile details", "Change Password", "Users"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Page;
