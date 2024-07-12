import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from "@/components/NavBar"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '../context/auth-provider'
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider 
          attribute="class"
          defaultTheme='dark'
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <AuthProvider>
            <NavBar />
            <main className="h-screen mx-auto">
              {children}
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
    )
  }
 
export default HomeLayout
  