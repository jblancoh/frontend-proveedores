'use client';
import { useState } from 'react';
import { pdfjs, Document } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import FileUpload from './FileUpload';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const months: { [key: string]: string } = {
  'ENERO': '01',
  'FEBRERO': '02',
  'MARZO': '03',
  'ABRIL': '04',
  'MAYO': '05',
  'JUNIO': '06',
  'JULIO': '07',
  'AGOSTO': '08',
  'SEPTIEMBRE': '09',
  'OCTUBRE': '10',
  'NOVIEMBRE': '11',
  'DICIEMBRE': '12',
}

const strValues: { [key: string]: string } = {
  'RFC:': 'rfc',
  'Nombre Comercial:': 'commercialName',
  'Fecha inicio de operaciones:': 'constitutionDate',
  'Código Postal:': 'postalCode',
  'Nombre de Vialidad:': 'streetName',
  'Tipo de Vialidad:': 'streetType',
  'Número Exterior:': 'exteriorNumber',
  'Nombre de la Colonia:': 'neighborhoodName',
  'Nombre de la Localidad:': 'localityName',
  'Nombre del Municipio o Demarcación Territorial:': 'delegation',
  'Nombre de la Entidad Federativa:': 'state',
  'Denominación/Razón Social:': 'businessName',
}

export type PDFFile = string | ArrayBuffer | URL | File | null

const PDFSat = ({ form }: { form: any }) => {
  const [numPages, setNumPages] = useState(0);
  const [filePDF, setFilePDF] = useState(null);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (filePDF) {
      let address = '';
      pdfjs.getDocument(filePDF).promise.then((pdf: any) => {
        pdf.getPage(1).then((page: any) => {
          page.getTextContent().then((textContent: any) => {
            textContent.items.forEach((textItem: any) => {
              Object.keys(strValues).forEach((strValue) => {
                if ('str' in textItem && textItem.str === strValue) {
                  let index = textContent.items.indexOf(textItem) + 1;
                  let value = textContent.items[index].str;
                  if (value === ' ') {
                    index += 1;
                    value = textContent.items[index].str;
                  }
                  if (strValues[strValue] === 'constitutionDate') {
                    const date = value.split(' ');
                    const formatMonth = months[date[2]];
                    const strDate = `${formatMonth}/${date[0]}/${date[4]}`;
                    const formatedDate = new Date(strDate);
                    form.setValue(strValues[strValue], formatedDate);
                  } else if (
                      strValues[strValue] === 'streetName' ||
                      strValues[strValue] === 'exteriorNumber' ||
                      strValues[strValue] === 'neighborhoodName' ||
                      strValues[strValue] === 'localityName'
                    ) {
                    address += `${value} `
                  } else {
                    form.setValue(strValues[strValue], value);
                  }
                }
              })
            })
            form.setValue('fullAddress', address);
          })
        })
      })
    }
  }
  
  return (
    <>
      <FileUpload setFilePDF={setFilePDF} title="Constancia de Situación Fiscal" />
      {
        filePDF && (
          <Document
            file={filePDF}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          />
        )
      }
    </>
  );
}

export default PDFSat;

  