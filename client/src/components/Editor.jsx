import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEditorContext } from "../hooks/useEditorContext";

const Editor = () => {
  const { dark, setCode, code } = useEditorContext();
  return (
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
  );
};

export default Editor;
