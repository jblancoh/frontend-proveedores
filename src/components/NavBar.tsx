"use client";

import { FC } from "react";
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NavBar = () => {
  return (
    <div className="flex justify-around py-2 ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Registro
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        
      </NavigationMenu>
      <div>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>PV</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default NavBar;