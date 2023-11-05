"use client";
 
import HuggingFace from "@/lib/classifier";
import { UploadButton } from "@/lib/uploadthing";

export default function UploadThing() {
  

  return (
    <main className="flex flex-col items-center justify-between md:pr-52">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res:any) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          const response = await HuggingFace(res[0].url);
          console.log("Response: ", response);
          
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}