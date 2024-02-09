'use client'

import { handleLogout } from "@/app/actions/auth"
import { AuthContext } from "@/context/auth-provider"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const IconLogout = () => {
  const router = useRouter()
  const {setUser} = useContext(AuthContext)
  const logout = () => {
    setUser(null)
    window.localStorage.clear()
    handleLogout()
  }
  
  return (
    <div
      onClick={logout}
      className="cursor-pointer p-3"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 17L21 12L16 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default IconLogout