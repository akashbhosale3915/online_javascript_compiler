import { useEffect } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import TextEditorLeftTop from "./components/TextEditorLeftTop";
import Output from "./components/Output";
import { useEditorContext } from "./hooks/useEditorContext";

const App = () => {
  const { setColdStartFlag } = useEditorContext();

  async function coldStart() {
    setColdStartFlag(true);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/health`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setColdStartFlag(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setColdStartFlag(false);
      });
  }

  useEffect(() => {
    coldStart();
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <div className="text_editor">
          <TextEditorLeftTop />
          <Editor />
        </div>
        <Output />
      </div>
    </>
  );
};

export default App;
