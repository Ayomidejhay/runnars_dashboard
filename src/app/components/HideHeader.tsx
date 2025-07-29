'use client';

import { usePathname } from 'next/navigation';
import React from 'react'
import Header from './Header';


export default function HideHeader() {
    const pathname = usePathname(); // use client
  const hideHeader = pathname.startsWith("/challenges/new-challenge");
  return (
    <div>
         {!hideHeader && <Header />}
    </div>
  )
}
