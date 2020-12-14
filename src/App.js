import './App.scss';
import Preview from './components/preview/preview';
import SaveAs from './components/saveAs/saveAs';
import Form from './components/form/';
import Prep from './components/prep/prep';
function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="left-side">
          <Prep />
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
