import './App.scss';
import React from 'react';
import Preview from './components/preview/preview';
import Form from './components/form/';
import BackgroundSetter from './components/background/backgroundSetter';

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="input-conponents">
          <BackgroundSetter />
          <Form />
        </div>
        <div className="view-components">
          <Preview />
        </div>
      </div>
    </div>
  );
}

export default App;
