// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import React from "react";

export const LayoutProvider = ({ children } : {children : React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <>
            {pathname !== "/registration" && <h1>rootLayout</h1>}
            {children}
        </>
    )
};