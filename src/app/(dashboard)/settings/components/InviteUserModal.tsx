"use client";

import React, { useState } from "react";

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    fullName: string;
    email: string;
    role: string;
  }) => void;
}

const PERMISSIONS = [
  "Super admin",
  "Challenges",
  "Communities",
  "Content Moderations",
  "Push Notifications",
];

export default function InviteUserModal({
  open,
  onClose,
  onSubmit,
}: InviteUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email || !role) return;

    onSubmit({ fullName, email, role });

    // Reset state after submit
    setFullName("");
    setEmail("");
    setRole("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div
        className="fixed inset-0 bg-black/90"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="fixed top-2 left-1/2 -translate-x-1/2 bg-white py-3 px-6 rounded-lg shadow-lg z-50 w-[480px] max-h-[100vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl font-bold"
        >
          ×
        </button>

        <h3 className="text-xl font-bold mb-4 text-deepblue">
          Invite New User
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permission
            </label>

            <div className="flex flex-col gap-3">
              {PERMISSIONS.map((item) => {
                const selected = role === item;

                return (
                  <label
                    key={item}
                    className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <span>{item}</span>

                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selected
                          ? "border-2 border-blue-600"
                          : "border border-gray-400"
                      }`}
                    >
                      {selected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white" />
                      )}
                    </span>

                    <input
                      type="radio"
                      name="role"
                      value={item}
                      checked={selected}
                      onChange={(e) => setRole(e.target.value)}
                      className="hidden"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <button
  type="submit"
  disabled={isSubmitting}
  className="bg-brightblue text-white rounded-full w-full py-2 mt-6 disabled:opacity-50"
>
  Send Invite
</button>
      </form>
    </div>
  );
}
