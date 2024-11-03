import Image from "next/image";
import FileUpload from "@/app/components/FileUpload";

export default function Home() {
  return (
    <div>
      <div className="bg-slate-50 pt-5 px-10">
        <span className="text-center text-blue-400 text-4xl">
          Spaghetti Bridge Weight Detection
        </span>
      </div>
      <FileUpload />
    </div>
  );
}
