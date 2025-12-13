"use client";
import Canvas from "./Canvas/canvas";
import { CodeEditor } from "./components/CodeEditor";
import MonacoCollabEditor from "./components/Editor";

export default function Home() {
  return (
    <div>
      <CodeEditor />
    </div>
  );
}
