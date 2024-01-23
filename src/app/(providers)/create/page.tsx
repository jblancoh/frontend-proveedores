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
import IconPlus from "@/components/IconPlus"

export type ContactValues = {
  title?: string,
  fullName?: string,
  officePhone?: string,
  mobilePhone?: string,
  email?: string,
}

export type FormValues = {
  id?: string,
  businessName: string,
  commercialName: string,
  website: URL | string,
  constitutionDate?: Date | string,
  state?:  string,
  fullAddress?:  string,
  postalCode?: string,
  delegation?: string,
  rfc:  string,
  socialObjective?:  string,
  economicActivity?: string,
  speciality?:  string,
  contact?: ContactValues[],
  west: boolean,
  east: boolean,
  northeast: boolean,
  northwest: boolean,
  southeast: boolean,
  center: boolean,
}

const Page = () => {
  const { toast } = useToast()
  const [showInputContact, setShowInputContact] = useState(false)
  const [contact, setContact] = useState<ContactValues>({})
  const form = useForm(
    {
      defaultValues: {
        businessName: process.env.NODE_ENV === "development" ? `Empresa ${(Math.random() * 1000).toFixed(0)}` : "",
        commercialName: process.env.NODE_ENV === "development" ? "Empresa Prueba" : "",
        website: process.env.NODE_ENV === "development" ? "www.example.com" : "",
        constitutionDate: process.env.NODE_ENV === "development" ? new Date() : "",
        deletedDate: "",
        reactivatedDate: "",
        state: process.env.NODE_ENV === "development" ? "Tabasco" : "",
        fullAddress: process.env.NODE_ENV === "development" ? "Calle 1" : "",
        postalCode: process.env.NODE_ENV === "development" ? "86000" : "",
        delegation: process.env.NODE_ENV === "development" ? "Villahermosa" : "",
        rfc: process.env.NODE_ENV === "development" ? `RFC${(Math.random() * 1000000).toFixed(0)}HT4` : "",
        socialObjective: process.env.NODE_ENV === "development" ? "Hola mundo Objetivo Social" : "",
        economicActivity: process.env.NODE_ENV === "development" ? "Hola mundo Actividad Economica" : "",
        speciality: process.env.NODE_ENV === "development" ? "Hola mundo Especialidad" : "",
        west: false,
        east: false,
        northeast: false,
        northwest: false,
        southeast: false,
        center: false,
        contact: [
          {
            title: process.env.NODE_ENV === "development" ? "CEO" : "",
            fullName: process.env.NODE_ENV === "development" ? "Juan Perez" : "",
            officePhone: process.env.NODE_ENV === "development" ? "123456789" : "",
            mobilePhone: process.env.NODE_ENV === "development" ? "123456789" : "",
            email: process.env.NODE_ENV === "development" ? "radius@example.com" : "",
          }
        ],
      }
    }
  )
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { handleSubmit} = form
  
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
                <div className="grid grid-flow-row md:grid-cols-4 gap-4">
                  <InputField form={form} name="businessName" label="Razon Social" />
                  <InputField form={form} name="commercialName" label="Nombre Comercial" />
                  <InputField form={form} name="rfc" label="RFC" />
                  <InputField form={form} name="curp" label="CURP" />
                </div>
                <div className="grid grid-flow-row md:grid-cols-3 gap-4 py-2">
                  <div className="self-center">
                    <DatePicker form={form} name="constitutionDate" label="Fecha de Constitucion" />
                  </div>
                  <div className="col-span-2">
                    <InputField form={form} name= "fullAddress" label="Domicilio Completo" />
                  </div>
                </div>
                <div className="grid grid-flow-row md:grid-cols-5 gap-4 py-2">
                  <InputField form={form} name= "state" label="Estado" />
                  <InputField form={form} name= "delegation" label="Delegacion/Municipio" />
                  <InputField form={form} name= "postalCode" label="C.P." />
                  <InputField form={form} name="website" label="Pagina Web" />
                </div>
                <div className="grid grid-flow-3 md:grid-cols-5 gap-4 items-center ">
                  <div className="md:col-span-5 mt-6">
                    <Separator />
                  </div>
                  <div className=" md:col-start-2">
                    <InputField form={form} name="socialObjective" label="Objetivo Social" multiple />
                  </div>
                    <InputField form={form} name="economicActivity" label="Actividad Economica" multiple />
                    <InputField form={form} name="speciality" label="Especialidad" multiple />
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
                {/* Contactos */}
                <div className="grid grid-flow-row gap-4 py-4">
                  {
                    form.getValues("contact").length > 0 && (
                        <div className="grid grid-cols-5 gap-4">
                          {
                            form.watch("contact")?.map((item, index) => {
                              return item?.title ? (
                              <div className="col-span-5 grid grid-cols-4 gap-4" key={`${item.title}_${index}`}>
                                <InputField form={form} name={`contact.${index}.fullName`} label={item?.title || 'Titulo'} placeholder="Nombre completo"/>
                                <InputField form={form} name={`contact.${index}.officePhone`} label="Telefono Oficina" />
                                <InputField form={form} name={`contact.${index}.mobilePhone`} label="Telefono Movil" />
                                <InputField form={form} name={`contact.${index}.email`} label="Correo Electronico" />
                                <div className="col-span-5 gap-4">
                                  <Separator />
                                </div>
                              </div>
                            ) : null
                          })
                          }
                          
                        </div>
                    )
                  }
                  <div className="col-span-5 mt-2">
                    <div className="flex justify-start gap-6">
                      <div className="col-span-1 flex items-center">
                        <IconPlus 
                          onClick={() => {
                            setShowInputContact(!showInputContact)
                            form.setValue(
                              `contact.${form.getValues("contact").length}`,
                              {
                                title: '',
                                fullName: '',
                                officePhone: '',
                                mobilePhone: '',
                                email: '',
                              }
                            )
                          }}
                        />
                      </div>
                      <div className="col-span-2 flex flex-row items-center gap-2">
                      {
                        showInputContact && (
                          <>
                            <InputField
                              form={form}
                              name="contactTitle"
                              placeholder="Título de contacto"
                              className="py-0 space-y-2"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setContact({
                                  title: e.target.value,
                                })
                              }}
                            />
                            <Button
                              variant="radius"
                              className="font-normal"
                              type="button"
                              onClick={
                                () => {
                                  form.setValue(
                                    `contact.${form.getValues("contact").length - 1}.title`,
                                    contact.title ?? ''
                                  )
                                  setContact({})
                                  setShowInputContact(false)
                                }
                              }
                            >
                              Agregar
                            </Button>
                          </>
                        )
                      }
                      </div>
                    </div>
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
                  <div className="col-span-5 grid grid-flow-row md:grid-cols-6 gap-4 justify-start self-start">
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