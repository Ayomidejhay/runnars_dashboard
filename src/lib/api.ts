// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });



// //  attach token automatically (localStorage/cookie)
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("admin_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
// console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);


// export default api;

// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor to attach token and handle FormData correctly
api.interceptors.request.use((config) => {
  // 1️⃣ Ensure headers exist (axios provides it, but TS wants type safety)
  const headers = config.headers ?? {};

  // 2️⃣ Automatically remove Content-Type if data is FormData
  if (config.data instanceof FormData) {
    delete headers["Content-Type"];
  } else {
    // Ensure JSON requests have Content-Type
    headers["Content-Type"] = "application/json";
  }

  // 3️⃣ Attach Authorization token if present
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // 4️⃣ Assign headers back to config
  config.headers = headers;

  return config;
});

console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

export default api;
