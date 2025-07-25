import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Image from "next/image";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi", // Optional: Define a CSS variable for easier use with Tailwind CSS
  display: "swap", // Recommended for better performance
});

export const metadata: Metadata = {
  title: "Runnars",
  description: "Runnars Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable}  flex   antialiased`}
      >
        <Sidebar />
        <div className="w-full bg-[#FBFBFD] ml-64 text-gray pb-20">
          <div className="py-3 px-10 border-b border-[#E1E1E1] flex justify-end">
            <div className="flex gap-4 items-center justify-center">
              <div>
                
                  <Image
                  src="/notification.svg"
                  alt="notification icon"
                  width={40}
                  height={40}
                />
                
              </div>
              <div className="flex gap-2">
                <Image src="avatar.svg" alt="avatar" width={40} height={40} />
                <div className="flex items-center gap-1">
                  <div className="flex flex-col text-xs w-[112px]">
                    <p className="font-bold text-deepblue">Einstein O.</p>
                    <p>Admin</p>
                  </div>
                  <button>
                    <Image
                      src="/dropdown.svg"
                      alt="button"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 px-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
