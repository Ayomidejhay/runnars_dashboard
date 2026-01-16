"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
// import { login } from "@/services/authService";
import { loginAdmin } from "@/services/authService";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error states
  const [error, setError] = useState("");



  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await loginAdmin({ email, password });

    // ✅ VERIFIED LOGIN
    localStorage.setItem("admin_token", response.token);
    localStorage.setItem("admin_data", JSON.stringify(response.adminId));

    router.replace("/");
  } catch (err: any) {
    const data = err?.response?.data;

    // UNVERIFIED ACCOUNT → ROUTE TO VERIFY PAGE
     
    if (data?.requiresVerification) {
      router.replace(`/verifyAccount?adminId=${data.adminId}`);

      return;
    }

    setError(data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};



  const isFormFilled = email !== "" && password !== "";

  return (
    <div className="pt-14 bg-[#e8f1fd] min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 items-center justify-center mx-auto">
        <div>
          <Image src="/Runnars.svg" alt="Logo" width={64} height={41} />
        </div>

        <div className="flex flex-col gap-6 w-[596px] h-[488px] bg-white rounded-3xl shadow-md p-10 justify-center">
          <h1 className="text-2xl font-bold text-center text-deepblue">
            Welcome back👋
          </h1>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-deepblue">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-[#E1E1E1] rounded-[8px] px-3 py-4 w-full text-deepblue"
                  placeholder="Enter email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-deepblue">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`border ${
                    error ? "border-red-500" : "border-[#E1E1E1]"
                  } rounded-[8px] px-3 py-4 w-full text-deepblue`}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-12  text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </div>

              <div>
                <Link href="#" className="text-sm text-[#1570EF]">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormFilled}
              className={`mt-6 text-white rounded-[32px] h-[52px] flex items-center justify-center  w-full font-medium transition 
                ${
                  isFormFilled
                    ? "bg-[#1570EF] cursor-pointer"
                    : "bg-[#1570EF]/30 cursor-not-allowed"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
