"use client";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useEffect, useState } from "react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type props = {};

const FileDrop = (props: props) => {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  // const [uploaded, setUploaded] = useState(false);

  // useEffect(() => {
  //   if (files.length > 0) {
  //     localStorage.setItem("file", files[0].file.path!);
  //     setUploaded(() => true);
  //   }
  // }, [files]);

  // if (uploaded) {
  //   return <></>;
  // }

  return (
    <div className="w-screen h-screen absolute bg-black bg-opacity-50 z-10 inset-0 flex justify-center items-center">
      <div className="w-1/4 aspect-video bg-slate-800 rounded-2xl flex justify-center items-center cursor-default flex-col gap-4 text-gray-300">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div>
            {files.length > 0 && (
              <button onClick={() => startUpload()}>123</button>
            )}
          </div>
          Drop files here!
        </div>
      </div>
    </div>
  );
};

export default FileDrop;
