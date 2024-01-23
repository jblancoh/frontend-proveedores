"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { FormSectionHeader } from "@/components/form/FormSectionHeader"
import { InputField } from "@/components/form/InputField"
import { SwitchField } from "@/components/form/SwitchField"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { createProviders } from "@/services"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import DatePicker from "@/components/DatePicker"
import { ToastAction } from "@/components/ui/toast"

type FormValues = {
  businessName: string,
  commercialName: string,
  website:  string,
  constitutionDate: Date,
  state:  string,
  fullAddress:  string,
  postalCode: string,
  delegation: string,
  rfc:  string,
  socialObjective:  string,
  economicActivity: string,
  specialty:  string,
  legalRepresentativeFullName:  string,
  legalRepresentativeOfficePhone: string,
  legalRepresentativeMobilePhone: string,
  legalRepresentativeEmail: string,
  generalDirectorFullName:  string,
  generalDirectorOfficePhone: string,
  generalDirectorMobilePhone: string,
  generalDirectorEmail: string,
  tenderContactFullName:  string,
  tenderContactOfficePhone: string,
  tenderContactMobilePhone: string,
  tenderContactEmail: string,
  administrativeContactFullName:  string,
  administrativeContactOfficePhone: string,
  administrativeContactMobilePhone: string,
  administrativeContactEmail: string,
  west: boolean,
  east: boolean,
  northeast: boolean,
  northwest: boolean,
  southeast: boolean,
  center: boolean,
}

const Page = () => {
  const { toast } = useToast()
  const form = useForm(
    {
      defaultValues: {
        businessName: process.env.NODE_ENV === "development" ? "Hola" : "",
        commercialName: process.env.NODE_ENV === "development" ? "Hola" : "",
        website: process.env.NODE_ENV === "development" ? "Hola" : "",
        constitutionDate: new Date(),
        deletedDate: "",
        reactivatedDate: "",
        state: process.env.NODE_ENV === "development" ? "Tabasco" : "",
        fullAddress: process.env.NODE_ENV === "development" ? "Calle 1" : "",
        postalCode: process.env.NODE_ENV === "development" ? "86000" : "",
        delegation: process.env.NODE_ENV === "development" ? "Villahermosa" : "",
        rfc: process.env.NODE_ENV === "development" ? "RFC123456789" : "",
        socialObjective: process.env.NODE_ENV === "development" ? "Hola mundo Objetivo Social" : "",
        economicActivity: process.env.NODE_ENV === "development" ? "Hola mundo Actividad Economica" : "",
        specialty: process.env.NODE_ENV === "development" ? "Hola mundo Especialidad" : "",
        legalRepresentativeFullName: process.env.NODE_ENV === "development" ? "Hola mundo Apoderado Legal" : "",
        legalRepresentativeOfficePhone: process.env.NODE_ENV === "development" ? "123456789" : "",
        legalRepresentativeMobilePhone: process.env.NODE_ENV === "development" ? "123456789" : "",
        legalRepresentativeEmail: process.env.NODE_ENV === "development" ? "legal@example.com" : "",
        generalDirectorFullName: "",
        generalDirectorOfficePhone: "",
        generalDirectorMobilePhone: "",
        generalDirectorEmail: "",
        tenderContactFullName: "",
        tenderContactOfficePhone: "",
        tenderContactMobilePhone: "",
        tenderContactEmail: "",
        administrativeContactFullName: "",
        administrativeContactOfficePhone: "",
        administrativeContactMobilePhone: "",
        administrativeContactEmail: "",
        west: false,
        east: false,
        northeast: false,
        northwest: false,
        southeast: false,
        center: false,
      }
    }
  )
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const { handleSubmit } = form
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    try {
      await createProviders(data)
      toast({
        title: "Success",
        description: "Se creo el proveedor",
        variant: "success",
        action: <ToastAction className="bg-radius text-white hover:bg-slate-500" altText="Ok">Ok</ToastAction>
      })
      
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el proveedor",
        variant: "destructive",
      })
      router.push("home")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="pb-10">
      <Form {...form}>
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title="General" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <InputField form={form} name="businessName" label="Razon Social" />
                  <InputField form={form} name="commercialName" label="Nombre Comercial" />
                  <InputField form={form} name="rfc" label="RFC" />
                  <InputField form={form} name="curp" label="CURP" />
                </div>
                <div className="grid grid-cols-3 gap-4 py-2">
                  <div className="self-center">
                    <DatePicker form={form} name="constitutionDate" label="Fecha de Constitucion" />
                  </div>
                  <div className="col-span-2">
                    <InputField form={form} name= "fullAddress" label="Domicilio Completo" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 py-2">
                  <InputField form={form} name= "state" label="Estado" />
                  <InputField form={form} name= "delegation" label="Delegacion/Municipio" />
                  <InputField form={form} name= "postalCode" label="C.P." />
                  <InputField form={form} name="website" label="Pagina Web" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5 mt-6">
                    <Separator />
                  </div>
                  <div className="col-start-2">
                    <InputField form={form} name="socialObjective" label="Objetivo Social" multiple />
                  </div>
                  <InputField form={form} name="economicActivity" label="Actividad Economica" multiple />
                  <InputField form={form} name="specialty" label="Especialidad" multiple />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title="Directorio" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 py-4">
                  <div className="col-span-5 grid grid-cols-4 gap-4">
                    <InputField form={form} name="legalRepresentativeFullName" label="Apoderado Legal" />
                    <InputField form={form} name="legalRepresentativeOfficePhone" label="Telefono Oficina" />
                    <InputField form={form} name="legalRepresentativeMobilePhone" label="Telefono Movil" />
                    <InputField form={form} name="legalRepresentativeEmail" label="Correo Electronico" />
                  </div>
                  <div className="col-span-5 mt-2">
                    <Separator />
                  </div>
                  <div className="col-span-5 grid grid-cols-4 gap-4">
                    <InputField form={form} name="generalDirectorFullName" label="Director General" />
                    <InputField form={form} name="generalDirectorOfficePhone" label="Telefono Oficina" />
                    <InputField form={form} name="generalDirectorMobilePhone" label="Telefono Movil" />
                    <InputField form={form} name="generalDirectorEmail" label="Correo Electronico" />
                  </div>
                  <div className="col-span-5 mt-2">
                    <Separator />
                  </div>
                  <div className="col-span-5 grid grid-cols-4 gap-4">
                    <InputField form={form} name="tenderContactFullName" label="Contacto Licitacion" />
                    <InputField form={form} name="tenderContactOfficePhone" label="Telefono Oficina" />
                    <InputField form={form} name="tenderContactMobilePhone" label="Telefono Movil" />
                    <InputField form={form} name="tenderContactEmail" label="Correo Electronico" />
                  </div>
                  <div className="col-span-5 mt-2">
                    <Separator />
                  </div>
                  <div className="col-span-5 grid grid-cols-4 gap-4">
                    <InputField form={form} name="administrativeContactFullName" label="Contacto Administrativo" />
                    <InputField form={form} name="administrativeContactOfficePhone" label="Telefono Oficina" />
                    <InputField form={form} name="administrativeContactMobilePhone" label="Telefono Movil" />
                    <InputField form={form} name="administrativeContactEmail" label="Correo Electronico" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title="Zona Geográfica" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  <div className="pb-2">
                    <Label className=" font-normal">
                      Cobertura:
                    </Label>
                  </div>
                  <div className="col-span-5 grid grid-cols-6 gap-4 ">
                    <SwitchField form={form} name="west" label="Occidente" />
                    <SwitchField form={form} name="east" label="Oriente" />
                    <SwitchField form={form} name="northeast" label="Noreste" />
                    <SwitchField form={form} name="northwest" label="Noroeste" />
                    <SwitchField form={form} name="southeast" label="Sureste" />
                    <SwitchField form={form} name="center" label="Centro" />
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
                  "Guardar"
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Page