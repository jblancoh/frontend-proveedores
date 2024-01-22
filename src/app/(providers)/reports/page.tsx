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
        <Label className="text-radius font-bold text-3xl">Reportes</Label>
      </div>
      <div className="grid md:grid-cols-4 gap-2 grid-rows-4">
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Reporte Ad hoc</CardTitle>
            <CardDescription className="text-sm">Genera reportes de proveedores de acuerdo a la información que necesites.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports/ad-hoc')}
            >
              <Label className="font-light">Generar reporte</Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Reporte de activos</CardTitle>
            <CardDescription className="text-sm">Crea un reporte de proveedores activos, con toda su información relacionada.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports/active')}
            >
              <Label className="font-light">Descargar reporte</Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Reporte Inactivos</CardTitle>
            <CardDescription className="text-sm">Crea un reporte de proveedores inactivos o en estado de Baja, con toda su información relacionada.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports/inactive')}
            >
              <Label className="font-light">Descargar reporte</Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-3/4">
            <CardTitle className="text-base">Top Ten Activos</CardTitle>
            <CardDescription className="text-sm">Descarga información del Top Ten activos de proveedores.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('reports/top-ten')}
            >
              <Label className="font-light">Descargar reporte</Label>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;