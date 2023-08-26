import type { Metadata } from 'next'
import React from "react";
import {ProviderRedux} from "@/redux/provider";
import {LayoutProvider} from "@/app/layoutProvider";
import './globals.css'
import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'SOUP admin panel',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
      <html lang="en">
      <body className={styles.body}>
      <ProviderRedux>
          <LayoutProvider>
              {children}
          </LayoutProvider>
      </ProviderRedux>
      </body>
      </html>
    )
}
