"use client"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useRouter, usePathname } from 'next/navigation'

const Menu = () => {
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <Menubar className="bg-white border-0 rounded-none">
      <MenubarMenu>
        <MenubarTrigger 
          className={`hover:bg-radius hover:text-white 
            ${(pathname === '/create' || pathname === '/providers' || pathname === '/edit') && 'bg-radius text-white'}
          `}
          
        >
          ABC
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => router.push('/create')}>
            Alta Proveedor <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => router.push('/providers')}>
            Bajas y cambios <MenubarShortcut>⌘E</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger 
          className={`hover:bg-radius hover:text-white focus:bg-radius focus:text-white 
            ${pathname === '/reports' && 'bg-radius text-white'}
          `}
          onClick={() => router.push('/reports')}
        >
          Reportes
        </MenubarTrigger>
      </MenubarMenu>
      {/* <MenubarMenu>
        <MenubarTrigger 
          className={`hover:bg-radius hover:text-white focus:bg-radius focus:text-white 
            ${pathname === '/maintenance' && 'bg-radius text-white'}
          `}
          onClick={() => router.push('maintenance')}
        >
          Mantenimiento
        </MenubarTrigger>
      </MenubarMenu> */}
    </Menubar>
  )
}

export default Menu;