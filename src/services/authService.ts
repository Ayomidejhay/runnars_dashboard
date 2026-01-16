import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

/* =========================
   Types
========================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  adminId: string;
  requiresVerification?: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}

/* =========================
   Auth Services
========================= */

export const loginAdmin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "api/admin/auth/login",
    payload
  );

  const { token } = response.data;

  // Store token in cookie (middleware access)
  Cookies.set("admin_token", token, {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  //  client-side access (Axios)
  localStorage.setItem("admin_token", token);

  return response.data;
};

export const fetchCurrentAdmin = async () => {
  const response = await api.get("api/admin/profile");
  return response.data;
};

export const updateProfile = async (formData: FormData) => {
  const response = await api.put("/api/admin/settings/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // { success, message, admin }
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await api.put(
    "/api/admin/settings/change-password",
    payload
  );
  return response.data;
};

// export const verifyAccount = async (otp: string) => {
//   const res = await api.fetch("/api/auth/verify-account", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ otp }),
//   });

//   if (!res.ok) {
//     const data = await res.json();
//     throw new Error(data.message || "Verification failed");
//   }

//   return res.json();
// };

export const verifyAccount = async (payload: {
  otp: string;
  adminId: string;
}) => {
  const { data } = await api.post(
    "/api/admin/auth/verify",
    payload
  );
  return data;
};


export const logoutAdmin = async () => {
  const router = useRouter();

  try {
    await api.post("/api/admin/logout");

    // 2️⃣ Remove client-side tokens
    Cookies.remove("admin_token", { path: "/" });
    localStorage.removeItem("admin_token");

    // 3️⃣ Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);

    // Still remove tokens and redirect even if backend fails
    Cookies.remove("admin_token", { path: "/" });
    localStorage.removeItem("admin_token");
    router.push("/login");
  }
};
