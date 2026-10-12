import Sun from "./Sun";
import Moon from "./Moon";
import Loading from "./Loading";
import * as prettier from "prettier/standalone";
import * as babelParser from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import { useEditorContext } from "../hooks/useEditorContext";

const TextEditorLeftTop = () => {
  const {
    code,
    setCode,
    setLoading,
    setTransform,
    setOutput,
    transform,
    coldStartFlag,
    dark,
    loading,
    setDark,
  } = useEditorContext();

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

  async function handleCompile() {
    if (!code) {
      return;
    }
    try {
      setLoading(true);
      await handleFormatCode();
      setTransform(!transform);
      setOutput("");
      const output = await fetch(`${import.meta.env.VITE_BACKEND_URL}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: code,
      });

      const json = await output.json();
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
      {coldStartFlag && <Loading />}
      <div className="buttons">
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
