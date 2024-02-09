import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function NotFound() {
  
  return (
    <div className='justify-center h-screen flex flex-col items-center gap-8'>
      <Label className="text-radius font-bold text-3xl">Página no encontrada!</Label>
      <Label className='text-2xl mb-2'>
        Lo sentimos, no encontramos la página que buscas.
      </Label>
      <Link href="/home">
        <Button
          variant="radius"
        >
          Regresar a inicio
        </Button>
      </Link>
    </div>
  )
}