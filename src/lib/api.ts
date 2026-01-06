import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  attach token automatically (localStorage/cookie)
// api.interceptors.request.use((config) => {
//   try {
//     const token =
//       typeof window !== "undefined"
//         ? localStorage.getItem(
//             process.env.NEXT_PUBLIC_TOKEN_KEY || "auth_token"
//           )
//         : null;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   } catch (e) {
//     // noop
//   }
//   return config;
// });

//  attach token automatically (localStorage/cookie)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);


export default api;
