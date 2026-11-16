import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

export default function SandpackEditor({
  code = "<h1>Hola Mundo</h1>",
  template = "vanilla",
  title = "index.html"
}) {
  const files = {
    [title]: {
      code: code,
      active: true
    },
    "/index.js": {
      code: "",
      hidden: true
    }
  };
  
  return (
    <div className="shadow-neo rounded-2xl overflow-hidden border-4 border-border bg-white" style={{ isolation: 'isolate' }}>
      <Sandpack
        template={template}
        theme="light"
        options={{
          showNavigator: false,
          editorHeight: 350,
          showTabs: true,
          showLineNumbers: true,
          autoReload: true,
          wrapContent: true,
        }}
        files={files}
      />
    </div>
  );
}
