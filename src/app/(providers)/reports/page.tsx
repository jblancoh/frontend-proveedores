"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



const Page = () => {
  const [loadingActive, setLoadingActive] = useState(false)
  const [loadingInactive, setLoadingInactive] = useState(false)
  const [loadingTopTen, setLoadingTopTen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const getReport = async (type: number) => {
    const setLoading = type === 1 ? setLoadingActive : type === 2 ? setLoadingTopTen : setLoadingInactive
    
    setLoading(true)

    const response = await fetch(`/api/reports?type=${type}`)
    try {
      if (response.ok) {
        const data = await response.blob();
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reportes_${type === 1 ? 'activos' : type === 2 ? 'top-ten' :'inactivos'}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Algo salió mal')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Algo salió mal',
        variant: "destructive",
      })
      return
    } finally {
      setLoading(false)
    }
  }
  
  
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
              <Label className="font-light cursor-pointer]">Descargar reporte</Label>
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
              onClick={() => getReport(1)}
            >
              {
                loadingActive ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Label className="font-light cursor-pointer">Descargar reporte</Label>
              }
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
              onClick={() => getReport(0)}
            >
              {
                loadingInactive ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Label className="font-light cursor-pointer">Descargar reporte</Label>
              }
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
              onClick={() => getReport(2)}
            >
              {
                loadingTopTen ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Label className="font-light cursor-pointer">Descargar reporte</Label>
              }
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;