"use client"

import { useForm } from "react-hook-form"

import {
  Form,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { FormSectionHeader } from "@/components/form/FormSectionHeader"
import { InputField } from "@/components/form/InputField"
import { SelectField } from "@/components/form/SelectField"

const Page = () => {
  const form = useForm()
  return (
    <div>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-4 gap-4">
            <FormSectionHeader title="General" />
            <InputField form={form} name="businessName" label="Razon Social" />
            <InputField form={form} name="commercialName" label="Nombre Comercial" />
            <InputField form={form} name="webPage" label="Pagina Web" />
            <InputField form={form} name="constitutionDate" label="Fecha de Constitucion" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <InputField form={form} name= "state" label="Estado" />
            <InputField form={form} name= "fullAddress" label="Domicilio Completo" />
            <InputField form={form} name= "postalCode" label="C.P." />
            <InputField form={form} name= "delegation" label="Delegacion/Municipio" />
            <InputField form={form} name= "rfc" label="RFC" />
            <InputField form={form} name="socialObjective" label="Objetivo Social" />
            <InputField form={form} name="economicActivity" label="Actividad Economica" />
            <InputField form={form} name="specialty" label="Especialidad" />
          </div>
          <div className="grid grid-cols-5 gap-4 py-4">
            <FormSectionHeader title="Directorio" />
            <div className="col-span-5 grid grid-cols-5 gap-4">
              <div className="self-end text-center mb-2">
                <Label>Apoderado Legal</Label>
              </div>
              <InputField form={form} name="legalRepresentativeFullName" label="Nombre Completo" />
              <InputField form={form} name="legalRepresentativeOfficePhone" label="Telefono Oficina" />
              <InputField form={form} name="legalRepresentativeMobilePhone" label="Telefono Movil" />
              <InputField form={form} name="legalRepresentativeEmail" label="Correo Electronico" />
            </div>
            <div className="col-span-5 grid grid-cols-5 gap-4">
              <div className="self-end text-center mb-2">
                <Label>Director General</Label>
              </div>
              <InputField form={form} name="generalDirectorFullName" label="Nombre Completo" />
              <InputField form={form} name="generalDirectorOfficePhone" label="Telefono Oficina" />
              <InputField form={form} name="generalDirectorMobilePhone" label="Telefono Movil" />
              <InputField form={form} name="generalDirectorEmail" label="Correo Electronico" />
            </div>
            <div className="col-span-5 grid grid-cols-5 gap-4">
              <div className="self-end text-center mb-2">
                <Label>Contacto Licitacion</Label>
              </div>
              <InputField form={form} name="tenderContactFullName" label="Nombre Completo" />
              <InputField form={form} name="tenderContactOfficePhone" label="Telefono Oficina" />
              <InputField form={form} name="tenderContactMobilePhone" label="Telefono Movil" />
              <InputField form={form} name="tenderContactEmail" label="Correo Electronico" />
            </div>
            <div className="col-span-5 grid grid-cols-5 gap-4">
              <div className="self-end text-center mb-2">
                <Label>Contacto Administrativo</Label>
              </div>
              <InputField form={form} name="administrativeContactFullName" label="Nombre Completo" />
              <InputField form={form} name="administrativeContactOfficePhone" label="Telefono Oficina" />
              <InputField form={form} name="administrativeContactMobilePhone" label="Telefono Movil" />
              <InputField form={form} name="administrativeContactEmail" label="Correo Electronico" />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 py-4">
            <FormSectionHeader title="Zona Geográfica" />
            <div className="col-span-5 grid grid-cols-6 gap-4 ">
              <SelectField form={form} name="west" label="Occidente" />
              <SelectField form={form} name="east" label="Oriente" />
              <SelectField form={form} name="northeast" label="Noreste" />
              <SelectField form={form} name="northwest" label="Noroeste" />
              <SelectField form={form} name="southeast" label="Sureste" />
              <SelectField form={form} name="center" label="Centro" />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Page