import Editor from "./components/Editor";
import Header from "./components/Header";
import TextEditorLeftTop from "./components/TextEditorLeftTop";
import Output from "./components/Output";

const App = () => {
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
