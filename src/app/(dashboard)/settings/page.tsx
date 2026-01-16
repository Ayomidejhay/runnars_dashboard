"use client";

import React, { useMemo, useState } from "react";
import ProfileDetails from "./components/ProfileDetails";
import ChangePassword from "./components/ChangePassword";
import User from "./components/User";
import {
  useCurrentAdmin,
  useLogoutAdmin,
} from "@/hooks/useCurrentAdmin";

type TabKey = "Profile details" | "Change Password" | "Users";

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Profile details");

  const { data: admin, isLoading } = useCurrentAdmin();
  const logoutAdmin = useLogoutAdmin();

  const isSuperAdmin = admin?.admin?.role === "super_admin";

  /**
   * Define tabs declaratively and filter by role
   */
  const tabs = useMemo(
    () =>
      [
        {
          key: "Profile details" as TabKey,
          label: "Profile details",
          allowed: true,
        },
        {
          key: "Change Password" as TabKey,
          label: "Change Password",
          allowed: true,
        },
        {
          key: "Users" as TabKey,
          label: "Users",
          allowed: isSuperAdmin,
        },
      ].filter((tab) => tab.allowed),
    [isSuperAdmin]
  );

  /**
   * Render tab content (secondary protection)
   */
  const renderContent = () => {
    switch (activeTab) {
      case "Profile details":
        return <ProfileDetails admin={admin} />;

      case "Change Password":
        return <ChangePassword />;

      case "Users":
        return isSuperAdmin ? <User /> : null;

      default:
        return null;
    }
  };

  if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      Loading...
    </div>
  );
}

  return (
    <div className="px-10">
      <h1 className="capitalize text-[34px] font-bold text-deepblue">
        Settings
      </h1>

      <div className="mt-6">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-4 px-5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderContent()}</div>
      </div>

      <button
        onClick={() => logoutAdmin()}
        className="bg-red-500 text-white rounded-[32px] text-[14px] h-[48px] w-[138px] mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Page;
