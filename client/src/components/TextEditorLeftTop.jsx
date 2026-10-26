import * as prettier from "prettier/standalone";
import * as babelParser from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import { useEditorContext } from "../hooks/useEditorContext";
import { useRef, useState } from "react";
import { Sun, Moon, FileUp } from "lucide-react";
import { validateFile } from "../utils";

const TextEditorLeftTop = () => {
  const {
    code,
    setCode,
    setLoading,
    setTransform,
    setOutput,
    transform,
    dark,
    loading,
    setDark,
  } = useEditorContext();

  const [file, setFile] = useState(null);
  const btnRef = useRef();

  async function handleFormatCode() {
    try {
      const formatted = await prettier.format(code, {
        parser: "babel",
        semi: true,
        singleQuote: true,
        plugins: [babelParser, estreePlugin],
      });
      localStorage.setItem("code", code);
      setCode(formatted);
    } catch (error) {
      console.error("Formatting failed:", error);
    }
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const isJs = validateFile(file);
    if (!isJs) {
      return alert("Only .js files allowed");
    } else {
      setFile(file);
      const fileContent = await file.text();
      setCode(fileContent);
    }
  }

  async function handleCompile() {
    if (!code) {
      return;
    }
    try {
      setLoading(true);
      await handleFormatCode();
      setTransform(!transform);
      setOutput("");

      let requestBody = code;

      if (file) {
        requestBody = await file.text();
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: requestBody,
      });

      const json = await response.json();
      setOutput(json.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="header">
      <h3>Index.js</h3>
      <div className="buttons">
        {file?.name}
        <button
          className="file-cta"
          onClick={() => {
            btnRef.current?.click();
          }}
        >
          <abbr title="Upload File">
            <FileUp id="file-upload" />
            <input
              type="file"
              className="file-input"
              onChange={handleFile}
              ref={btnRef}
            />
          </abbr>
        </button>
        <button className="theme" onClick={() => setDark(!dark)}>
          {dark ? <Sun /> : <Moon />}
        </button>
        <button
          className="resp-output"
          onClick={() => setTransform(!transform)}
        >
          Output
        </button>
        <button
          className={code ? "run" : "run disabled"}
          type="button"
          onClick={handleCompile}
          disabled={!code || loading}
        >
          {loading ? "⌛" : "Run"}
        </button>
      </div>
    </div>
  );
};

export default TextEditorLeftTop;
