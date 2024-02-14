
"use client"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel,
} from "@/components/ui/form"
import { FormSectionHeader } from "@/components/form/FormSectionHeader"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import ChkGeneralData from "@/components/checkbox/ChkGeneralData"
import { getProvidersAdHoc } from "@/services"

type FormValues = {
  businessName: boolean;
  commercialName: boolean;
  rfc: boolean;
  constitutionDate: boolean;
  fullAddress: boolean;
  state: boolean;
  delegation: boolean;
  postalCode: boolean;
  website: boolean;
  socialObjective: boolean;
  economicActivity: boolean;
  specialty: boolean;
  status: string;
  allGeneralFields: boolean;
}

export type CheckboxData = {
  name: string;
  value?: string;
  isChecked?: boolean;
};

const Page = () => {
  const { toast } = useToast()
  const form = useForm(
    {
      defaultValues: {
        businessName: false,
        commercialName: false,
        website: false,
        rfc: false,
        constitutionDate: false,
        fullAddress: false,
        state: false,
        delegation: false,
        postalCode: false,
        socialObjective: false,
        economicActivity: false,
        specialty: false,
        allGeneralFields: false,
        curp: false,
        status: "actives",
      }
    }
  )

  const [loading, setLoading] = useState(false)

  const { handleSubmit } = form
  
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading(true)
    try {
      const response = await getProvidersAdHoc(values)
      const data = await response.blob();
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      const status = values.status === "actives" ? "activos" : "inactivos";
      a.download = `reportes_proveedores_${status}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast({
        title: "Success",
        description: "Se creo el reporte",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error)?.message || "Error desconocido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="pb-10">
      <FormProvider {...form}>
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title="Clasificación de proveedores" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex flex-col justify-start gap-2">
                              <div className="flex gap-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value="actives"
                                />
                                </FormControl>
                                <FormLabel htmlFor="actives">Proveedores Activos</FormLabel>
                              </div>
                              <div className="flex gap-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value="inactives"
                                  />
                                </FormControl>
                                <FormLabel htmlFor="inactives">Proveedores No Activos/Baja</FormLabel>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5 mt-6">
                  <Separator />
                </div>
                <ChkGeneralData />
                <div className="col-span-5 mt-6">
                  <Separator />
                </div>
                {/* <CardTitle>
                  <FormSectionHeader title="Directorio" />
                </CardTitle>
                */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5 mt-6">
                    <Separator />
                  </div>
                  <CardTitle>
                    <FormSectionHeader title="Zona Geográfica" />
                  </CardTitle>
                </div>
                <div className="grid grid-cols-1 gap-4 py-2">
                  <div className='items-top flex space-x-2'>
                    <Checkbox id='Todos' />
                    <div className='grid gap-1.5 leading-none'>
                      <label htmlFor='terms1' 
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                          Incluir información de cobertura de cada proveedor
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Button
              className="w-full"
              type="submit"
              variant="radius"
              disabled={loading}
            >
              {
                loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  :
                  "Generar y descargar reporte"
              }
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Page











