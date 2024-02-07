'use client';
import { Dispatch, SetStateAction } from "react";
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

const FileUpload = ({ setFilePDF, title }: { setFilePDF: any, title: string }) => {

  return (
    <FilePond
      allowMultiple={false}
      name="file"
      onupdatefiles={(fileItems) => {
        if (fileItems.length > 0) {
          const file = fileItems[0].file;
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) { // Add null check
              setFilePDF(e.target.result as string); // Explicitly cast to string
            }
          };
          reader.readAsDataURL(file);
        }
      }}
      labelIdle={`Arrastra y suelta tu archivo de ${title} o <span class='filepond--label-action'>haz click aquí</span>.`}
    />
  );
}

export default FileUpload;