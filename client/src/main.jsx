import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EditorContextProvider from "./context/EditorContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <EditorContextProvider>
        <App />
      </EditorContextProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
