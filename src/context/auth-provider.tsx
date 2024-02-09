'use client'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

type UserType = {
  username: string;
}

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

type AuthProviderProps = {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  
  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (username) {
      setUser({ username });
    }
  }
  , [])
  
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export { AuthContext }
export default AuthProvider

