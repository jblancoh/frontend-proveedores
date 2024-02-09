import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from "@/components/NavBar"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '../context/auth-provider'

interface HomeLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proveedores',
  description: ' || RADIUS',
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
     <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main className="h-screen mx-auto">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
    )
  }
 
export default HomeLayout
  