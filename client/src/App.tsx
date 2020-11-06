import React from 'react';
import logo from './logo.svg';
import './App.css';
import CpuUsage from './components/CpuUsage';



function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CpuUsage/>
      </header>
    </div>
  );
}

export default App;
