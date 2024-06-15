import React from 'react';
import './App.css';
import IndexRoute from './Routes/IndexRoute';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexRoute />
      </BrowserRouter>
    </div>
  );
};

export default App;
