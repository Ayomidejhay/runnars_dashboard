'use client';

import { usePathname } from 'next/navigation';
import React from 'react'
import Header from './Header';


export default function HideHeader() {
    const pathname = usePathname(); // use client
  const hideHeader = pathname.startsWith("/challenges/new-challenge") || pathname.startsWith("/notification/new-notification") || pathname.startsWith("/challenges/managebadge/newbadge") || pathname.startsWith("/communities/managebadge/newbadge") || pathname.startsWith("/communities/new-community") || pathname.includes("/challenges/") && pathname.endsWith("/edit");
  return (
    <div>
         {!hideHeader && <Header />}
    </div>
  )
}
