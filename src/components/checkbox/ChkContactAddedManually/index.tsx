
import { CheckboxData } from "@/app/(providers)/reports/ad-hoc/page";
import React, { useEffect, useState } from "react";

const generalData = [
  { name: "Telefono Oficina" },
  { name: "Telefono Movil" },
  { name: "Correo" }

];

export default function ChkContactAddedManually() {
  const [users, setUsers] = useState<CheckboxData[]>([]);
  
  useEffect(() => {
    setUsers(generalData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="allSelect"
          checked={!users.some((user) => user?.isChecked !== true)}
          onChange={handleChange}
        />
        <label className="form-check-label ms-2">Contacto Agregados Manualmente</label>
      </div>
      <div className="grid grid-cols-3 gap-4 py-2">
        {users.map((user, index) => (
          <div className="items-top flex space-x-2" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label htmlFor='terms1' className="text-sm text-muted-foreground">{user.name}</label>
          </div>
        ))}
      </div>
    </>
  );
}



