import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error(
      "useEditorContext must be used within a EditorContextProvider",
    );
  return context;
};
