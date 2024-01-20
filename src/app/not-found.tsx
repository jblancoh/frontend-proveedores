"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className='justify-center h-screen flex flex-col items-center gap-8'>
      <Label className="text-radius font-bold text-3xl">¡Pagina no encontrada!</Label>
      <Label className='text-2xl mb-2'>
        Lo sentimos, no encontramos la pagina que buscas.
      </Label>
      <Button
        variant="radius"
        onClick={() => router.push('/')}
      >
        Regresar a inicio
      </Button>
    </div>
  )
}