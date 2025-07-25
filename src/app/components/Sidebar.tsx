"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

const mainItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: "/dashbord.svg",
    activeIcon: "/Dashboard.svg",
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: "/tasks.svg",
    activeIcon: "/task.svg",
  },
  {
    title: "Users",
    url: "/users",
    icon: "/user-square.svg",
    activeIcon: "/user-square2.svg",
    hasSubmenu: true,
    submenu: [
      {
        title: "All Pets",
        url: "/users/pets",
      },
    ],
  },
  {
    title: "Communities",
    url: "/communities",
    icon: "/people.svg",
    activeIcon: "/people2.svg",
  },
  {
    title: "Content Moderation",
    url: "/content-moderation",
    icon: "/message-edit.svg",
    activeIcon: "/message-edit2.svg",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: "/status-up.svg",
    activeIcon: "/status-up2.svg",
  },
  {
    title: "Push Notifications",
    url: "/notifications",
    icon: "/sms-tracking.svg",
    activeIcon: "/sms-tracking2.svg",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "/setting-2.svg",
    activeIcon: "/setting.svg",
  },
];

export default function Sidebar() {
      const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({
    Users: pathname.startsWith("/users"),
  });

  const toggleSubmenu = (title: string) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    <aside
      className={`h-screen px-5 bg-[#263238] transition-all duration-300 fixed ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo Header */}
      <div className="pt-[16px] pb-[8px] flex items-center gap-3">
        <div>
          <Image src="/logo.png" width={50} height={32} alt="logo" />
        </div>
        {!isCollapsed && (
          <div className="rounded-[4px] bg-[#1570EF] w-[57px] h-[20px] flex items-center justify-center">
            <p className="text-xs text-white uppercase">Admin</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="py-6 flex flex-col text-[14px]">
        {mainItems.map((item) => {
          const isSubmenuActive =
            item.submenu?.some((sub) => pathname === sub.url) ?? false;

          const isParentActive =
            pathname === item.url || isSubmenuActive;

          const isOpen = submenuOpen[item.title];

          return (
            <div key={item.title}>
              {item.hasSubmenu ? (
                <>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 py-3 w-full rounded transition ${
                        isParentActive
                          ? "text-white font-bold"
                          : "text-[#8E98A8]"
                      }`}
                    >
                      <Image
                        src={isParentActive ? item.activeIcon : item.icon}
                        alt={`${item.title} icon`}
                        width={24}
                        height={24}
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                    {!isCollapsed && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="text-white"
                      >
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {isOpen && !isCollapsed && (
                    <div className="  ml-1.5 flex flex-col gap-2">
                      {item.submenu?.map((sub) => (
                        <Link
                          key={sub.url}
                          href={sub.url}
                          className={`flex items-center  gap-2 px-1 h-10 rounded text-sm transition ${
                            pathname === sub.url
                              ? "text-white font-bold"
                              : "text-[#8E98A8]"
                          }`}
                        >
                            <div className="border border-white bg-white h-10 w-[2px]"></div>
                            <span>{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 py-3 rounded transition ${
                    pathname === item.url
                      ? "text-white font-bold"
                      : "text-[#8E98A8]"
                  }`}
                >
                  <Image
                    src={
                      pathname === item.url
                        ? item.activeIcon
                        : item.icon
                    }
                    alt={`${item.title} icon`}
                    width={20}
                    height={20}
                  />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  )
}
