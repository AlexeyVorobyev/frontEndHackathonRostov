import type { Metadata } from 'next'
import React from "react";
import Header from "@/components/layoutComponents/header/Header";
import {ProviderRedux} from "@/redux/provider";

export const metadata: Metadata = {
  title: 'SOUP admin panel',
  description: 'Generated by create next app',
}

export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <>
          {children}
      </>
  )
}
