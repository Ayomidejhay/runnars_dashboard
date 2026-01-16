"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useVerifyAccount } from "@/hooks/useCurrentAdmin";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { submitOtp, loading, error } = useVerifyAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitOtp(
      {
        email,
        code: otp,
        newPassword,
      },
      {
        onSuccess: () => {
          // After successful verification, send user to login
          router.replace("/login");
        },
      }
    );
  };

  const isFormValid =
    email.trim() !== "" &&
    otp.trim().length === 6 &&
    newPassword.trim().length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8f1fd] px-4">
      <div>
        <div className="mb-10">
        <Image src="/Runnars-1.svg" alt="Logo" width={64} height={41} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-2 text-center text-deepblue">
          Verify your account
        </h1>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter the verification code sent to your email and set a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-deepblue"
          />

          {/* OTP */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="6-digit verification code"
            required
            className="w-full text-center border-[#E1E1E1] tracking-widest text-lg border text-deepblue rounded-[8px] px-4 py-3 "
          />

          {/* New Password */}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            required
            className="w-full border border-[#E1E1E1] rounded-[8px] px-4 py-3 text-deepblue"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full rounded-xl bg-[#1570EF] text-white py-3 disabled:bg-[#1570EF]/50 hover:disabled:cursor-not-allowed  transition-colors font-medium"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </motion.div>
      </div>
    </div>
  );
}
