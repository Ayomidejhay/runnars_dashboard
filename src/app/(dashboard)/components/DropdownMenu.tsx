"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export type DropdownItem = {
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
};

type Props = {
  isOpen: boolean;
  position: { top: number; left: number; buttonHeight: number } | null;
  onClose: () => void;
  items: DropdownItem[];
  width?: number; // px
};

export default function DropdownMenu({
  isOpen,
  position,
  onClose,
  items,
  width = 160,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose]);

  // Adjust dropdown position (flip if near bottom)
  useEffect(() => {
    if (!isOpen || !position) return;

    const dropdownHeight = ref.current?.offsetHeight || 0;
    const viewportHeight = window.innerHeight;

    let top = position.top + position.buttonHeight; // default: below button
    if (top + dropdownHeight > viewportHeight) {
      // not enough space below → place above
      top = position.top - dropdownHeight;
    }

    setCoords({ top, left: position.left });
  }, [isOpen, position]);

  if (!isOpen || !coords) return null;

  return createPortal(
    <div
      ref={ref}
      role="menu"
      aria-orientation="vertical"
      className="bg-white shadow-lg rounded-md border border-gray-200"
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        width,
        zIndex: 9999,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((it, i) =>
        it.href ? (
          <Link
            key={i}
            href={it.href}
            onClick={onClose}
            className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 ${
              it.danger ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Image src={it.icon} alt={it.label} width={18} height={18} />
            {it.label}
          </Link>
        ) : (
          <button
            key={i}
            onClick={() => {
              it.onClick?.();
              onClose();
            }}
            className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left ${
              it.danger ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Image src={it.icon} alt={it.label} width={18} height={18} />
            {it.label}
          </button>
        )
      )}
    </div>,
    document.body
  );
}
