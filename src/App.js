import './App.scss';
import Preview from './components/preview/preview';
import SaveAs from './components/saveAs/saveAs';
import Form from './components/form/';
import Background from './components/background/background';
function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="left-side">
          <Background />
          <Form />
        </div>
        <div className="right-side">
          <Preview />
          <SaveAs />
        </div>
      </div>
    </div>
  );
}

export default App;
