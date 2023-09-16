"use client";

import { UploadDropzone, UploadButton, Uploader } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className={"relative h-20 w-20"}>
        <Image fill src={value} alt={"Upload"} className={"rounded-full"} />
        <button
          type={"button"}
          onClick={() => onChange("")}
          className={
            "bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          }
        >
          <X className={"h-4 w-4"} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      appearance={{
        button:
          "relative mt-4 flex h-10 w-36 items-center justify-center overflow-hidden rounded-md after:duration-500 ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-blue-500 bg-none after:bg-blue-400",
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
