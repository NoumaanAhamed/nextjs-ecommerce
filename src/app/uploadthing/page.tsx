"use client";
 
import HuggingFace from "@/lib/classifier";
import { UploadButton } from "@/lib/uploadthing";
// import { redirect } from "next/dist/server/api-utils";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { array } from "zod";
import { useRouter } from "next/navigation";

interface Model {
  [key: string]: string[];
}

const model:Model = {"phone": [
  "mobile",
  "cellular",
  "cellular telephone",
  "cellular phone",
  "cellphone",
  "cell",
  "mobile phone",
  "smartphone",
  "feature phone",
  "wireless device",
  "handheld device",
  "portable communication device",
  "cellular device",
  "cellular communication",
  "cellular technology",
  "cellular network",
  "telecommunication device"
],
  "laptop":
  [
  "notebook",
  "notebook computer",
  "laptop",
  "laptop computer",
  "space bar",
  "desktop computer",
  "ultrabook",
  "portable computer",
  "PC",
  "workstation",
  "netbook",
  "keyboard",
  "input device"
],
  "water bottle": [
  "water jug",
  "water bottle",
  "milk can",
  "drinking vessel",
  "beverage container",
  "pitcher",
  "flask",
  "thermos",
  "vessel",
  "bottle",
  "carafe",
  "milk jug"
],
  "keyboard": [

],
  "headphones": [
  "headphones",
  "earbuds",
  "headsets",
  "earphones",
  "audio devices",
  "listening devices",
  "head-worn audio gear",
  "sound gadgets",
  "acoustic devices",
  "stereo gear",
  "personal audio devices",
  "audio equipment"
], "watch-smart": [
  "digital watches",
  "wristwatches",
  "timepieces",
  "smartwatches",
  "wearable tech",
  "electronic watches",
  "timekeeping devices",
  "wrist gear",
  "time monitors",
  "digital timepieces",
  "wrist computers",
  "chronometers"
], "watch analog": [
  "stopwatch",
  "stop watch",
  "digital watches",
  "wristwatches",
  "timepieces",
  "smartwatches",
  "wearable tech",
  "electronic watches",
  "timekeeping devices",
  "wrist gear",
  "time monitors",
  "digital timepieces",
  "wrist computers",
  "chronometers"
], "mouse-office":
  ["mouse",
  "office mouse",
  "computer mouse",
  "ergonomic mouse",
  "wireless mouse",
  "trackball mouse",
  "optical mouse",
  "USB mouse",
  "Bluetooth mouse",
  "laser mouse",
  "scroll wheel mouse",
  "gaming mouse",
  "corded mouse",
  "mice",
  "input device"
],
  "mouse-gaming": [
  "gaming mouse",
  "wireless gaming mouse",
  "wired gaming mouse",
  "RGB gaming mouse",
  "programmable gaming mouse",
  "high DPI mouse",
  "precision gaming mouse",
  "ergonomic gaming mouse",
  "FPS gaming mouse",
  "MOBA gaming mouse",
  "MMO gaming mouse",
  "ambidextrous gaming mouse",
  "gaming mouse with customizable buttons",
  "optical gaming mouse",
  "laser gaming mouse"
]
}

function mapSubclassToParent(subclassArray:string[], model:Model) {
  for (const subclass of subclassArray) {
    for (const parent in model) {
      if (model[parent].some(value => value === subclass)) {
        return parent; // Return the first matching parent
      }
    }
  }
  return "Not Found"; // Return a default value if no matching parent is found
}

export default function UploadThing() {
  
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-between md:pr-52">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res:any) => {
          // Do something with the response
          console.log(res)
          console.log("Files: ", res[0].url);
          const response = await HuggingFace(res[0].url);
          console.log(response);
          let jsonRes=[]
          if (response!= undefined){
            jsonRes= JSON.parse(response)
            console.log(jsonRes[0]['label']);
          }
          let labels=jsonRes[0]['label'].split(',');
          const parentClass = mapSubclassToParent(labels, model);
          console.log("Parent Class:", parentClass);
          // const router= useRouter();
          router.push('/search?query='+ parentClass);
          // res.
          // let pl;
          // for(let sc in labels){
          //   for(let i in models){
          //     if(models[i].includes(sc)){
          //       pl=i;
          //     }
          //   }
          // }
          console.log(labels);
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