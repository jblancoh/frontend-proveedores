import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
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
          href=""
          passHref
        >
          <Label className="text-white">CUSTOMER MODEL RADIUS - CMR</Label>
        </Link>
      </div>
    </div>
  )
}

export default NavBar;