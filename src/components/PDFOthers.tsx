'use client';
import { useState } from 'react';
import { pdfjs, Document } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import FileUpload from './FileUpload';
import { verifyIfIsCURP } from '@/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const PDFOthers = ({ form }: { form: any }) => {
  const [filePDF, setFilePDF] = useState(null);
  
  const onDocumentLoadSuccess = () => {
    if (filePDF) {
      pdfjs.getDocument(filePDF).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          page.getTextContent().then((textContent: any) => {
            textContent.items.forEach((item: any) => {
              if (verifyIfIsCURP(item.str)) {
                form.setValue('curp', item.str);
              }
            })
          })
        })
      })
    }
  }
  
  return (
    <>
      <FileUpload 
        setFilePDF={setFilePDF}
        title="CURP" 
        onremovefile={() => form.setValue('curp', '')}
      />
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

  