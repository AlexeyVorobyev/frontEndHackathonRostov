// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import React from "react";
import Header from "@/components/layoutComponents/header/Header";
import Footer from "@/components/layoutComponents/footer/Footer";

export const LayoutProvider = ({ children } : {children : React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <>
            {pathname !== "/" && <Header/>}
            {children}
        </>
    )
};