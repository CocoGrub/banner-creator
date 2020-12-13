import Form from './components/form/';
import './App.scss';
import Preview from './components/preview/preview';
import SaveAs from './components/saveAs/saveAs';

function App() {
  return (
    <div className="App">
      <Form />
      <Preview />
      <SaveAs />
    </div>
  );
}

export default App;
