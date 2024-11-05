import Image from "next/image";
import FileUpload from "@/app/components/FileUpload";

export default function Home() {
  return (
    <>
      <div className="bg-gray-700">
        <div className="bg-gray-700 pt-5 px-10">
          <span className="text-left">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Spaghetti Bridge
              </span>{" "}
              Weight prediction.
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Using physics informed machine learning and computer vision for
              structural angle and data analysis
            </p>
          </span>
        </div>
        <FileUpload />
      </div>
      <div className="flex flex-row items-center text-right bg-gray-700 py-1 px-5">
        <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
          FYP
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
            21p-8033 | 21p8055
          </span>
        </h1>
      </div>
    </>
  );
}
