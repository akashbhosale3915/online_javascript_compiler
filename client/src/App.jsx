import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-language_tools";
import Sun from "./Sun";
import Moon from "./Moon";
const App = () => {
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  async function handleCompile() {
    if (!code) {
      return;
    }
    try {
      setLoading(true);
      const output = await fetch(
        "http://localhost:9000/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: code,
        }
      );

      const json = await output.json();
      setOutput(json.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <>
      <header>
        <h2>
          Online Javascript Compiler <sub>by DroidTech</sub>
        </h2>
      </header>
      <div className="main">
        <div className="text_editor">
          <div className="header">
            <h3>Index.js</h3>
            <div className="buttons">
              <button
                className="theme"
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun /> : <Moon />}
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
          <AceEditor
            width="100%"
            height="100%"
            placeholder=""
            mode="javascript"
            theme={dark ? "terminal" : "kuroir"}
            name="blah2"
            onChange={(value) => setCode(value)}
            fontSize={14}
            lineHeight={19}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
              wrap: true,
            }}
          />
        </div>
        <div className="output">
          <div className="output_header">
            <h3>Output</h3>
            <button
              className="clear"
              onClick={() => setOutput("")}
            >
              Clear
            </button>
          </div>
          <div className="output_body">
            <code>{output}</code>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
