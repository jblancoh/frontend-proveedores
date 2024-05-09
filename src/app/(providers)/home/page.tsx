"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

const Page = () => {
  const { toast } = useToast()

  const router = useRouter()
  return (
    <div>
      <div className="pb-2">
        <Label className="text-radius font-bold text-3xl">¡Buenos días!</Label>
      </div>
      <div className="grid md:grid-cols-3 gap-2 grid-rows-3">
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Alta de Proveedor</CardTitle>
            <CardDescription className="text-sm">Da de alta un proveedor con información básica de la empresa, directorio de contacto y zona geográfica de cobertura.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('create')}
            >
              <Label className="font-light cursor-pointer">Alta de Proveedor</Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Reportes</CardTitle>
            <CardDescription className="text-sm">Genera reportes personalizados, de acuerdo a periodos de tiempo que se necesite.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports')}
            >
              <Label className="font-light cursor-pointer">
                Generar reporte
              </Label>
            </Button>
          </CardFooter>
        </Card>
        {/* <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Mantenimiento</CardTitle>
            <CardDescription className="text-sm">Da mantenimiento a tu cuenta.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance')}
            >
              <Label className="font-light">
                Dar mantenimiento
              </Label>
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}

export default Page;