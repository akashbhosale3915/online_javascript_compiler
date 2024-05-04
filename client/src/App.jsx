import { useState } from "react";
import beautify from "js-beautify";
import Run from "./Run";
const App = () => {
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");

  async function handleCompile() {
    if (!code) {
      return;
    }
    formatCode(code);
    try {
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
      setOutput(json.message.replace(/\n/g, "<br />"));
    } catch (error) {
      console.log(error);
    }
  }

  function formatCode(code) {
    const beautifiedJS = beautify(code, {
      indent_size: 2,
      indent_char: " ",
      max_preserve_newlines: 0,
      space_in_empty_paren: true,
      jslint_happy: true,
      eval_code: true,
      end_with_newline: true,
      wrap_line_length: 0,
      e4x: true,
    });
    setCode(beautifiedJS);
  }

  return (
    <>
      <header>
        <h1>Online Javascript Compiler</h1>
      </header>
      <div className="main">
        <div className="text_editor">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div
          className="output"
          dangerouslySetInnerHTML={{ __html: output }}
        />
        <button
          className="run"
          type="button"
          onClick={handleCompile}
        >
          <Run />
        </button>
      </div>
    </>
  );
};

export default App;
