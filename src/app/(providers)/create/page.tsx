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

type FormValues = {
  businessName: string,
  commercialName: string,
  webPage:  string,
  constitutionDate: string,
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
  const form = useForm(
    {
      defaultValues: {
        businessName: "",
        commercialName: "",
        webPage: "",
        constitutionDate: "",
        state: "",
        fullAddress: "",
        postalCode: "",
        delegation: "",
        rfc: "",
        socialObjective: "",
        economicActivity: "",
        specialty: "",
        legalRepresentativeFullName: "",
        legalRepresentativeOfficePhone: "",
        legalRepresentativeMobilePhone: "",
        legalRepresentativeEmail: "",
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
  const { handleSubmit } = form
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
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
                  <InputField form={form} name="webPage" label="Pagina Web" />
                  <InputField form={form} name="constitutionDate" label="Fecha de Constitucion" />
                </div>
                <div className="grid grid-cols-5 gap-4 py-2">
                  <InputField form={form} name= "state" label="Estado" />
                  <InputField form={form} name= "fullAddress" label="Domicilio Completo" />
                  <InputField form={form} name= "postalCode" label="C.P." />
                  <InputField form={form} name= "delegation" label="Delegacion/Municipio" />
                  <InputField form={form} name= "rfc" label="RFC" />
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
            >
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Page