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
      <div className="grid grid-cols-3">
        <Card>
          <CardHeader>
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
      </div>
    </div>
  );
}

export default Page;