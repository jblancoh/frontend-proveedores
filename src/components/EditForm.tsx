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
import { updateProviderById } from "@/services"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import DatePicker from "@/components/DatePicker"
import { ToastAction } from "./ui/toast"
import { ContactValues, FormValues } from "@/app/(providers)/create/page"
import IconPlus from "./IconPlus"

interface ProviderData {
  id: string
  nomraz: string
  nomcomm: string
  website?: URL | string,
  rfc?: string
  obj_social?: string
  act_econom?: string
  especialidad?: string
  tel1?: string
  tel2?: string
  domicilio?: string
  delmpo?: string
  estado?: string
  cp?: string
  nacional?: string
  num_escritura?: string
  estatus?: number
  contact?: Array<any>
  coverage?: Array<any>
  fec_const?: string
}


const EditForm = ({ provider }: { provider: ProviderData }) => {
  const { toast } = useToast()
  const [showInputContact, setShowInputContact] = useState(false)
  const [contact, setContact] = useState<ContactValues>({})
  const form = useForm(
    {
      defaultValues: {
        id: provider.id,
        businessName: provider.nomraz,
        commercialName: provider.nomcomm,
        website: provider.website ?? '',
        constitutionDate: provider.fec_const,
        state: provider.estado,
        fullAddress: provider.domicilio,
        postalCode: provider.cp,
        delegation: provider.delmpo,
        rfc: provider.rfc ?? '',
        socialObjective: provider.obj_social,
        economicActivity: provider.act_econom,
        speciality: provider.especialidad,
        contact: provider.contact ?? [],
        west: provider.coverage?.includes("Occidente") ?? false,
        east: provider.coverage?.includes("Oriente") ?? false,
        northeast: provider.coverage?.includes("Noreste") ?? false,
        northwest: provider.coverage?.includes("Noroeste") ?? false,
        southeast: provider.coverage?.includes("Sureste") ?? false,
        center: provider.coverage?.includes("Centro") ?? false,
      }
    }
  )
  
  // values of form render whit change
  
  useEffect(() => {
    form.setValue("id", provider.id)
    form.setValue("businessName", provider.nomraz)
    form.setValue("commercialName", provider.nomcomm)
    form.setValue("website", provider.website ?? '')
    form.setValue("constitutionDate", provider.fec_const)
    form.setValue("state", provider.estado)
    form.setValue("fullAddress", provider.domicilio)
    form.setValue("postalCode", provider.cp)
    form.setValue("delegation", provider.delmpo)
    form.setValue("rfc", provider.rfc ?? '')
    form.setValue("socialObjective", provider.obj_social)
    form.setValue("economicActivity", provider.act_econom)
    form.setValue("speciality", provider.especialidad)
    form.setValue("contact", provider.contact ?? [])
    form.setValue("west", provider.coverage?.includes("Occidente") ?? false)
    form.setValue("east", provider.coverage?.includes("Oriente") ?? false)
    form.setValue("northeast", provider.coverage?.includes("Noreste") ?? false)
    form.setValue("northwest", provider.coverage?.includes("Noroeste") ?? false)
    form.setValue("southeast", provider.coverage?.includes("Sureste") ?? false)
    form.setValue("center", provider.coverage?.includes("Centro") ?? false)
    
      
    
  }, [provider])
    
  
  
  const [loading, setLoading] = useState(false)

  const { handleSubmit } = form
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    try {
      const response = await updateProviderById(data.id, data)
      toast({
        title: "Proveedor actualizado con éxito",
        description: `Se actualizó al proveedor ${response?.data?.nomraz} con número ${data.id}.`,
        variant: "success",
        action: <ToastAction className="bg-radius text-white hover:bg-slate-500" altText="Ok">Ok</ToastAction>
      })
      
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el proveedor",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="pb-4">
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
                  <InputField form={form} name="businessName" label="Razón Social" />
                  <InputField form={form} name="commercialName" label="Nombre comercial" />
                  <InputField form={form} name="rfc" label="RFC" />
                </div>
                <div className="grid grid-cols-3 gap-4 py-2">
                  <div className="self-center">
                    <DatePicker form={form} name="constitutionDate" label="Fecha de constitución" />
                  </div>
                  <div className="col-span-2">
                    <InputField form={form} name="fullAddress" label="Domicilio completo" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 py-2">
                  <InputField form={form} name="state" label="Estado" />
                  <InputField form={form} name="delegation" label="Delegación/Municipio" />
                  <InputField form={form} name="postalCode" label="C.P." />
                  <InputField form={form} name="website" label="Página web" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5 mt-6">
                    <Separator />
                  </div>
                  <div className="col-start-2">
                    <InputField form={form} name="socialObjective" label="Objetivo social" multiple />
                  </div>
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
                {/* Contactos */}
                <div className="grid grid-flow-row gap-4 py-4">
                  {
                    form.getValues("contact").length > 0 && (
                      <div className="grid grid-cols-5 gap-4">
                        {
                          form.watch("contact")?.map((item, index) => {
                            return item?.title ? (
                              <div className="col-span-5 grid grid-cols-4 gap-4" key={`${item.title}_${index}`}>
                                <InputField form={form} name={`contact.${index}.fullName`} label={item?.title || 'Titulo'} placeholder="Nombre completo" />
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
                            // add other {contact} to array
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
          <div className="pt-4">
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

export default EditForm