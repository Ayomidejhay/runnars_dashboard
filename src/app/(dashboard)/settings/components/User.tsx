"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PendingUsers from "./PendingUsers";
import ActiveUsers from "./ActiveUsers";

export default function UserPage() {
  const [active, setActive] = useState<"pending" | "users">("pending");

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="w-[200px] bg-white h-[44px] py-1 px-2 rounded-full relative flex justify-between items-center shadow-inner">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-brightblue shadow-md ${
            active === "pending" ? "left-1" : "left-1/2"
          }`}
        />

        <button
          onClick={() => setActive("pending")}
          className={`relative z-10 w-1/2 text-sm font-semibold ${
            active === "pending" ? "text-white" : "text-gray-500"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setActive("users")}
          className={`relative z-10 w-1/2 text-sm font-semibold ${
            active === "users" ? "text-white" : "text-gray-500"
          }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {active === "pending" ? <PendingUsers /> : <ActiveUsers />}
      </div>
    </div>
  );
}
