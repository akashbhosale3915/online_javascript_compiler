import { createContext, useEffect, useState } from "react";

export const EditorContext = createContext(undefined);

export default function EditorContextProvider({ children }) {
  const [code, setCode] = useState(() => localStorage.getItem("code") || "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [transform, setTransform] = useState(true);
  const [coldStartFlag, setColdStartFlag] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const value = {
    code,
    setCode,
    output,
    setOutput,
    loading,
    setLoading,
    dark,
    setDark,
    transform,
    setTransform,
    coldStartFlag,
    setColdStartFlag,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
