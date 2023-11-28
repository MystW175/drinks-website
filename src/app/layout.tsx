import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import './globals.css';
import  NavBar from "./Navbar/NavBar";
import Footer from '../components/Footer';
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drinks and Teas',
  description: 'A new source of tasty treats and flavors at affordable prices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar/>
          <main>{children}</main>
          <Footer/>
        </SessionProvider>
        </body>
    </html>
  )
}
