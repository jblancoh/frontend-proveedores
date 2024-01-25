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
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  return redirect('not-found')
  const router = useRouter()
  return (
    <div>
      <div className="pb-2">
        <Label className="text-radius font-bold text-3xl">Mantenimiento</Label>
      </div>
      <div className="grid md:grid-cols-4 gap-2 grid-rows-4">
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle className="text-base">Catálogos</CardTitle>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance/catalogs')}
              
            >
              <Label className="font-light whitespace-break-spaces text-left">Mantenimiento de catálogos</Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle className="text-base">Proveedores activos</CardTitle>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance/providers')}
            >
              <Label className="font-light whitespace-break-spaces text-left">
                Mantenimiento de proveedores
              </Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle className="text-base">Proveedores Históricos</CardTitle>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance/historic')}
            >
              <Label className="font-light whitespace-break-spaces text-left">
                Mantenimiento histórico
              </Label>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="h-2/3">
            <CardTitle className="text-base">Otros</CardTitle>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="radius"
              onClick={() => router.push('maintenance/others')}
            >
              <Label className="font-light whitespace-break-spaces md:text-left">
                Matenimiento otros
              </Label>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;