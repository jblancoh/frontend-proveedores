'use client'
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Label } from "./ui/label";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-provider";
import { DarkMode } from "./DarkMode";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { user } = useContext(AuthContext) || {};
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
    
  return (
    <div className="flex justify-around py-2 bg-radius min-h-16">
      {mounted &&
      <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              passHref
            >
              {/* { 
                theme === "dark" ? <img src="/ideal.png" width={150} height={150} /> :
              } */}
               {/* <img src="/public/radius.svg" /> */}
               <Image src="/radius.svg" width={150} height={150} alt="logo"/>
              {/* <img src="/kpx.png" width={150} /> */}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        <Link
          href=""
          passHref
        >
          <Label className="text-white">Provider Managment Radius - PMR</Label>
        </Link>
        <Label className="text-white">{user?.username}</Label>
        {/* <DarkMode /> */}
      </div>
      </>
      }
    </div>
  )
}

export default NavBar;