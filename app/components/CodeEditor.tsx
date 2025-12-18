"use client"
import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileType, FileStructureType, CodeChangeType } from "../lib/Types";
import Directory from "./FileExplorer";
import { Ellipsis, X } from "lucide-react";
// import { CodeChanges, getCodeChanges } from "../lib/CodeChanges";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";


export function CodeEditor() {
  const EditorRef = useRef<any>(null);
  const MonacoRef = useRef<any>(null)
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

  const fetchfiles = async () => {
    const response = await fetch('http://localhost:4000/download?path=reactbase');
    if (!response.ok) {
      console.log("Error getting the files");
    }
    const data = await response.json();
    console.log(data, "Files");
    setfileStructure(data.files.files);
  }
  useEffect(() => {
    fetchfiles();
  }, [])
  function SelectFile(filename: string) {
    console.log("Selected File: ", fileStructure);
    if (fileStructure.type === FileType.folder)
      fileStructure.items.map((item) => {
        if (item.type === FileType.file && item.name === filename) {
          console.log("File Content: ", item.content);
        }
      })
  }

  // function receiveRemoteChange(changeData: CodeChangeType & { length?: number }) {
  //   CodeChanges(EditorRef, MonacoRef, changeData, true);
  // }

  // function testCodeChanges() {
  //   CodeChanges(EditorRef, MonacoRef,
  //     {
  //       "type": "replace",
  //       "content": "o",
  //       "position": 224,
  //     }, true);
  // }

  // setTimeout(() => {
  //   testCodeChanges();
  // }, 5 * 1000);


  // function handleEditorChange(value: string | undefined, event: any) {

  //   if (!event || !event.changes || event.changes.length === 0) return;
  //   const model = EditorRef.current.getModel();

  //   if (!model) return;
  //   event.changes.forEach((change: any) => {
  //     const ChangeData = {
  //       type: "replace" as const,
  //       position: change.rangeOffset,
  //       length: change.rangeLength,
  //       content: change.text,
  //     }
  //     console.log("Editor Detected ", ChangeData);
  //     const response = getCodeChanges(EditorRef, MonacoRef, ChangeData);
  //     console.log(response);
  //   })


  // }

  function onEditorMount(editor: any, monaco: any) {
    EditorRef.current = editor;
    MonacoRef.current = monaco;
    if (typeof window === 'undefined') return;
    const doc = new Y.Doc();
    const provider = new WebsocketProvider('ws://localhost:1234', 'monaco-demo', doc);
    const type = doc.getText('monaco');
    const binding = new MonacoBinding(type, EditorRef.current.getModel(), new Set([EditorRef.current]), provider.awareness);
    console.log(provider.awareness);


  }
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
          // onChange={handleEditorChange}
          defaultLanguage="javascript"
          onMount={onEditorMount}
          defaultValue="//Here we go again"
        >
        </Editor>
      </div>
    </div >
  );
}
