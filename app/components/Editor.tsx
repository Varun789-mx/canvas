import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

export default function MonacoCollabEditor() {
  const editorRef: any = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    // Setup happens HERE when editor is ready
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      "monaco-room-123",
      ydoc
    );
    const ytext = ydoc.getText("monaco");
    const awareness = provider.awareness;

    new MonacoBinding(ytext, editor.getModel(), new Set([editor]), awareness);

    editorRef.current = { editor, monaco, provider, ydoc };
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// Start typing..."
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  );
}
