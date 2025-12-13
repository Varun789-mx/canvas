import { Editor } from "@monaco-editor/react";
import Canvas from "../Canvas/canvas";
import { Codestring } from "./file";
import { useState } from "react";

enum FileType {
  file = "file",
  folder = "folder",
}
interface FileNode {
  name: string;
  type: FileType.file;
  content: string;
}
interface FolderNode {
  name: string;
  type: FileType.folder;
  items: FileStructureType[];
}
type FileStructureType = FolderNode | FileNode;
export function CodeEditor() {
  const [fileStructure, setfileStructure] = useState<FileStructureType[]>([]);

  function Directory({folders}:FileStructureType) { 
    if(folders.type === FileType.file) { 
        return (
            <>
            <h3 className="">{folders.name}</h3><br/>
            </>
        )
    }
  }

  return (
    <div>
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
