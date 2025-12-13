import { Editor } from "@monaco-editor/react";
import { Codestring } from "./file";
import { useEffect, useState } from "react";
import { FileType, FileStructureType } from "../lib/Types";
import Directory from "./FileExplorer";
import { Ellipsis, X } from "lucide-react";



export function CodeEditor() {
  const [fileStructure, setfileStructure] = useState<FileStructureType>({
    name: "root",
    type: FileType.folder,
    items: [],
  });
  const testFileStructure: FileStructureType = {
    name: "root",
    type: FileType.folder,
    items: [
      {
        name: "README.md",
        type: FileType.file,
        content: "# Test Project\n\nThis is a test README file.",
      },
      {
        name: "src",
        type: FileType.folder,
        items: [
          {
            name: "index.ts",
            type: FileType.file,
            content: `console.log("Hello, world!");`,
          },
          {
            name: "utils",
            type: FileType.folder,
            items: [
              {
                name: "helpers.ts",
                type: FileType.file,
                content: `export const sum = (a: number, b: number) => a + b;`,
              },
            ],
          },
        ],
      },
      {
        name: "package.json",
        type: FileType.file,
        content: `{
  "name": "test-project",
  "version": "1.0.0"
}`,
      },
    ],
  };
  useEffect(() => {
    setfileStructure(testFileStructure);
  }, [])




  return (

    <div className="flex justify-around">

      <div className="w-1/4 flex flex-col border-r border-gray-800 h-screen ">
        <div className="w-full flex p-1.5 px-0 border-b justify-around gap-4 text-lg border-r border-gray-900 ">Explorer <Ellipsis /></div> <Directory FileStructure={fileStructure} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4   bg-gray-800  text-gray-300">
          <div className="border-2 p-2 border-t border-r-0 border-l-0 items-center gap-3 border-b flex  border-emerald-500 bg-black cursor-pointer">Script.js <X className="w-4 h-4" /></div>
        </div>
        <Editor
          theme="vs-dark"
          className="text-4xl"
          height="100vh"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="//Here we go again"
          value={Codestring}
        >
        </Editor>
      </div>
    </div>

  );
}
