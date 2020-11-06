import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling']
})

function App() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    socket.on('cpu', (cpuPercent: any) => {
      setData((currentData: any) => [...currentData, cpuPercent]);
    })
    return () => {
      socket.close();
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
