import './App.scss';
import React from 'react';
import Preview from './components/preview/preview';

import Form from './components/form/';
import Background from './components/background/background';

function App() {
  // <FancyButton ref={ref}>Click me!</FancyButton>;

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="left-side">
          <Background />
          <Form />
        </div>
        <div className="right-side">
          <Preview />
        </div>
      </div>
    </div>
  );
}

export default App;
