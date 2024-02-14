

import React from "react";
import { useFormContext } from "react-hook-form";

const generalData = [
    { name: "Razón social", value: "businessName" },
    { name: "Nombre Comercial", value: "commercialName" },
    { name: "RFC", value: "rfc" },
    { name: "CURP", value: "curp" },
    { name: "Fecha Constitución", value: "constitutionDate" },
    { name: "Domicilio Completo", value: "fullAddress" },
    { name: "Estado", value: "state" },
    { name: "Delegación/Municipio", value: "delegation" },
    { name: "CP", value: "postalCode" },
    { name: "Pagina Web", value: "website" },
    { name: "Objetivo Social", value: "socialObjective" },
    { name: "Actividad Economica", value: "economicActivity" },
    { name: "Especialidad", value: "specialty" },
]

export default function ChkGeneralData() {
  const { setValue, getValues, watch } = useFormContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "allGeneralFields") {
      generalData.map((item) => {
        setValue(item.value, checked);
      });
      setValue("allGeneralFields", checked);
    } else {
      setValue(name, checked);
      if (!checked) {
        setValue("allGeneralFields", false);
      }
      if (generalData.every((item) => getValues(item.value))) {
        setValue("allGeneralFields", true);
      }
    }
  };

    return (
      <>
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                name="allGeneralFields"
                checked={watch("allGeneralFields")}
                onChange={handleChange}
                id="allGeneralFields"
            />
            <label className="form-check-label ms-2" htmlFor="allGeneralFields">Todo</label>
        </div>
        <div className="grid grid-cols-7 gap-4 py-2">
          {generalData.map((item, index) => (
            <div className="items-top flex space-x-2" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                name={item.value}
                checked={watch(item.value)}
                onChange={handleChange}
                id={item.value}
                />
              <label 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={item.value}
              >
                  {item.name}
              </label>
            </div>
          ))}
        </div>
      </>
    );
}



