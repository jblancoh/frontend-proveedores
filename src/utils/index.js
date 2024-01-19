const createData = (data) => {
  return {
    nomRaz: data.businessName,
    nom_comm: data.commercialName,
    website: data.website,
    rfc: data.rfc,
    p_curp: data.curp || '',
    obj_social: data.socialObject,
    act_econom: data.economicActivity,
    especialidad: data.speciality,
    tel1: '5529992201',
    tel2: '5529992202',
    domicilio: data.fullAddress,
    delmpo: data.delegation,
    estado: data.state,
    cp: data.zipCode,
    nacional: "MEX",
    r_curp: data.curp || '',
    num_escritura: '',
    fec_alta: data.constitutionDate,
    fec_baja: data.deletedDate,
    fec_react: data.reactivationDate,
    estatus: 1,
    contact: [
      {
        nom_contact: data.legalRepresentativeFullName,
        rfc: '',
        curp: '',
        tel_contact: data.legalRepresentativeOfficePhone,
        tel_movil: data.legalRepresentativeMobilePhone,
        email_contact: data.legalRepresentativeEmail,
        contact_cat: {
          descripcion: '',
          estatus: 1
        }
      }
    ],
    coverage: [
      {
        nombre: 'occidente',
        estatus: 1,
        coveage_cat: {
          descripcion: '',
          estatus: 1
        }
      }
    ]
  }
}

export {
  createData,
}