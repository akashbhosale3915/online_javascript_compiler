import { useEditorContext } from "../hooks/useEditorContext";

const Output = () => {
  const { transform, setTransform, setOutput, loading, output } =
    useEditorContext();
  return (
    <div className="output" data-transform={transform}>
      <div className="output_header">
        <h3>Output</h3>
        <div className="buttons">
          <button
            className="resp-output"
            onClick={() => setTransform(!transform)}
          >
            Code
          </button>
          <button
            className={loading ? "disabled gray clear" : "clear"}
            onClick={() => {
              setOutput("");
              setTransform(!transform);
            }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="output_body">
        <code>{loading ? "Processing... ⌛" : output}</code>
      </div>
    </div>
  );
};

export default Output;
