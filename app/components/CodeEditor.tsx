import { Editor } from "@monaco-editor/react";
import { Codestring } from "./file";
import { useEffect, useState } from "react";
import { FileType, FileStructureType } from "../lib/Types";
import Directory from "./FileExplorer";



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
      <div className="w-1/4"> <Directory FileStructure={fileStructure} />
      </div>
      <Editor
        theme="vs-dark"
        className="text-4xl"
        height="100vh"
        width="100%"
        defaultLanguage="javascript"
        defaultValue="//Here we go again"
        value={Codestring}
      ></Editor>
    </div>
  );
}
