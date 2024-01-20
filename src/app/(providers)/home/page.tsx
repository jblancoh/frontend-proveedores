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

const Page = () => {
  const router = useRouter()
  return (
    <div>
      <div className="pb-2">
        <Label className="text-radius font-bold text-3xl">¡Buenos días!</Label>
      </div>
      <div className="grid md:grid-cols-3 gap-2 grid-rows-3">
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle>Alta de Proveedor</CardTitle>
            <CardDescription>Da de alta un proveedor con información básica de la empresa, directorrio de contacto y zona geográfica de cobertura.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('create')}
            >
              Alta de Proveedor
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle>Reportes</CardTitle>
            <CardDescription>Genera reportes personalizados, de acuerdo a periodos de tiempo que necesites.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports')}
            >
              Generar reporte
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle>Mantenimiento</CardTitle>
            <CardDescription>Da mantenimiento a tu cuenta.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance')}
            >
              Dar mantenimiento
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;