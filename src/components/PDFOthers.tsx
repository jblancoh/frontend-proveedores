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

const PDFOthers = ({ form }: { form: any }) => {
  const [numPages, setNumPages] = useState(0);
  const [filePDF, setFilePDF] = useState(null);
  
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (filePDF) {
      pdfjs.getDocument(filePDF).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          page.getTextContent().then((textContent: any) => {
            form.setValue('curp', textContent.items[28]?.str);
            // form.setValue('socialObjective', textContent.items[50]?.str);
            // form.setValue('economicActivity', textContent.items[39]?.str);
            // form.setValue('speciality', textContent.items[1]?.str);

          })
        })
      })
    }
  }
  
  return (
    <>
      <FileUpload setFilePDF={setFilePDF} title="CURP" />
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

export default PDFOthers;

  