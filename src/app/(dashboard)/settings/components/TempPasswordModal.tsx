// "use client";

// import { useState } from "react";

// export default function TempPasswordModal({
//   tempPassword,
//   onClose,
// }: {
//   tempPassword: string;
//   onClose: () => void;
// }) {
//   const [visible, setVisible] = useState(false);

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-[420px]">
//         <h3 className="text-lg font-semibold mb-4">
//           Temporary Password
//         </h3>

//         <div className="flex items-center justify-between border rounded px-4 py-3 mb-4">
//           <span className="font-mono">
//             {visible ? tempPassword : "••••••••••••"}
//           </span>

//           <button
//             onClick={() => setVisible((v) => !v)}
//             className="text-sm text-blue-600"
//           >
//             {visible ? "Hide" : "Show"}
//           </button>
//         </div>

//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(tempPassword);
//           }}
//           className="w-full bg-gray-900 text-white rounded py-2 mb-3"
//         >
//           Copy Password
//         </button>

//         <button
//           onClick={onClose}
//           className="w-full border rounded py-2"
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }
