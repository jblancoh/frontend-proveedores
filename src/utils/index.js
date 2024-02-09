
const COVERAGE = {
  'west': { 'nombre': 'Occidente', 'estatus': 1 },
  'east': { 'nombre': 'Oriente', 'estatus': 1 },
  'northeast': { 'nombre': 'Noreste', 'estatus': 1 },
  'northwest': { 'nombre': 'Noroeste', 'estatus': 1 },
  'southeast': { 'nombre': 'Sureste', 'estatus': 1 },
  'center': { 'nombre': 'Centro', 'estatus': 1 },
}

const contactFormatToForm = (data) => {
  return data.map(item => {
    return {
      fullName: item.nom_contact,
      officePhone: item.tel_contact,
      mobilePhone: item.tel_movil,
      email: item.email_contact,
      title: item.contact_cat.descripcion,
    }
  })
}

const coverageFormat = (data) => {
  const coverage = [
    data.west ? COVERAGE.west : null,
    data.east ? COVERAGE.east : null,
    data.northeast ? COVERAGE.northeast : null,
    data.northwest ? COVERAGE.northwest : null,
    data.southeast ? COVERAGE.southeast : null,
    data.center ? COVERAGE.center : null,
  ].filter(item => item !== null)
  return coverage
}

const createData = (data) => {
  return {
    id: data.id,
    nomraz: data.businessName,
    nomcomm: data.commercialName,
    website: data.website,
    rfc: data.rfc,
    obj_social: data.socialObjective,
    act_econom: data.economicActivity,
    especialidad: data.speciality,
    domicilio: data.fullAddress,
    delmpo: data.delegation,
    estado: data.state,
    cp: data.postalCode,
    p_curp: data.curp,
    nacional: "MEX",
    fec_const: data.constitutionDate,
    estatus: 1,
    contact: data.contact.map(item => {
        return {
          nom_contact: item.fullName,
          tel_contact: item.officePhone,
          tel_movil: item.mobilePhone,
          email_contact: item.email,
          contact_cat: {
            descripcion: item.title,
            estatus: 1
          }
        }
      })
    ,
    coverage: coverageFormat(data),
  }
}

export {
  createData,
  contactFormatToForm,
}