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
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import DatePicker from "@/components/DatePicker"
import { ToastAction } from "@/components/ui/toast"
import IconPlus from "@/components/IconPlus"
import PDFSat from "@/components/PDFSat"
import PDFOthers from "@/components/PDFOthers"
import {  } from "react"

const IS_DEV = process.env.NODE_ENV === "development"

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
        businessName: IS_DEV ? `Empresa ${(Math.random() * 1000).toFixed(0)}` : "",
        commercialName: IS_DEV ? "Empresa Prueba" : "",
        website: IS_DEV ? "www.example.com" : "",
        constitutionDate: IS_DEV ? new Date() : "",
        deletedDate: "",
        reactivatedDate: "",
        state: IS_DEV ? "Tabasco" : "",
        fullAddress: IS_DEV ? "Calle 1" : "",
        postalCode: IS_DEV ? "86000" : "",
        delegation: IS_DEV ? "Villahermosa" : "",
        rfc: IS_DEV ? `RFC${(Math.random() * 1000000).toFixed(0)}HT4` : "",
        socialObjective: IS_DEV ? "Hola mundo Objetivo Social" : "",
        economicActivity: IS_DEV ? "Hola mundo Actividad Economica" : "",
        speciality: IS_DEV ? "Hola mundo Especialidad" : "",
        west: false,
        east: false,
        northeast: false,
        northwest: false,
        southeast: false,
        center: false,
        contact: [
          {
            title: IS_DEV ? "CEO" : "",
            fullName: IS_DEV ? "Juan Perez" : "",
            officePhone: IS_DEV ? "123456789" : "",
            mobilePhone: IS_DEV ? "123456789" : "",
            email: IS_DEV ? "radius@example.com" : "",
          }
        ],
      }
    }
  )
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { handleSubmit, reset } = form
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    try {
      const response = await createProviders(data)
      toast({
        title: "Proveedor guardado con éxito",
        description: `Se guardo al proveedor ${response?.data?.nomraz} con número ${response?.data?.id}.`,
        variant: "success",
        action: <ToastAction className="bg-radius text-white hover:bg-slate-500" altText="Ok">Ok</ToastAction>
      })
      reset()
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
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          {isVisible && <PDFSat form={form} />}
        </div>
        <div className="col-span-1">
          {isVisible && <PDFOthers form={form} />}
        </div>
      </div>
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
                  <InputField form={form} name="businessName" label="Razón social" />
                  <InputField form={form} name="commercialName" label="Nombre comercial" />
                  <InputField form={form} name="rfc" label="RFC" />
                  <InputField form={form} name="website" label="Página web" />

                </div>
                <div className="grid grid-flow-row md:grid-cols-3 gap-4 py-2">
                  <div className="self-end">
                    <DatePicker form={form} name="constitutionDate" label="Fecha de constitución" />
                  </div>
                  <div className="col-span-2">
                    <InputField form={form} name= "fullAddress" label="Domicilio completo" />
                  </div>
                </div>
                <div className="grid grid-flow-row md:grid-cols-5 gap-4 py-2">
                  <InputField form={form} name= "state" label="Estado" />
                  <InputField form={form} name= "delegation" label="Delegación/Municipio" />
                  <InputField form={form} name= "postalCode" label="C.P." />
                </div>
                <div className="grid grid-flow-3 md:grid-cols-3 gap-4 items-center ">
                  <div className="md:col-span-3 mt-6">
                    <Separator />
                  </div>
                    <InputField form={form} name="socialObjective" label="Objetivo social" multiple />
                    <InputField form={form} name="economicActivity" label="Actividad económica" multiple />
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
                <div className="grid grid-flow-row gap-4 py-4">
                  {
                    form.getValues("contact").length > 0 && (
                        <div className="grid grid-cols-5 gap-4">
                          {
                            form.watch("contact")?.map((item, index) => {
                              return item?.title ? (
                              <div className="col-span-5 grid grid-cols-4 gap-4" key={`${item.title}_${index}`}>
                                <InputField form={form} name={`contact.${index}.fullName`} label={item?.title || 'Titulo'} placeholder="Nombre completo"/>
                                <InputField form={form} name={`contact.${index}.officePhone`} label="Teléfono Oficina" />
                                <InputField form={form} name={`contact.${index}.mobilePhone`} label="Teléfono Movil" />
                                <InputField form={form} name={`contact.${index}.email`} label="Correo" />
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