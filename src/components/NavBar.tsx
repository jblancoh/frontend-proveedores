"use client";
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "./ui/label";

const NavBar = () => {
  return (
    <div className="flex justify-around  py-2 bg-radius">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              passHref
            >
              <img src="/radius.svg"  />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center">
        <Link
          href="/"
          passHref
        >
          <Label className="text-white">CUSTOMER MODEL RADIUS - CMR</Label>
        </Link>
      </div>
    </div>
  )
}

export default NavBar;