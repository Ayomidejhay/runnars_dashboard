import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Sidebar from "./components/Sidebar";
import HideHeader from "./components/HideHeader";
import QueryProvider from "../providers/QueryProvider";
import { Toaster } from "react-hot-toast";

const satoshi = localFont({
  src: [
    { path: "../../../public/fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../public/fonts/Satoshi-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../../../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Satoshi-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/Satoshi-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Satoshi-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../../../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
    { path: "../../../public/fonts/Satoshi-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Runnars",
  description: "Runnars Admin Dashboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body className={`${satoshi.variable} flex antialiased`}>
        <QueryProvider>
          <Sidebar />
          <div className="w-full bg-[#FBFBFD] ml-64 text-gray pb-20">
            <HideHeader />
            <div className="mt-3">{children}</div>
            <Toaster position="top-right" />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
